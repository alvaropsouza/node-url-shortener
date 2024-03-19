import fastify from 'fastify';
import { z } from 'zod';
import { sql } from './lib/postgres';
import postgres from 'postgres';

const app = fastify();

app.post('/links', async (req, reply) => {
  try {
    const createLinkSchema = z.object({
      code: z.string().min(3),
      url: z.string().url(),
    });

    const { code, url } = createLinkSchema.parse(req.body);

    const result = await sql/*sql*/ `
          INSERT INTO short_links (code, original_url) 
          VALUES (${code}, ${url})
          RETURNING id
          `;

    const link = result[0];

    return reply.status(201).send({ shortLinkId: link.id });
  } catch (err) {
    if (err instanceof postgres.PostgresError) {
      if (err.code === '23505') {
        return reply
          .status(409)
          .send({ message: 'Url with provided code already exists!' });
      }
    }

    return reply.status(500).send();
  }
});

app.listen({ port: 3333 }).then(() => {
  console.log(`Running server on port 3333`);
});
