# Cat Sitter Scheduler with Video Updates

A full-stack application for scheduling cat sitting appointments with video update functionality.

## Features
- Book cat sitting appointments
- Upload and view video updates
- Manage bookings and appointments
- Real-time scheduling system

## Tech Stack
- Frontend: Angular 17
- Backend: Node.js with Express
- Database: PostgreSQL
- File Storage: Local storage

## Project Structure
```
cat-sitter-scheduler/
├── frontend/          # Angular application
├── backend/           # Node.js server
└── docs/             # Documentation
```

## Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- PostgreSQL (v14 or higher)
- Angular CLI

## Setup Instructions
1. Clone the repository
2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```
3. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```
4. Set up the PostgreSQL database
    ```
    brew services start postgresql
    psql postgres
    CREATE DATABASE cat_sitter_db;
    \l
    ```
   Open new ternimal
    ```
    psql -U your_username -d cat_sitter_db
    \dt
    ```
5. Start the backend server:
   ```
   cd backend
   npm run dev
   ```
6. Start the frontend application:
   ```
   cd frontend
   npm start
   ```

## Environment Variables

```
Backend
└── config
    └── config.json
```
```
    "username": "your_username",
    "password": null,
    "database": "cat_sitter_db",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "port": "5432"
```
