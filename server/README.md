# Task Tracker - Backend (Node.js / Express)

This is the backend API for the MERN Task Tracker application. It handles user authentication, data validation, and database operations using MongoDB and Express.js.

## ✨ Features
* **RESTful API:** Clean and predictable API endpoints for tasks and users.
* **JWT Authentication:** Secure user authentication using JSON Web Tokens.
* **Password Hashing:** Passwords are encrypted using `bcryptjs` before being stored in the database.
* **Data Protection:** Tasks are isolated per user; users cannot access or modify tasks belonging to other accounts.
* **Error Handling:** Centralized custom error handling middleware.

## 🚀 Quick Start

### 1. Install Dependencies
Make sure you are in the `/server` directory, then run:
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file in the root of the `/server` directory and add the following variables:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://<username>:<password>@<cluster-url>/<dbname>?...
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=30d
```
*Note: Replace the `MONGO_URI` with your actual MongoDB connection string.*

### 3. Run the Development Server
```bash
npm run dev
```
The API will start at `http://localhost:5000`.

## 🛣️ API Endpoints

### Authentication Routes (`/api/auth`)
* `POST /register` - Register a new user
* `POST /login` - Authenticate user & get token
* `GET /me` - Get current logged-in user (Protected)

### Task Routes (`/api/tasks`)
*All task routes are Protected (require JWT token)*
* `GET /` - Get all tasks for the logged-in user
* `GET /:id` - Get a specific task
* `POST /` - Create a new task
* `PUT /:id` - Update a task
* `DELETE /:id` - Delete a task

## 📦 Key Dependencies
* `express` - Web framework.
* `mongoose` - MongoDB object modeling.
* `jsonwebtoken` - Generating and verifying auth tokens.
* `bcryptjs` - Password hashing.
* `cors` - Cross-Origin Resource Sharing.
