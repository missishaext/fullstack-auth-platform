# Full-Stack Authentication Platform - Frontend

A modern and responsive frontend application built using React, TypeScript, Vite, Material UI, React Router DOM, and Axios.

The application provides user authentication, profile management, role-based user interface rendering, and admin user-management functionality through integration with backend REST APIs.

---

# Project Features

## Authentication

- User Signup
- User Signin
- JWT Token Storage
- Protected Routes
- Logout Functionality

## Profile Management

- View User Profile
- Display User Information
- Role-Based Access Control
- Secure Profile Access

## Admin Features

- Manage Users Page
- View Registered Users
- Filter Users by Role
- Search Users by Email
- Navigate Back to Profile

## UI Features

- Responsive Design
- Material UI Components
- Avatar-Based Profile Interface
- Modern Card-Based Layout
- Mobile-Friendly Design
- Professional User Experience

---

# Technology Stack

## Frontend Framework

- React
- TypeScript
- Vite

## UI Components

- Material UI (MUI)
- Material Icons

## Routing

- React Router DOM

## API Communication

- Axios

## State Management

- React Hooks
  - useState
  - useEffect

---

# Project Structure

```text
frontend/
│
├── public/
│
├── src/
│
├── pages/
│   ├── Signup.tsx
│   ├── Signin.tsx
│   ├── Profile.tsx
│   └── UsersList.tsx
│
├── services/
│   └── api.ts
│
├── utils/
│   └── validation.ts
│
├── App.tsx
├── main.tsx
└── index.css
│
├── package.json
└── README.md
```

---

# Application Flow

```text
User Registration
        ↓
User Login
        ↓
JWT Token Stored
        ↓
Profile Page
        ↓
Admin User
        ↓
Manage Users
        ↓
Users List
```

---

# Pages

## Signup Page

Features:

- First Name
- Last Name
- Email
- Password
- Client-Side Validation
- Backend API Integration

---

## Signin Page

Features:

- User Authentication
- JWT Token Storage
- Error Handling
- Redirect to Profile

---

## Profile Page

Features:

- Display User Information
- User Role Display
- Logout Functionality

Admin Users:

- Manage Users Button

---

## Users List Page

Admin Only

Features:

- View Registered Users
- Search Users by Email
- Filter Users by Role
- User Count Display
- Back to Profile Navigation

---

# Installation

Clone Repository:

```bash
git clone https://github.com/missishaext/fullstack-auth-platform.git
```

Navigate to frontend directory:

```bash
cd frontend
```

Install Dependencies:

```bash
npm install
```

Start Development Server:

```bash
npm run dev
```

Application URL:

```text
http://localhost:5173
```

---

# Build Project

Create Production Build:

```bash
npm run build
```

Preview Production Build:

```bash
npm run preview
```

---

# Environment Variables

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:5000
```

---

# API Integration

The frontend communicates with backend APIs using Axios.

### Signup

```http
POST /auth/signup
```

### Signin

```http
POST /auth/signin
```

### Profile

```http
GET /users/profile
```

### Users List

```http
GET /users/list
```

---

# Validation

## Signup Validation

- First Name Required
- Last Name Required
- Valid Email Format
- Password Required
- Strong Password Validation

## Signin Validation

- Email Required
- Password Required

---

# Security

- JWT-Based Authentication
- Protected Routes
- Authorization Header Support
- Role-Based User Access
- Secure Logout Functionality

---

# User Roles

## USER

Permissions:

- Sign Up
- Sign In
- View Profile
- Logout

Restrictions:

- Cannot Access Users List

---

## ADMIN

Permissions:

- Sign Up
- Sign In
- View Profile
- Manage Users
- Filter Users
- Search Users
- Logout

---

# Future Enhancements

- Forgot Password
- Reset Password
- Dark Mode
- Profile Editing
- Pagination Controls
- Dashboard Analytics
- Real-Time Notifications

---

# Author

**Isha**  
Management Trainee

---
