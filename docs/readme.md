# Full-Stack Authentication Platform

A secure full-stack authentication platform built with React, TypeScript, Node.js, Express, Prisma ORM, MySQL, bcrypt, and JSON Web Tokens.

The application allows users to register, sign in, view their protected profile, and provides an admin-only endpoint for viewing a paginated and filtered list of users.

## Project Status

### Backend

- User signup
- User signin
- Password hashing
- JWT authentication
- Protected profile endpoint
- Role-based admin authorization
- Paginated user listing
- User filtering
- Field-level validation
- Rate limiting
- Structured request logging
- Security headers
- Prisma migrations

### Frontend

- Signup page
- Signin page
- Protected profile page
- Form validation
- Backend API integration
- Protected routing
- Logout functionality

## Technology Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- Axios
- Form validation

React with TypeScript was selected because the application contains multiple forms, protected routes, authentication state, reusable components, and typed API responses.

### Backend

- Node.js
- TypeScript
- Express
- Prisma ORM
- MySQL
- bcrypt
- jsonwebtoken
- Zod
- Helmet
- CORS
- express-rate-limit

## Architecture Overview

The project separates the frontend and backend into independent folders.

```text
fullstack-auth-platform/
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   └── package.json
├── docs/
│   └── ADR-001-JWT-Authentication.md
├── .gitignore
└── Readme.md
```

## Backend Request Flow

```text
Client Request
     ↓
Security Middleware
     ↓
Validation
     ↓
Route
     ↓
Controller
     ↓
Service or Repository
     ↓
Prisma ORM
     ↓
MySQL Database
     ↓
Safe API Response
```

### Layer Responsibilities

- **Routes:** Define endpoint paths and middleware order.
- **Controllers:** Handle HTTP requests and responses.
- **Services:** Handle authentication business logic.
- **Repositories:** Contain Prisma database queries.
- **Schemas:** Validate request bodies and query parameters.
- **Middleware:** Handle authentication, authorization, rate limiting, logging, and Content-Type validation.
- **Prisma:** Provides type-safe access to MySQL.

## Main Features

### Authentication

- User registration
- User signin
- Password hashing with bcrypt
- JWT access-token generation
- JWT verification on protected routes
- Configurable token expiration
- Generic invalid-credential response

### Authorization

- `USER` and `ADMIN` roles
- Protected user-profile endpoint
- Admin-only users-list endpoint
- `401 Unauthorized` for missing or invalid authentication
- `403 Forbidden` for insufficient permissions

### Validation

Frontend and backend validate user input independently.

Signup validation includes:

- Required first name
- Required last name
- Maximum name length of 50 characters
- Valid email format
- Maximum email length
- Password minimum length of 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character
- Maximum password length of 128 characters

Inputs are trimmed and email addresses are converted to lowercase before database operations.

### User Listing

The admin users-list endpoint supports:

- Pagination
- Role filtering
- Email search
- Start-date filtering
- End-date filtering
- Latest-user-first sorting

## Local Development Setup

### Prerequisites

Install the following software:

- Node.js
- npm
- MySQL Server
- MySQL Workbench
- Git

## 1. Clone the Repository

```bash
git clone https://github.com/missishaext/fullstack-auth-platform.git
cd fullstack-auth-platform
```

## 2. Checkout the Required Branch

For backend development:

```bash
git checkout backend-dev
```

For frontend development:

```bash
git checkout frontend-dev
```

## 3. Create the MySQL Database

Open MySQL Workbench and run:

```sql
CREATE DATABASE auth_platform;
```

The database tables must be created through Prisma migrations. Do not manually create the `User` table.

## 4. Configure Backend Environment Variables

Move into the backend folder:

```bash
cd backend
```

Copy `.env.example` to a new `.env` file.

```bash
copy .env.example .env
```

On macOS or Linux:

```bash
cp .env.example .env
```

Update `.env` with local values:

```env
DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/auth_platform"

JWT_SECRET="replace-with-a-long-random-secret"

JWT_EXPIRES_IN="1d"

PORT=5000

FRONTEND_ORIGIN="http://localhost:5173"
```

