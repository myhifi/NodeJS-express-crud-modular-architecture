# Node.js Express CRUD Modular Architecture

A robust, modular Node.js backend application built during Week 25 of my Full Stack Development journey. This project demonstrates how to transition from a monolithic server to a clean, scalable modular routing system.

## 🚀 Features
- **Modular Routing**: Separate routes for `Users` and `Products` using `express.Router()`.
- **Data Validation**: Schema-based validation using **Joi** to ensure data integrity.
- **Full CRUD Support**: Create, Read, Update, and Delete operations for all resources.
- **Modern JS**: Utilizes Nullish Coalescing (`??`), Destructuring, and Arrow Functions.

## 🛠 Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Validation**: Joi
- **Dev Tool**: Nodemon (Auto-restart)

## 📁 Project Structure
- `server.js`: The entry point and route orchestrator.
- `/routes`:
    - `users_route.js`: Logic for managing user data.
    - `products_route.js`: Logic for managing product data.

## 🛣 API Endpoints

### Users
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | `/users` | Get all users |
| GET | `/users/:id` | Get user by ID |
| POST | `/users` | Add a new user |
| PUT | `/users/:id` | Update user data |
| DELETE | `/users/:id` | Remove a user |

### Products
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | `/products` | Get all products |
| GET | `/products/:id` | Get product by ID |
| POST | `/products` | Add a new product |
| PUT | `/products/:id` | Update product data |
| DELETE | `/products/:id` | Remove a product |

## 🚦 How to Run
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `npm start` to launch the server on port 5000.
