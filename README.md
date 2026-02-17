# 🧠 Live Collaborative Whiteboard

A real-time collaborative whiteboard application built using **Java Spring Boot**, **React (Vite)**, **WebSockets (STOMP + SockJS)**, and **PostgreSQL**.

Multiple participants can draw simultaneously, erase content, and see updates instantly across browsers.

---

# 🚀 Live Demo

### 🌐 Frontend (Netlify)
https://whiteboarddemo.netlify.app

### 🖥 Backend (Render)
> ⚠ Backend is deployed on Render Free Tier and may take 30–60 seconds to wake up after inactivity.

---

# 🏗 Tech Stack

## Backend
- Java 17+
- Spring Boot
- Spring WebSocket (STOMP)
- Spring Data JPA
- PostgreSQL (Neon Cloud)
- Docker
- Render Deployment

## Frontend
- React (Vite)
- STOMP.js
- SockJS
- Netlify Deployment

---

# 📡 System Architecture

```
React (Netlify)
      ↓
STOMP over WebSocket (SockJS)
      ↓
Spring Boot (Render)
      ↓
PostgreSQL (Neon)
```

---

# ✨ Features

- Real-time multi-user drawing
- Pen tool
- Eraser tool
- Clear entire board
- Persistent stroke storage
- Auto WebSocket reconnect
- Full-screen responsive canvas

---

# 🗄 Database Design

## Table: strokes

| Column      | Type        | Description                  |
|-------------|------------|------------------------------|
| id          | BIGSERIAL  | Primary Key                  |
| data        | TEXT       | JSON representation of stroke|
| created_at  | TIMESTAMP  | Creation timestamp           |

Each stroke is stored as serialized JSON for flexibility and scalability.

---

# ⚙ Deployment Process

## 🖥 Backend Deployment (Render)

1. Created Dockerfile for Spring Boot application.
2. Built Docker image.
3. Pushed image to Docker Hub.
4. Connected GitHub repository to Render.
5. Configured environment variables:

```
SPRING_DATASOURCE_URL
SPRING_DATASOURCE_USERNAME
SPRING_DATASOURCE_PASSWORD
PORT
```

6. Enabled WebSocket endpoint `/ws`.
7. Connected to Neon PostgreSQL cloud database.

---

## 🌐 Frontend Deployment (Netlify)

1. Built production bundle:

```
npm run build
```

2. Connected GitHub repository to Netlify.
3. Added environment variable
4. Deployed.

---

# ⚠ Free Tier Deployment Limitations (Render)

Since backend is deployed on Render Free Plan:

### 1️⃣ Cold Start Delay
Service sleeps after inactivity.
First request may take 30–60 seconds.

### 2️⃣ WebSocket Delay
Initial WebSocket connection may fail if backend is waking up.

### 3️⃣ Limited Resources
Low CPU and RAM allocation.

### 4️⃣ No Horizontal Scaling
Single instance only.

---

# 🛠 Handling Free Tier Issues

- Implemented STOMP reconnect logic.
- Added client-side retry mechanism.
- Stored strokes in PostgreSQL for persistence.
- Reloaded board state from database on refresh.
- Used environment-based backend URLs for production.

---

# 📂 Project Structure

```
whiteboard-project/
│
├── backend/
│   ├── src/
│   ├── Dockerfile
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

# 🧪 Run Locally

## Backend

```
mvn spring-boot:run
```

## Frontend

```
npm install
npm run dev
```

---

# 🎯 What This Project Demonstrates

- Real-time bidirectional communication using WebSockets
- Backend + Database integration
- Docker containerization
- Cloud deployment
- Handling production deployment challenges
- Environment-based configuration management

---

# 👨‍💻 Author

Durga Prasad  
Full Stack Developer (Java + React)
