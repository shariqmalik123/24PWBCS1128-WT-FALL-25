# Online Bookstore Management API

A RESTful API for managing online bookstore operations built with Node.js, Express, and MongoDB.

## Features

- Get all books with search and pagination
- Get a single book by ID
- Add new books
- Update existing books
- Delete books
- Search by author and genre
- Request logging middleware
- Global error handling
- MongoDB integration
- Environment configuration with dotenv

## Installation

1. **Install Node.js and npm**

   - Download from [nodejs.org](https://nodejs.org/)

2. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Online-Bookstore-Management-API
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Configure environment variables**

   - Update `.env` with your MongoDB URI

   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bookstore?retryWrites=true&w=majority
   NODE_ENV=development
   ```

5. **Start the server**
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

## Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **body-parser** - Parse request bodies
- **dotenv** - Environment configuration
- **nodemon** - Auto-reload during development (dev only)
