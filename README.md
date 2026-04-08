
# User Management System (FastAPI + React)

## Overview

This is a role-based User Management System built using FastAPI for the backend and React with Redux for the frontend.

The application supports two roles:

* Admin: Manage users (create, delete, block/unblock, view all users)
* User: Signup, login, and access a home page

The system uses JWT authentication and follows a modular backend structure.

---

## Features

### Authentication

* User signup and login
* Admin login (manually created, no public signup)
* JWT-based authentication
* Password hashing using bcrypt

### User

* Register account
* Login and access user home page
* Logout

### Admin

* Login
* View all users
* Create users
* Delete users
* Block and unblock users

### Security

* Role-based access control
* Protected routes
* Token-based authorization

---

## Tech Stack

Backend:

* FastAPI
* SQLAlchemy
* MySQL
* python-jose (JWT)
* passlib (bcrypt)

Frontend:

* React (Vite)
* Redux Toolkit
* Axios

---

## Project Structure

```
backend/
│
├── app/
│   ├── routers/
│   │   ├── user.py
│   │   ├── admin.py
│   ├── models.py
│   ├── schemas.py
│   ├── auth.py
│   ├── database.py
│   ├── dependencies.py
│   └── main.py
│
├── scripts/
│   └── create_admin.py
│
└── requirements.txt


frontend/
│
├── src/
│   ├── features/auth/
│   ├── pages/
│   │   ├── user/
│   │   ├── admin/
│   ├── routes/
│   └── app/
```

---

## Setup Instructions

### 1. Clone Repository

```
git clone https://github.com/your-username/user-management-fastapi.git
cd user-management-fastapi
```

---

### 2. Backend Setup

```
cd backend
python -m venv fastenv
fastenv\Scripts\activate   (Windows)

pip install -r requirements.txt
```

---

### 3. Configure Environment Variables

Create a `.env` file inside the backend folder:

```
SECRET_KEY=your_secret_key
ALGORITHM=HS256
```

#### Generate SECRET_KEY

Run:

```
python -c "import secrets; print(secrets.token_hex(32))"
```

Copy the generated value into `.env`.

---

### 4. Run Backend

```
uvicorn app.main:app --reload
```

---

### 5. Frontend Setup

```
cd frontend
npm install
npm run dev
```

---

## Admin Creation

Admin users are not created through signup.

To create an admin:

```
python scripts/create_admin.py
```

Enter admin email and password when prompted.

Only one admin is allowed. The script prevents duplicate admin creation.

---

## Authentication Flow

```
User:
Signup → Login → User Home

Admin:
Created manually → Login → Admin Dashboard → Manage Users
```

---

## API Endpoints

User:

* POST /user/signup
* POST /user/login

Admin:

* POST /user/login
* GET /admin/dashboard
* POST /admin/users
* DELETE /admin/users/{id}
* PATCH /admin/users/{id}

---

## Notes

* Do not commit `.env` file to Git
* Use bcrypt version compatible with passlib (bcrypt==4.0.1)
* Admin is created using a script, not via API
