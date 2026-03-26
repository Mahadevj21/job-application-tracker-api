# Job Application Tracker API

A Spring Boot REST API for tracking job applications.

## Auth Endpoints

### 1. Register a new user
**URL:** `/api/auth/register`  
**Method:** `POST`

**Request Body:**
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
  "role": "USER"
}
```

### 2. Login
**URL:** `/api/auth/login`  
**Method:** `POST`

**Request Body:**
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
  "role": "USER"
}
```
