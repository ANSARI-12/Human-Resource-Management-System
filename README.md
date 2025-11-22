# HRMS (Human Resource Management System)

A full-stack HRMS application built with Node.js, Express, Sequelize, MySQL for the backend, and React for the frontend.

## Features

- Organization registration
- User authentication (JWT)
- Team management
- Employee management
- Logging middleware

## Setup

1. Clone the repository.
2. Install dependencies for backend and frontend:
   ```
   cd backend
   npm install
   cd ../frontend
   npm install
   ```
3. Set up environment variables: Create `backend/.env` with:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=your_password
   DB_NAME=hrms_db
   DB_PORT=3306
   JWT_SECRET=your_secret
   PORT=5000
   ```
4. Ensure MySQL is running.
5. Run the backend:
   ```
   cd backend
   npm run dev
   ```
6. Run the frontend:
   ```
   cd frontend
   npm start
   ```
7. Open http://localhost:3000 in your browser.

## API Endpoints

- `/api/auth` - Authentication
- `/api/teams` - Team management
- `/api/employees` - Employee management
