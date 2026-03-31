# Job Application Tracker API

A production-quality Spring Boot REST API for tracking job applications, interviews, and career progress.

---

## Project Overview

The Job Application Tracker API allows users to:
- Register and log in with JWT-based authentication
- Create and manage job applications with status tracking
- Log interviews tied to job applications
- View analytics on their job search progress

---

## Tech Stack

| Layer | Technology |
|---|---|
| Language | Java 17 |
| Framework | Spring Boot 4.x |
| Database | PostgreSQL |
| ORM | Spring Data JPA / Hibernate |
| Security | Spring Security 7 + JWT (JJWT 0.12) |
| Validation | Jakarta Bean Validation |
| Build Tool | Maven |
| Password Hashing | jBCrypt |

---

## Features

- ✅ JWT Authentication (register/login returns token)
- ✅ Full CRUD for Users, JobApplications, and Interviews
- ✅ Pagination & Sorting (default: 10 per page, sorted by `createdAt DESC`)
- ✅ Filtering by `status`, `companyName`, `jobTitle`
- ✅ Analytics endpoint with aggregated stats
- ✅ Complete DTO layer (no entity exposure)
- ✅ Global Exception Handling with structured JSON errors
- ✅ Bean Validation on all request bodies

---

## Authentication

All endpoints except `/api/auth/**` require a valid JWT token.

Include the token in the request header:
```
Authorization: Bearer <your_token>
```

### Register
**POST** `/api/auth/register`

```json
{
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "mysecretpassword",
  "role": "USER"
}
```

**Response (201 Created):**
```json
{
  "message": "User registered successfully",
  "userId": 1,
  "username": "johndoe",
  "role": "USER",
  "token": "eyJhbGciOiJIUzI1NiJ9..."
}
```

### Login
**POST** `/api/auth/login`

```json
{
  "identifier": "johndoe",
  "password": "mysecretpassword"
}
```

**Response (200 OK):**
```json
{
  "message": "Login successful",
  "userId": 1,
  "username": "johndoe",
  "role": "USER",
  "token": "eyJhbGciOiJIUzI1NiJ9..."
}
```

---

## API Endpoints

### Users
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/users` | Create a user |
| GET | `/api/users` | List all users |
| GET | `/api/users/{id}` | Get user by ID |
| PUT | `/api/users/{id}` | Update user |
| DELETE | `/api/users/{id}` | Delete user |

### Job Applications
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/jobs` | Create job application |
| GET | `/api/jobs` | List jobs (with pagination & filtering) |
| GET | `/api/jobs/{id}` | Get job by ID |
| PUT | `/api/jobs/{id}` | Update job |
| DELETE | `/api/jobs/{id}` | Delete job |

**Request Body (POST/PUT):**
```json
{
  "userId": 1,
  "companyName": "Tech Corp",
  "jobTitle": "Backend Engineer",
  "status": "APPLIED",
  "appliedDate": "2026-03-27",
  "notes": "Met them at the tech summit."
}
```

### Interviews
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/interviews` | Create interview |
| GET | `/api/interviews/{id}` | Get interview by ID |
| GET | `/api/interviews/job/{jobId}` | List interviews for a job |
| PUT | `/api/interviews/{id}` | Update interview |
| DELETE | `/api/interviews/{id}` | Delete interview |

**Request Body (POST/PUT):**
```json
{
  "jobApplicationId": 1,
  "round": "Technical Round 1",
  "interviewDate": "2026-04-05T10:00:00",
  "notes": "Focus on system design."
}
```

---

## Pagination & Filtering

The `GET /api/jobs` endpoint supports pagination, sorting, and filtering.

### Pagination & Sorting
```
GET /api/jobs?page=0&size=5&sort=createdAt,desc
GET /api/jobs?page=1&size=10&sort=companyName,asc
```

### Filtering
Filter by a single field at a time:
```
GET /api/jobs?status=APPLIED
GET /api/jobs?status=INTERVIEW
GET /api/jobs?status=OFFER
GET /api/jobs?status=REJECTED
GET /api/jobs?companyName=Amazon
GET /api/jobs?jobTitle=Backend
```

**Available status values:** `APPLIED`, `INTERVIEW`, `OFFER`, `REJECTED`

---

## Analytics

**GET** `/api/analytics/stats` *(requires JWT)*

**Response (200 OK):**
```json
{
  "totalApplications": 50,
  "totalInterviews": 15,
  "offers": 3,
  "rejections": 10,
  "applied": 22,
  "interviews": 15
}
```

---

## Error Response Format

All errors return a structured JSON response:

```json
{
  "timestamp": "2026-03-31T10:00:00.000000",
  "status": 404,
  "error": "Not Found",
  "message": "Job application not found with id: 99"
}
```

Validation errors include field-level detail:
```json
{
  "timestamp": "2026-03-31T10:00:00.000000",
  "status": 400,
  "error": "Validation Failed",
  "fieldErrors": {
    "jobTitle": "Job Title is required",
    "userId": "User ID is required"
  }
}
```

---

## Database Setup

1. Install PostgreSQL and create the database:
```sql
CREATE DATABASE jobtracker;
```

2. Update `src/main/resources/application.properties` with your credentials if different from defaults:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/jobtracker
spring.datasource.username=postgres
spring.datasource.password=root
```

3. Run the application — tables are auto-created via `spring.jpa.hibernate.ddl-auto=update`.
