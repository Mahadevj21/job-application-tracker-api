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

## Job Application Endpoints

### 1. Create a Job Application
**URL:** `/api/jobs`  
**Method:** `POST`

**Request Body:**
```json
{
  "companyName": "Tech Corp",
  "jobTitle": "Backend Engineer",
  "status": "APPLIED",
  "appliedDate": "2026-03-27",
  "notes": "Met them at the tech summit."
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "companyName": "Tech Corp",
  "jobTitle": "Backend Engineer",
  "status": "APPLIED",
  "appliedDate": "2026-03-27",
  "notes": "Met them at the tech summit.",
  "createdAt": "2026-03-27T10:00:00.000000",
  "updatedAt": "2026-03-27T10:00:00.000000"
}
```

### 2. Get All Jobs (with Pagination & Sorting)
**URL:** `/api/jobs`  
**Method:** `GET`  
**Query Parameters (Optional):**  
- `page`: Page number (0-indexed, default: `0`)
- `size`: Items per page (default: `10`)
- `sort`: Field to sort by, e.g., `createdAt,desc` (default: `createdAt,DESC`)

*Example:* `/api/jobs?page=0&size=5&sort=companyName,asc`

**Response (200 OK):**
```json
{
  "content": [
    {
      "id": 1,
      "companyName": "Tech Corp",
      "jobTitle": "Backend Engineer",
      "status": "APPLIED",
      "appliedDate": "2026-03-27",
      "notes": "Met them at the tech summit.",
      "createdAt": "2026-03-27T10:00:00.000000",
      "updatedAt": "2026-03-27T10:00:00.000000"
    }
  ],
  "pageable": {
    "pageNumber": 0,
    "pageSize": 5,
    "sort": {
      "sorted": true,
      "empty": false,
      "unsorted": false
    },
    "offset": 0,
    "paged": true,
    "unpaged": false
  },
  "last": true,
  "totalPages": 1,
  "totalElements": 1,
  "size": 5,
  "number": 0,
  "sort": {
    "sorted": true,
    "empty": false,
    "unsorted": false
  },
  "numberOfElements": 1,
  "first": true,
  "empty": false
}
```

### 3. Get Job by ID
**URL:** `/api/jobs/{id}`  
**Method:** `GET`

**Response (200 OK):**
```json
{
  "id": 1,
  "companyName": "Tech Corp",
  "jobTitle": "Backend Engineer",
  "status": "APPLIED",
  "appliedDate": "2026-03-27",
  "notes": "Met them at the tech summit.",
  "createdAt": "2026-03-27T10:00:00.000000",
  "updatedAt": "2026-03-27T10:00:00.000000"
}
```

### 4. Update a Job Application
**URL:** `/api/jobs/{id}`  
**Method:** `PUT`

**Request Body:**
```json
{
  "companyName": "Tech Corp",
  "jobTitle": "Backend Engineer",
  "status": "INTERVIEW",
  "appliedDate": "2026-03-27",
  "notes": "Interview scheduled for next week."
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "companyName": "Tech Corp",
  "jobTitle": "Backend Engineer",
  "status": "INTERVIEW",
  "appliedDate": "2026-03-27",
  "notes": "Interview scheduled for next week.",
  "createdAt": "2026-03-27T10:00:00.000000",
  "updatedAt": "2026-03-27T14:30:00.000000"
}
```

### 5. Delete a Job
**URL:** `/api/jobs/{id}`  
**Method:** `DELETE`

**Response (204 No Content)**
```
