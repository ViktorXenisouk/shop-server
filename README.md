# E-Commerce Backend API (Work in Progress)

> REST API backend for a modern e-commerce application, built with Node.js, Express, and TypeScript.

⚠️ **Project status:** Work in Progress

---

## 📌 Overview

This project is the backend part of a full-stack e-commerce application.  
It provides a **REST API** responsible for authentication, authorization, data management, and business logic.

The backend was designed to support a scalable frontend application inspired by modern e-commerce platforms such as **alza.cz**.

---

## 🎯 Project Goals

- Build a real-world REST API for an e-commerce platform
- Implement secure authentication and role-based authorization
- Practice backend architecture and clean code principles
- Integrate common backend tools and services used in production

---

## 🔐 Authentication & Authorization

- JWT-based authentication
- Password hashing with **bcrypt**
- Role-based access control (RBAC)

### User Roles
- **Guest**
- **User**
- **Admin Level 1**
- **Admin Level 2**
- **Admin Level 3**

Each role has different access permissions enforced via middleware.

---

## 🛒 Core Features

- User registration and login
- Role-based access control
- Product management (CRUD)
- Category management (CRUD)
- User management (admin-only)
- Shopping cart functionality
- Favorites management
- Advanced product search
- Image upload and management

---

## 🧱 Architecture

The project follows a modular and scalable architecture:

- **Routes** – API endpoints
- **Controllers** – request handling logic
- **Services** – business logic
- **Models** – MongoDB schemas (Mongoose)
- **Middlewares** – authentication, authorization, error handling
- **Validation** – request data validation
- **Global error handling**

---

## 🛠 Tech Stack

- **Node.js**
- **Express**
- **TypeScript**
- **MongoDB**
- **Mongoose**
- **JWT**
- **bcrypt**
- **multer** – file uploads
- **Cloudinary** – image storage

---

## 🌐 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
