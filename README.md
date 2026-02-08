# Backend Service Booking API

This is a backend REST API built with **Node.js**, **Express**, and **MongoDB**.  
The project provides authentication, user management, services management, and booking functionality.


## Project Overview

The backend supports:
- User registration and login
- User profile management
- Services CRUD (admin only)
- Booking services (authenticated users)
- Role-based access control (user / admin)

The API follows REST principles and uses JSON for data exchange.

---

## Technologies Used

- Node.js
- Express.js
- MongoDB + Mongoose
- express-session / JWT-based authentication
- Joi validation
- Helmet, CORS, Morgan

---

## Technologies Used

- Node.js
- Express.js
- MongoDB + Mongoose
- express-session / JWT-based authentication
- Joi validation
- Helmet, CORS, Morgan

---

## Setup and Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment variables
Create a .env file in the root directory and add:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
```

### 4. Run the project
```bash
npm run dev
```
or

```bash
npm start
```

The server will run on:
```
http://localhost:5000
```

## API Documentation

### Authentication Routes

| Method | Route | Access | Description |
|------|------|--------|-------------|
| POST | `/api/auth/register` | Public | Register a new user |
| POST | `/api/auth/login` | Public | Login user |

---

### User Routes

| Method | Route | Access | Description |
|------|------|--------|-------------|
| GET | `/api/users/profile` | Authenticated | Get user profile |
| PUT | `/api/users/profile` | Authenticated | Update user profile |

---

### Service Routes

| Method | Route | Access | Description |
|------|------|--------|-------------|
| GET | `/api/service` | Public | Get all services |
| POST | `/api/service` | Admin | Create new service |
| PUT | `/api/service/:id` | Admin | Update service |
| DELETE | `/api/service/:id` | Admin | Delete service |

---

### Booking Routes

| Method | Route | Access | Description |
|------|------|--------|-------------|
| POST | `/api/bookings` | Authenticated | Create booking |
| DELETE | `/api/bookings/:id` | Authenticated | Delete booking |

## Project Structure
```arduino
src/
 ├── controllers/
 ├── routes/
 ├── models/
 ├── middleware/
 ├── validators/
 ├── config/
 ├── app.js
 └── server.js
 ```

