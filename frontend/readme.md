# Full-Stack Authentication Platform - Frontend

A modern and responsive frontend application built using React, TypeScript, Vite, Material UI, React Router DOM, and Axios.

The application provides user authentication, profile management, role-based user interfaces, and admin user management through seamless integration with backend APIs.

---

# Features

## Authentication

- User Signup
- User Signin
- JWT Token Storage
- Logout Functionality
- Protected Pages

## Profile Management

- View Logged-in User Details
- Display User Role
- Secure Profile Access

## Admin Features

- Manage Users Page
- View All Registered Users
- Filter Users by Role
- Search Users by Email
- Navigate Between Profile and User Management

## User Interface

- Responsive Design
- Material UI Components
- Avatar-Based Profile UI
- Modern Card Layouts
- Gradient Backgrounds
- Mobile Friendly Screens

---

# Technology Stack

## Frontend Framework

- React
- TypeScript
- Vite

## UI Library

- Material UI (MUI)
- Material Icons

## Routing

- React Router DOM

## API Integration

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
│   │
│   ├── pages/
│   │   ├── Signup.tsx
│   │   ├── Signin.tsx
│   │   ├── Profile.tsx
│   │   └── UsersList.tsx
│   │
│   ├── services/
│   │   └── api.ts
│   │
│   ├── utils/
│   │   └── validation.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── package.json
└── README.md
```

---

# Application Flow

```text
Signup
   ↓
Signin
   ↓
Store JWT Token
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
- Validation Messages
- Backend Integration

## Signin Page

Features:

- User Authentication
- JWT Token Storage
- Error Handling
- Redirect to Profile

## Profile Page

Features:

- User Information
- Role Display
- Logout Button

Admin Users:

- Manage Users Button

## Users List Page

Admin Only

Features:

- List All Users
- Role Filter
- Email Search
- Back to Profile Navigation
- User Count Display

---

# Installation

Clone Repository:

```bash
git clone https://github.com/missishaext/fullstack-auth-platform.git
```

Navigate to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Application URL:

```text
http://localhost:5173
```

---

# Build Project

Create production build:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

# Environment Variables

Create `.env` file:

```env
VITE_API_BASE_URL=http://localhost:5000
```

---

# API Integration

Frontend communicates with backend APIs using Axios.

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

- JWT Token Authentication
- Protected Routes
- Authorization Headers
- Role-Based UI Rendering
- Secure Logout

---

# User Roles

## USER

Can:

- Sign Up
- Sign In
- View Profile
- Logout

Cannot:

- Access Users List

## ADMIN

Can:

- Sign Up
- Sign In
- View Profile
- Access Users List
- Search Users
- Filter Users
- Logout

---

# Future Enhancements

- Dark Mode
- Profile Editing
- Forgot Password
- Pagination Controls
- Dashboard Analytics
- User Activity Tracking

---

# Author

**Isha**
Management Trainee
