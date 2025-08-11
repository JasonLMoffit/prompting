# GraphQL Express API with PostgreSQL

A complete GraphQL and REST API built with Express.js, Apollo Server, PostgreSQL, and Sequelize ORM. Features comprehensive authentication for both customers and admins with role-based access control.

## 🚀 Features

- **GraphQL API** with Apollo Server
- **REST API** endpoints for authentication
- **PostgreSQL** database with Sequelize ORM
- **JWT Authentication** with role-based access control
- **Customer & Admin** user management
- **Input validation** with express-validator
- **Security middleware** (Helmet, CORS, Rate Limiting)
- **Password hashing** with bcryptjs
- **Comprehensive error handling**

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd graphql-express-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp env.example .env
   ```

   Edit `.env` file with your configuration:

   ```env
   PORT=4000
   NODE_ENV=development

   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=graphql_api
   DB_USER=postgres
   DB_PASSWORD=your_password

   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRES_IN=24h

   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

4. **Set up PostgreSQL database**

   ```sql
   CREATE DATABASE graphql_api;
   CREATE USER your_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE graphql_api TO your_user;
   ```

5. **Start the server**

   ```bash
   # Development mode with auto-reload
   npm run dev

   # Production mode
   npm start
   ```

## 🌐 API Endpoints

### REST API Endpoints

#### Authentication (No auth required)

- `POST /api/auth/register/customer` - Customer registration
- `POST /api/auth/register/admin` - Admin registration
- `POST /api/auth/login` - User login

#### Protected Endpoints (Auth required)

- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password

#### Role-specific Endpoints

- `GET /api/auth/admin/profile` - Admin profile (admin only)
- `PUT /api/auth/admin/profile` - Update admin profile (admin only)
- `PUT /api/auth/admin/change-password` - Admin change password (admin only)
- `GET /api/auth/customer/profile` - Customer profile (customer only)
- `PUT /api/auth/customer/profile` - Update customer profile (customer only)
- `PUT /api/auth/customer/change-password` - Customer change password (customer only)

### GraphQL Endpoint

- `POST /graphql` - GraphQL playground and queries

## 🔐 Authentication

### JWT Token

Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### User Roles

- **customer**: Regular user with limited access
- **admin**: Administrator with full access to all endpoints

## 📊 GraphQL Schema

### Queries

- `me` - Get current user profile
- `getUser(id)` - Get user by ID (admin only)
- `getUsers(role, limit, offset)` - Get all users (admin only)

### Mutations

- `registerCustomer(input)` - Customer registration
- `registerAdmin(input)` - Admin registration
- `login(input)` - User login
- `changePassword(input)` - Change password
- `updateProfile(input)` - Update profile
- `updateUser(id, input)` - Update any user (admin only)
- `deactivateUser(id)` - Deactivate user (admin only)
- `activateUser(id)` - Activate user (admin only)

## 📝 Usage Examples

### Customer Registration

```bash
curl -X POST http://localhost:4000/api/auth/register/customer \
  -H "Content-Type: application/json" \
  -d '{
    "email": "customer@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "1234567890",
    "address": "123 Main St"
  }'
```

### Admin Registration

```bash
curl -X POST http://localhost:4000/api/auth/register/admin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "adminpass123",
    "firstName": "Admin",
    "lastName": "User",
    "adminCode": "ADMIN123"
  }'
```

### Login

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "customer@example.com",
    "password": "password123"
  }'
```

### GraphQL Query Example

```graphql
query {
  me {
    success
    message
    data {
      user {
        id
        email
        firstName
        lastName
        role
        isActive
      }
    }
  }
}
```

### GraphQL Mutation Example

```graphql
mutation {
  updateProfile(input: { firstName: "Jane", phone: "0987654321" }) {
    success
    message
    data {
      user {
        id
        firstName
        phone
      }
    }
  }
}
```

## 🗄️ Database Schema

### User Table

- `id` (UUID, Primary Key)
- `email` (String, Unique)
- `password` (String, Hashed)
- `firstName` (String)
- `lastName` (String)
- `role` (Enum: 'customer', 'admin')
- `isActive` (Boolean)
- `lastLogin` (DateTime)
- `profileImage` (String, Optional)
- `phone` (String, Optional)
- `address` (Text, Optional)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

## 🔒 Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Rate Limiting**: Prevents abuse
- **Input Validation**: Comprehensive validation
- **CORS Protection**: Configurable origins
- **Helmet**: Security headers
- **Role-based Access Control**: Granular permissions

## 🧪 Testing

```bash
npm test
```

## 📁 Project Structure

```
src/
├── config/
│   └── database.js          # Database configuration
├── controllers/
│   └── authController.js    # Authentication logic
├── middleware/
│   ├── auth.js             # JWT authentication
│   └── graphqlAuth.js      # GraphQL context auth
├── models/
│   ├── User.js             # User model
│   └── index.js            # Model associations
├── routes/
│   └── auth.js             # REST API routes
├── schema/
│   ├── typeDefs.js         # GraphQL schema
│   └── resolvers.js        # GraphQL resolvers
├── utils/
│   └── validation.js       # Input validation
└── server.js               # Main server file
```

## 🚀 Deployment

1. Set `NODE_ENV=production` in your environment
2. Configure production database credentials
3. Set secure JWT secret
4. Configure CORS origins for production
5. Use PM2 or similar process manager
6. Set up reverse proxy (nginx) if needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue in the repository.
