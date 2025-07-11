# Backend API

A Node.js/TypeScript backend with Express, TypeORM, and MySQL.

## Prerequisites

- Node.js (v16 or higher)
- MySQL database
- npm or yarn

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the backend directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password_here
DB_NAME=ray_crud
```

### 3. Database Setup

1. Make sure MySQL is running
2. Create a database named `ray_crud` (or update DB_NAME in .env)
3. Update the database credentials in your `.env` file

### 4. Running the Project

#### Development Mode (with hot reload)
```bash
npm run dev
```

#### Production Mode
```bash
# Build the project
npm run build

# Start the server
npm start
```

## API Endpoints

- `GET /api/v1/users` - Get all users
- `POST /api/v1/users` - Create a new user
- `GET /api/v1/users/:id` - Get user by ID
- `PUT /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user



## Features

- TypeScript support
- Express.js framework
- TypeORM for database operations
- MySQL database
- Input validation with Zod
- Rate limiting
- CORS enabled
- Error handling middleware 