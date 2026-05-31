# Kino CMS API Documentation

## Base URL

```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Endpoints

### Movies

#### Get All Movies

```
GET /movies
```

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20)
- `status` (string): movie | tv
- `language` (string): Filter by language code
- `country` (string): Filter by country code
- `sort` (string): releaseDate | rating | viewCount

**Response:**
```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}
```

#### Get Movie Details

```
GET /movies/:id
```

**Response:**
```json
{
  "_id": "...",
  "title": { "en": "...", "zh-CN": "..." },
  "description": { "en": "...", "zh-CN": "..." },
  "rating": 8.5,
  "playbackSources": []
}
```

#### Create Movie

```
POST /movies
```

**Required Role:** admin, editor

**Body:**
```json
{
  "title": { "en": "Movie Title" },
  "description": { "en": "Description" },
  "releaseDate": "2023-01-01",
  "contentType": "movie",
  "isLegal": true
}
```

### Categories

#### Get All Categories

```
GET /categories
```

**Response:**
```json
{
  "data": [
    {
      "_id": "...",
      "name": { "en": "Action", "zh-CN": "动作" },
      "slug": "action"
    }
  ]
}
```

### Playback Sources

#### Get Sources for Movie

```
GET /sources?movieId=:movieId
```

#### Create Playback Source

```
POST /sources
```

**Required Role:** admin, editor

**Body:**
```json
{
  "movieId": "...",
  "name": "Official Stream",
  "sourceUrl": "https://...",
  "sourceType": "iframe",
  "quality": "720p",
  "language": "en",
  "isActive": true
}
```

## Error Responses

```json
{
  "error": {
    "status": 400,
    "message": "Invalid request"
  }
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error
