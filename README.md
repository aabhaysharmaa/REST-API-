# 🔐 REST Auth API (TypeScript + Express + MongoDB)

A simple authentication system built with Node.js, Express, TypeScript, and MongoDB.

---

A simple and secure REST-based authentication system built from scratch using Node.js, Express, TypeScript, and MongoDB.

---

## ✨ Features

- ✅ User registration with email and password
- ✅ Secure login with salted and hashed passwords (using crypto)
- ✅ Cookie-based session token authentication
- ✅ Logout with session invalidation
- ✅ Protected routes using auth middleware
- ✅ MongoDB persistence using Mongoose
- ✅ Pure logic (no Passport, no Auth0)
- ✅ Written in clean, scalable TypeScript

---

## 🚀 Getting Started

### 1. Clone the Repository

## Git Clone -`https://github.com/aabhaysharmaa/REST-API-.git`

### 2. Install Dependencies

npm install

### 3. Create a `.env` File

## In the project root, create a file named `.env` and add

PORT=your_port
MONGO_URI=Mongo-Atlas-Url
COOKIE_SECRET=your_cookie_secret

---

## ✅ API Endpoints

| Method | Endpoint         | Description          |
|--------|------------------|----------------------|
| POST   | /auth/register   | Register a new user  |
| POST   | /auth/login      | Log in the user      |
| POST   | /auth/logout     | Log out the user     |
| GET    | /profile         | Access protected data|

---

## 📁 Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose
- Crypto (for password hashing)
- Cookie-based session handling
- compression for fast data transfer

---

## 🧑‍💻 Author

## **Abhay Sharma**