The real `.env` file must never be committed to GitHub.

## 5. Install Backend Dependencies

```bash
npm install
```

On a restricted Windows PowerShell environment:

```powershell
npm.cmd install
```

## 6. Generate Prisma Client

```bash
npx prisma generate
```

On restricted Windows PowerShell:

```powershell
npx.cmd prisma generate
```

## 7. Run Prisma Migrations

```bash
npx prisma migrate dev
```

On restricted Windows PowerShell:

```powershell
npx.cmd prisma migrate dev
```

Migration files are stored inside:

```text
backend/prisma/migrations/
```

## 8. Start the Backend

```bash
npm run dev
```

On restricted Windows PowerShell:

```powershell
npm.cmd run dev
```

The backend runs at:

```text
http://localhost:5000
```

Health-check endpoint:

```http
GET http://localhost:5000
```

Expected response:

```json
{
  "success": true,
  "message": "Authentication backend is running"
}
```

## 9. Start the Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The Vite frontend normally runs at:

```text
http://localhost:5173
```

## Environment Variable Reference

### `DATABASE_URL`

MySQL connection string used by Prisma.

```env
DATABASE_URL="mysql://USERNAME:PASSWORD@localhost:3306/auth_platform"
```

### `JWT_SECRET`

Secret used for signing and verifying JWT tokens.

The production value must be long, random, private, and stored in a secure secret manager.

### `JWT_EXPIRES_IN`

Controls access-token expiration.

Example:

```env
JWT_EXPIRES_IN="1d"
```

### `PORT`

Backend HTTP port.

```env
PORT=5000
```

### `FRONTEND_ORIGIN`

The only frontend origin allowed by the CORS policy.

```env
FRONTEND_ORIGIN="http://localhost:5173"
```

## API Contract

Base URL:

```text
http://localhost:5000
```

## 1. Signup

```http
POST /auth/signup
Content-Type: application/json
```

### Request Body

```json
{
  "firstName": "Dheeraj",
  "lastName": "Prasad",
  "email": "dheeraj@example.com",
  "password": "Password@123"
}
```

Public signup always creates a normal `USER` account. Public requests cannot create an `ADMIN` account.

### Successful Response

Status:

```text
201 Created
```

```json
{
  "success": true,
  "data": {
    "id": 1,
    "firstName": "Dheeraj",
    "lastName": "Prasad",
    "email": "dheeraj@example.com",
    "role": "USER",
    "createdAt": "2026-09-16T06:30:09.522Z"
  }
}
```

### Duplicate Email Response

Status:

```text
409 Conflict
```

```json
{
  "success": false,
  "error": {
    "code": "EMAIL_EXISTS",
    "message": "Email already exists"
  }
}
```

### Validation Error Response

Status:

```text
400 Bad Request
```

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "fields": {
      "password": "Password must contain one special character"
    }
  }
}
```

## 2. Signin

```http
POST /auth/signin
Content-Type: application/json
```

### Request Body

```json
{
  "email": "dheeraj@example.com",
  "password": "Password@123"
}
```

### Successful Response

Status:

```text
200 OK
```

```json
{
  "success": true,
  "data": {
    "token": "JWT_ACCESS_TOKEN",
    "user": {
      "id": 1,
      "firstName": "Dheeraj",
      "lastName": "Prasad",
      "email": "dheeraj@example.com",
      "role": "USER"
    }
  }
}
```

The JWT payload contains:

```text
userId
email
role
iat
exp
```

### Invalid Credentials Response

Status:

```text
401 Unauthorized
```

```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid email or password"
  }
}
```

The same response is returned for an unknown email and an incorrect password. This prevents email enumeration.

## 3. User Profile

```http
GET /users/profile
Authorization: Bearer JWT_ACCESS_TOKEN
```

### Successful Response

Status:

```text
200 OK
```

```json
{
  "success": true,
  "data": {
    "id": 1,
    "firstName": "Dheeraj",
    "lastName": "Prasad",
    "email": "dheeraj@example.com",
    "role": "USER",
    "createdAt": "2026-09-16T06:30:09.522Z",
    "updatedAt": "2026-09-16T06:30:09.522Z"
  }
}
```

### Missing Token Response

Status:

```text
401 Unauthorized
```

```json
{
  "message": "Token required"
}
```

### Invalid or Expired Token Response

Status:

```text
401 Unauthorized
```

```json
{
  "message": "Invalid token"
}
```

## 4. Admin Users List

```http
GET /users/list
Authorization: Bearer ADMIN_JWT_ACCESS_TOKEN
```

### Supported Query Parameters

```text
page
limit
role
email
startDate
endDate
```

### Example Request

```http
GET /users/list?page=1&limit=10&role=USER&email=test&startDate=2026-01-01&endDate=2026-12-31
```

### Successful Response

Status:

```text
200 OK
```

```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": 2,
        "firstName": "Test",
        "lastName": "User",
        "email": "testuser@example.com",
        "role": "USER",
        "createdAt": "2026-09-16T06:30:09.522Z",
        "updatedAt": "2026-09-16T06:30:09.522Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalUsers": 1,
      "totalPages": 1
    }
  }
}
```

### Insufficient Role Response

Status:

```text
403 Forbidden
```

```json
{
  "message": "Admin access required"
}
```

### Invalid Pagination Response

Status:

```text
400 Bad Request
```

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Query validation failed",
    "fields": {
      "page": "Page must be at least 1",
      "limit": "Limit must not exceed 100"
    }
  }
}
```

