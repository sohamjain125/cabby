# Cabby Web App

Cabby is a full-stack ride-hailing web application featuring a Node.js/Express backend and a React + Vite frontend. The platform supports user and captain (driver) registration, authentication, ride booking, live tracking, and more.

---

## Features

### Backend (Node.js/Express, MongoDB)
- User and Captain (driver) registration & login (JWT-based authentication)
- Ride creation, fare calculation, and ride history
- Map integration for address lookup, distance, and time estimation
- Token blacklisting for secure logout
- RESTful API endpoints (see `Backend/README.md` for full API docs)
- Socket.io for real-time features

### Frontend (React + Vite)
- Modern, responsive UI built with React
- Mobile-first design: **The web app is optimized for mobile view and looks best on mobile devices**
- User and Captain dashboards
- Live ride tracking, booking, and payment flows
- Google Maps integration
- State management with React Context

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB database (local or cloud)

### Backend Setup
```bash
cd Backend
npm install
npm start
```
- Configure your environment variables in a `.env` file (see `Backend/app.js` for required variables like `MONGODB_URI`, `JWT_SECRET`, etc.)

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## Deployment

- The backend is ready for deployment on platforms like Render. Ensure your `Backend/package.json` has a `start` script and uses `process.env.PORT`.
- Set environment variables in your deployment dashboard (MongoDB URI, JWT secret, etc.).
- The frontend can be deployed on Vercel, Netlify, or similar platforms.

---

## Documentation
- **Backend API:** See [`Backend/README.md`](Backend/README.md)
- **Frontend:** See [`frontend/README.md`](frontend/README.md)

---

## Tech Stack
- **Backend:** Node.js, Express, MongoDB, Mongoose, Socket.io
- **Frontend:** React, Vite, Tailwind CSS, Google Maps API

---

## Note
> This web app is designed to be mobile-friendly and provides the best user experience on mobile devices.
