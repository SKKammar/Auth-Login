# FlyRank Internship Auth API

A secure authentication API using Node.js, Express, and Supabase.

## Prerequisites
- Node.js (v18+)
- Supabase account and project

## Setup Instructions
1. Clone the repository
2. Run `npm install`
3. Copy `.env.example` to `.env` and fill in your Supabase project URL and anon key.

## Run
```bash
npm start
```

## API Reference
| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/auth/signup` | POST | Create new user account | No |
| `/auth/login` | POST | Authenticate and get JWT | No |
| `/auth/logout` | POST | End user session | Yes |
| `/protected/profile` | GET | Read private profile data | Yes |
| `/protected/dashboard` | GET | Read dashboard data | Yes |
| `/public/info` | GET | Public open data | No |

## Swagger UI
Access the Swagger UI at `http://localhost:3000/docs` to see interactive documentation with lock icons on protected routes.

## Example curl commands
**Signup:**
```bash
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

**Protected Call:**
```bash
curl http://localhost:3000/protected/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```
