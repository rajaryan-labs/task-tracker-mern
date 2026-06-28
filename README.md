# 🚀 MERN Task Tracker

A full-stack, production-ready Task Management web application built with the MERN stack (MongoDB, Express, React, Node.js). 

This project was built to demonstrate full-stack development, RESTful APIs, JWT Authentication, responsive modern UI design, and database management.

![Task Tracker App UI](https://via.placeholder.com/1000x500.png?text=Task+Tracker+MERN+App)

## ✨ Features
- **Secure Authentication:** User registration and login using JWT (JSON Web Tokens) and bcrypt.
- **CRUD Operations:** Create, Read, Update, and Delete tasks.
- **Data Isolation:** Each user has an isolated account and can only see/manage their own tasks.
- **Modern UI:** A sleek dark-mode interface with glassmorphism design, built using pure CSS.
- **Responsive:** Fully responsive layout that looks great on mobile, tablet, and desktop.
- **Search & Filters:** Real-time search, sorting by priority/due date, and filtering capabilities.
- **Dynamic Updates:** Instant UI updates using React state without page reloads.

## 📁 Project Structure

This repository is a monorepo containing both the frontend and backend:

* [`/client`](./client) - React.js frontend built with Vite.
* [`/server`](./server) - Node.js + Express backend API.

## 🚀 Live Demo
- **Frontend (Vercel):** [https://task-tracker-mern-qncb.vercel.app](https://task-tracker-mern-qncb.vercel.app)
- **Backend API (Vercel):** [https://task-tracker-mern-theta.vercel.app](https://task-tracker-mern-theta.vercel.app)

## 💻 Getting Started Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine. You will also need a MongoDB database (e.g., MongoDB Atlas).

### 1. Clone the repository
```bash
git clone https://github.com/rajaryan-labs/task-tracker-mern.git
cd task-tracker-mern
```

### 2. Setup the Backend
Navigate to the `server` directory and follow the [Server README](./server/README.md) instructions.
```bash
cd server
npm install
# Configure .env file
npm run dev
```

### 3. Setup the Frontend
Navigate to the `client` directory and follow the [Client README](./client/README.md) instructions.
```bash
cd ../client
npm install
# Configure .env file
npm run dev
```

## 🛠️ Technology Stack
* **Frontend:** React (Vite), React Router, Context API, Axios, Vanilla CSS
* **Backend:** Node.js, Express.js, Mongoose, JWT, bcryptjs
* **Database:** MongoDB
* **Deployment:** Vercel

## 📝 License
This project is open-source and available under the MIT License.