## Additional Error Responses

### Unsupported Content Type

Status:

```text
415 Unsupported Media Type
```

```json
{
  "success": false,
  "error": {
    "code": "UNSUPPORTED_MEDIA_TYPE",
    "message": "Content-Type must be application/json"
  }
}
```

### Rate Limit Exceeded

Status:

```text
429 Too Many Requests
```

```json
{
  "success": false,
  "error": {
    "code": "TOO_MANY_REQUESTS",
    "message": "Too many authentication attempts. Please try again later."
  }
}
```

### Unknown Route

Status:

```text
404 Not Found
```

```json
{
  "success": false,
  "error": {
    "code": "ROUTE_NOT_FOUND",
    "message": "Requested route was not found"
  }
}
```

### Request Body Too Large

Status:

```text
413 Payload Too Large
```

```json
{
  "success": false,
  "error": {
    "code": "PAYLOAD_TOO_LARGE",
    "message": "Request body must not exceed 10kb"
  }
}
```

## Security Decisions

### Password Storage

Passwords are never stored in plain text.

bcrypt is used with a cost factor of 12:

```text
bcrypt.hash(password, 12)
```

The cost factor provides a balance between security and development performance. Production environments should benchmark an appropriate value for their hardware.

### Prevention of Sensitive Data Leakage

Prisma `select` is used to return only required fields.

The following field is never returned in an API response:

```text
passwordHash
```

### Email Enumeration Protection

Signin returns the same message for:

- Unknown email address
- Incorrect password

Response:

```text
Invalid email or password
```

This prevents an attacker from determining whether an email address is registered.

### Role-Escalation Prevention

Public signup cannot create an `ADMIN` account.

Allowing the client to freely submit an admin role would create a privilege-escalation vulnerability.

Admin accounts should be created through a trusted seed script or controlled administrative process.

### JWT Authentication

JWT was selected because the assessment requires stateless authentication.

The token includes:

- User ID
- Email
- Role
- Issued-at timestamp
- Expiration timestamp

The signing secret and token duration are stored in environment variables.

### JWT Transport and Client Storage

The API supports token transport through:

```http
Authorization: Bearer JWT_ACCESS_TOKEN
```

The client-side token-storage strategy must be documented alongside the final frontend implementation.

For production, an HttpOnly, Secure, SameSite cookie can reduce token exposure during an XSS attack. If a bearer token is stored in browser-accessible storage, the associated XSS risk must be explicitly documented and reduced through secure frontend practices.

### Rate Limiting

Signup and signin endpoints are rate-limited.

Current development configuration:

```text
10 requests per 15 minutes
```

This helps reduce automated signup abuse and repeated signin attempts.

### Content-Type Validation

Authentication endpoints accept:

```text
Content-Type: application/json
```

