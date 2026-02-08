# Beauty Salon Backend (Express + MongoDB)

Implements the required endpoints:

## Auth
- POST /api/auth/register
- POST /api/auth/login

## Users (private)
- GET /api/users/profile
- PUT /api/users/profile

## Services
- POST /api/service (admin)
- GET /api/service (public)
- PUT /api/service/:id (admin)
- DELETE /api/service/:id (admin)

## Bookings (private)
- POST /api/bookings
- DELETE /api/bookings/:id

---

## Quick start

1) Install dependencies
```bash
npm i
```

2) Create `.env` (copy from `.env.example`)

3) Run
```bash
npm run dev
```

Optional: create an admin user
```bash
npm run seed:admin
```

---

## Notes
- Uses JWT in `Authorization: Bearer <token>`
- Uses Joi validation + centralized error handler
