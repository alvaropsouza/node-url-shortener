# API Documentation

## Overview

This API provides short link generation and tracking functionality. It uses Fastify as the web framework, Zod for data validation, Postgres for database operations, and Redis for caching.

## Setup

1. Install dependencies: `pnpm install`
2. Start the server: `pnpm start`

## Endpoints

### GET /:code

- Description: Retrieve the original URL corresponding to a short link code.
- Request Parameters: `code` (string)
- Response: Redirects to the original URL or returns an error message.

### GET /api/links

- Description: Retrieve all short links ordered by creation date.
- Response: Array of short link objects.

### POST /api/links

- Description: Create a new short link.
- Request Body: `{ code: string, url: string }`
- Response: `{ shortLinkId: number }` or error message for duplicates.

### GET /api/links/ranking

- Description: Retrieve top 50 ranked short links based on clicks.
- Response: Array of short link metrics.

## Data Validation

- Zod schemas are used for validating request data.

## Error Handling

- Proper error handling for database and server errors.

## Server

To start the server, run `pnpm start`.

## Testing

- Use built in http client to test routes