Unsupported content types return `415 Unsupported Media Type`.

### Request Body Limit

JSON request bodies are limited to:

```text
10 KB
```

This reduces abuse through extremely large request payloads.

### Security Headers

Helmet adds security-related HTTP response headers.

### CORS Policy

The backend only accepts browser requests from the configured frontend origin:

```env
FRONTEND_ORIGIN="http://localhost:5173"
```

A wildcard origin is not used with credentialed requests.

### Structured Logging

Each HTTP request logs:

- Request ID
- HTTP method
- Request path
- Status code
- Response time

Passwords, request bodies, JWT tokens, database credentials, and secrets are not intentionally logged.

Example:

```json
{
  "level": "info",
  "requestId": "unique-request-id",
  "method": "GET",
  "path": "/users/profile",
  "statusCode": 200,
  "responseTimeMs": 5
}
```

## Testing Performed

The backend was manually tested using Thunder Client.

### Signup Tests

- Valid signup returns `201`
- Duplicate email returns `409`
- Invalid email returns `400`
- Weak password returns field-level validation error
- Mixed-case email is normalized
- Password hash is stored instead of plain text
- Password hash is not returned by the API

### Signin Tests

- Valid signin returns a JWT
- Incorrect password returns generic `401`
- Unknown email returns the same generic `401`
- JWT includes user ID, email, role, issued-at time, and expiration time

### Protected-Route Tests

- Profile without token returns `401`
- Profile with invalid token returns `401`
- Profile with valid token returns the authenticated user

### Authorization Tests

- A `USER` token receives `403` on `/users/list`
- An `ADMIN` token can access `/users/list`

### Users-List Tests

- Pagination
- Role filtering
- Email search
- Date-range filtering
- Invalid page validation
- Invalid limit validation
- Password hash excluded from all records

### Security Tests

- Authentication rate limiting returns `429`
- `text/plain` request returns `415`
- Unknown route returns `404`
- Security headers are added by Helmet
- Request logs do not include passwords or JWT tokens

## Performance Measurement

Structured request logging records the response time of every API request in milliseconds.

Example:

```json
{
  "method": "GET",
  "path": "/users/list?page=1&limit=10",
  "statusCode": 200,
  "responseTimeMs": 8
}
```

Add measured local results before final submission:

```text
Signup response time: [ADD MEASURED VALUE] ms
Signin response time: [ADD MEASURED VALUE] ms
Profile response time: [ADD MEASURED VALUE] ms
Users-list response time: [ADD MEASURED VALUE] ms
```

The Prisma queries use pagination and field selection to avoid unnecessary data retrieval.

## Evidence

The final submission should include screenshots or recordings showing:

1. Successful signup
2. Duplicate-email response
3. Password field-level validation
4. Successful signin
5. Protected profile response
6. Profile request without a token
7. User-role access to `/users/list` returning `403`
8. Admin access to `/users/list` returning `200`
9. Pagination and filters working
10. Password stored as a bcrypt hash in the database

Do not expose actual JWT secrets, database passwords, or complete production tokens in screenshots.

## Architecture Decision Record

The JWT authentication decision is documented in:

```text
docs/ADR-001-JWT-Authentication.md
```

## Known Limitations

- Automated unit tests are not included.
- Request logging currently uses console output.
- Current rate limiting uses in-memory storage.

## Future Improvements

- Add refresh-token rotation
- Add token revocation
- Add password-change token invalidation
- Add password-reset flow
- Add email verification
- Add audit-log table
- Add account lockout or progressive delay
- Add Redis-backed distributed rate limiting
- Add production-grade structured logging
- Add automated unit, integration, and end-to-end tests
- Add HTTPS deployment configuration
- Add secret rotation and key identifiers

## Team Workflow

The project uses separate development branches:

```text
frontend-dev
backend-dev
```

The final tested frontend and backend changes are merged into:

```text
main
```

Feature work should be committed using meaningful messages, for example:

```text
feat: add signup and signin authentication
feat: add auth middleware and profile endpoint
feat: add admin middleware and users endpoints
feat: improve API security and user listing
docs: add project README
```