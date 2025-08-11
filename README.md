# Startups Project

This repository contains various startup-related projects and APIs.

## 📁 Project Structure

```
startups/
├── api/                    # GraphQL Express API with PostgreSQL
│   ├── src/               # Source code
│   ├── scripts/           # Database setup and quick start scripts
│   ├── package.json       # Dependencies and scripts
│   ├── env.example        # Environment variables template
│   ├── .gitignore         # Git ignore rules
│   └── README.md          # Detailed API documentation
├── seedco/                 # E-commerce Frontend with React & Material-UI
│   ├── src/               # React source code
│   ├── public/            # Static assets
│   ├── package.json       # Frontend dependencies
│   ├── vite.config.js     # Vite configuration
│   └── README.md          # Frontend documentation
└── README.md              # This file
```

## 🚀 Available Projects

### 1. GraphQL Express API (`/api`)

A complete GraphQL and REST API built with:

- **Express.js** + **Apollo Server**
- **PostgreSQL** with **Sequelize ORM**
- **JWT Authentication** with role-based access control
- **Customer & Admin** user management systems
- **Comprehensive security** features

**Quick Start:**

```bash
cd api
npm install
cp env.example .env
# Edit .env with your database credentials
npm run dev
```

**Features:**

- ✅ Customer registration, login, profile management
- ✅ Admin registration, login, profile management
- ✅ Password change functionality
- ✅ Role-based access control
- ✅ GraphQL and REST endpoints
- ✅ Input validation and security middleware

For detailed documentation, see [api/README.md](api/README.md).

### 2. SeedCo E-commerce Frontend (`/seedco`)

A modern, responsive e-commerce website built with:

- **React 18** + **Vite**
- **Material-UI (MUI)** for beautiful, responsive design
- **GraphQL** integration with Apollo Client
- **Zustand** for state management
- **Role-based access control** for customers and admins

**Quick Start:**

```bash
cd seedco
npm install
npm run dev
```

**Features:**

- ✅ Beautiful, responsive Material-UI design
- ✅ Complete authentication system (login, register, profile)
- ✅ Shopping cart with persistence
- ✅ Product catalog and search
- ✅ Admin dashboard for product/user management
- ✅ Full GraphQL integration with backend API
- ✅ Mobile-first responsive design

For detailed documentation, see [seedco/README.md](seedco/README.md).

## 🛠️ Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd startups
   ```

2. **Choose a project** from the available options above

3. **Follow the specific project's README** for detailed setup instructions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
