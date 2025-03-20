# API Documentation

## Endpoints

### Leads

#### Create Lead

```http
POST /api/leads
```

**Request Body:**

```typescript
{
  firstName: string;
  lastName: string;
  email: string;
  citizenship: string;
  linkedinProfile: string;
  visasOfInterest: string[];
  additionalInfo?: string;
}
```

#### Get All Leads

```http
GET /api/leads
```

#### Update Lead Status

```http
PATCH /api/leads/{id}
```

**Request Body:**

```typescript
{
  status: "PENDING" | "REACHED_OUT";
}
```

### Authentication

#### Login

```http
POST /api/auth/login
```

**Request Body:**

```typescript
{
  email: string;
  password: string;
}
```

## Response Codes

- `200`: Success
- `400`: Bad Request
- `401`: Unauthorized
- `404`: Not Found
- `500`: Server Error
