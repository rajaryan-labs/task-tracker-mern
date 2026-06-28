# Task Tracker - Frontend (React / Vite)

This is the frontend portion of the MERN Task Tracker application. It provides a modern, fast, and responsive user interface for managing tasks, built with React and Vite.

## ✨ Features
* **Dark Mode & Glassmorphism UI:** A sleek, premium design built entirely with custom CSS.
* **Authentication Flow:** User registration and login screens.
* **Dynamic State Management:** Utilizes React Context API to manage authentication and application state across components.
* **Instant Feedback:** Toast notifications and smooth micro-animations.
* **Search & Filter:** Client-side sorting and filtering for quick task retrieval.

## 🚀 Quick Start

### 1. Install Dependencies
Make sure you are in the `/client` directory, then run:
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file in the root of the `/client` directory:
```env
VITE_API_URL=http://localhost:5000/api
```
*(If deploying to production, replace this URL with your live backend API URL).*

### 3. Run the Development Server
```bash
npm run dev
```
The frontend will start at `http://localhost:5174` (or similar).

## 🛠️ Build for Production
To generate a production-ready build:
```bash
npm run build
```
The optimized files will be placed in the `/dist` directory.

## 📦 Key Dependencies
* `react` & `react-dom` - Core UI library.
* `react-router-dom` - Client-side routing.
* `axios` - Handling HTTP requests to the backend API.
* `react-icons` - Scalable SVG icons.
