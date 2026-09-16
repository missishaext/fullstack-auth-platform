# ADR-001: JWT-Based Authentication Strategy

## Status

Accepted

## Context

The authentication platform requires a secure and scalable
authentication mechanism.

The system must:

- Support stateless authentication
- Work with REST APIs
- Scale across multiple backend instances
- Avoid server-side session storage

## Decision

JSON Web Tokens (JWT) are used for authentication.

After successful sign-in:

- A JWT access token is generated
- The token contains:
  - userId
  - email
  - role
  - iat
  - exp

The client sends the token using the Authorization header:

Bearer <token>

Protected routes validate the token before granting access.

## Rationale

JWT was selected because:

- Stateless authentication
- Easy integration with REST APIs
- Horizontal scalability
- No session storage requirements
- Industry-standard approach

## Consequences

### Positive

- Scalable architecture
- Reduced server-side state management
- Simple frontend integration

### Negative

- Token revocation requires additional mechanisms
- Stolen tokens remain valid until expiration

## Security Measures

- Passwords are hashed using bcrypt
- JWT secret stored in environment variables
- Token expiration configurable through environment variables
- Role-based authorization enforced for admin routes