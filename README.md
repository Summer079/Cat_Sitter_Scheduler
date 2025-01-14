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

# Demo

#### **Signup Page:**
<p align="center">
  <img width="700" alt="cat_sitter01" src="https://github.com/user-attachments/assets/1715a677-8b71-45c2-bf9d-3cb187b77fdf">
</p>

#### **Login Page:**
<p align="center">
  <img width="700" alt="cat_sitter02" src="https://github.com/user-attachments/assets/fedcd3bd-582c-4c4f-9cec-24672b046b3a">
</p>

#### **Home Page:**
<p align="center">
  <img width="700" alt="cat_sitter03" src="https://github.com/user-attachments/assets/a5bb343a-e588-460c-ba1b-a2b4928f5e8e">
</p>

#### **Create a New Booking:**
<p align="center">
  <img width="700" alt="cat_sitter04" src="https://github.com/user-attachments/assets/bb701ef3-1e72-49fb-979a-6f82f0e5490e">
</p>

#### **Upload a Video to the Booking:**
<p align="center">
  <img width="700" alt="cat_sitter05" src="https://github.com/user-attachments/assets/18197dd8-5255-4199-81c5-a0904c21183c">
</p>

#### **After Uploading the Video:**
<p align="center">
  <img width="700" alt="cat_sitter06" src="https://github.com/user-attachments/assets/e2c9e37d-91ad-4da3-9269-f96463a4cd5b">
</p>

#### **Copying the URL via the 'Copy Booking Link' Button on the Home Page: USER 1**
<p align="center">
  <img width="700" alt="cat_sitter07" src="https://github.com/user-attachments/assets/66c26f16-96ac-4c9f-a2e7-5b4eae2cc1a1">
</p>

#### **Different User's Profile: USER 2**
<p align="center">
  <img width="700" alt="cat_sitter08" src="https://github.com/user-attachments/assets/6901e2fd-fc2e-49cd-8671-4f2e99900c29">
</p>

