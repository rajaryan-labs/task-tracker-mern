# 📋 Task Tracker — MERN Stack Application

A full-stack Task Management application built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js).

![MERN Stack](https://img.shields.io/badge/MERN-Stack-green)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

### Mandatory Features
- ✅ **CRUD Operations** — Create, Read, Update, Delete tasks
- ✅ **Form Validation** — Client-side + server-side validation
- ✅ **REST API** — RESTful endpoints with Express.js
- ✅ **MongoDB Integration** — Mongoose ODM with Atlas
- ✅ **Responsive UI** — Mobile-first design with TailwindCSS
- ✅ **Dynamic Updates** — SPA with no page refreshes

### Bonus Features
- 🔍 **Search** — Real-time search with debouncing
- 🎯 **Filtering** — Filter by status & priority
- ↕️ **Sorting** — Sort by date, priority, title, status
- 🔔 **Toast Notifications** — Success/error/info notifications
- 🏷️ **Priority Levels** — Low, Medium, High with color coding
- 📅 **Due Dates** — Date picker with overdue highlighting
- 🧩 **Reusable Components** — Modal, Toast, ConfirmDialog
- 🔐 **Environment Variables** — `.env` for both client & server

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js + Vite |
| Styling | TailwindCSS v4 |
| Backend | Node.js + Express.js |
| Database | MongoDB Atlas + Mongoose |
| HTTP Client | Axios |
| Icons | React Icons (Heroicons) |

## 📁 Project Structure

```
Task Shedule/
├── server/                     # Backend API
│   ├── config/db.js            # MongoDB connection
│   ├── models/Task.js          # Task schema
│   ├── routes/taskRoutes.js    # CRUD routes
│   ├── middleware/errorHandler.js
│   ├── server.js               # Entry point
│   └── .env                    # Environment vars
│
├── client/                     # React Frontend
│   ├── src/
│   │   ├── components/         # UI Components
│   │   ├── hooks/useTasks.js   # Custom hook
│   │   ├── utils/api.js        # Axios config
│   │   ├── App.jsx             # Main app
│   │   └── index.css           # Design system
│   └── .env                    # Frontend env
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)

### 1. Clone & Install

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 2. Environment Setup

**Server** (`server/.env`):
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=development
```

**Client** (`client/.env`):
```
VITE_API_URL=http://localhost:5000/api
```

### 3. Run the Application

```bash
# Terminal 1 — Start Backend
cd server
npm run dev

# Terminal 2 — Start Frontend
cd client
npm run dev
```

- Backend: http://localhost:5000
- Frontend: http://localhost:5173

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tasks` | Get all tasks |
| `GET` | `/api/tasks/:id` | Get single task |
| `POST` | `/api/tasks` | Create task |
| `PUT` | `/api/tasks/:id` | Update task |
| `DELETE` | `/api/tasks/:id` | Delete task |

### Query Parameters
- `search` — Search by title/description
- `status` — Filter: `pending`, `in-progress`, `completed`
- `priority` — Filter: `low`, `medium`, `high`
- `sortBy` — Sort: `createdAt`, `dueDate`, `priority`, `title`, `status`
- `order` — Sort order: `asc` or `desc`

## 📝 Task Schema

```json
{
  "title": "String (required, max 100)",
  "description": "String (optional, max 500)",
  "status": "pending | in-progress | completed",
  "priority": "low | medium | high",
  "dueDate": "Date (optional)",
  "createdAt": "Date (auto)",
  "updatedAt": "Date (auto)"
}
```

## 👤 Author

**Raj Aryan**

---

Built with ❤️ using the MERN Stack
