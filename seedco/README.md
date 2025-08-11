# SeedCo E-commerce Frontend

A modern, responsive e-commerce website built with React, Vite, and Material-UI for selling premium seeds and garden supplies.

## 🛍️ **E-commerce Functionality**

- **Product Catalog**: Browse and search through seeds, plants, and garden tools
- **Product Details**: Comprehensive product information with growing guides
- **Shopping Cart**: Add, remove, and manage items with quantity controls
- **Guest Shopping**: Complete purchases without creating an account
- **Checkout Process**: Multi-step checkout with shipping and payment forms
- **Order Management**: Track orders and view order history (requires login)

## 🚀 **Guest Shopping Experience**

### **✨ Guest User Benefits**

- **No Registration Required**: Start shopping immediately without account creation
- **Full Shopping Experience**: Browse products, add to cart, and complete checkout
- **Guest Cart Persistence**: Cart items saved locally during shopping session
- **Seamless Checkout**: Complete purchase with shipping and payment information

### **🔒 Login Requirements**

- **Order History**: View past orders and track current orders
- **Profile Management**: Save shipping addresses and personal information
- **Account Benefits**: Access to saved favorites and personalized recommendations
- **Order Tracking**: Real-time updates on order status and delivery

### **🎯 User Journey**

1. **Browse Products**: Explore catalog without any account requirements
2. **Add to Cart**: Build shopping cart with desired items
3. **Guest Checkout**: Complete purchase with contact and shipping details
4. **Order Confirmation**: Receive order confirmation and tracking information
5. **Optional Login**: Create account to access order history and tracking

### 🔐 **Authentication & Security**

- **JWT-based Authentication**: Secure token-based authentication
- **Protected Routes**: Customer-only areas (cart, checkout, profile)
- **Role-based Access Control**: Customer and admin user roles
- **Single Admin Restriction**: Only one administrator can exist in the system

### 🎨 **Modern UI/UX**

- **Material-UI Design**: Beautiful, consistent Material Design components
- **Responsive Layout**: Mobile-first design that works on all devices
- **Dark/Light Theme**: Customizable color schemes
- **Smooth Animations**: Engaging user interactions and transitions

### 📱 **Responsive Design**

- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Responsive grid layouts
- **Desktop Experience**: Full-featured desktop interface

## Single Admin Restriction System

### 🔒 **Security Features**

- **One Admin Limit**: System prevents creation of multiple administrator accounts
- **Dynamic Role Selection**: Admin role option only appears when no admin exists
- **Visual Feedback**: Clear messaging when admin role is unavailable
- **Form Validation**: Prevents submission of admin registration when restricted

### 🎯 **User Experience**

- **Clear Communication**: Users understand why admin role isn't available
- **Seamless Flow**: No interruption to normal customer registration
- **Demo Accounts**: Easy testing with provided credentials
- **Smart UI**: Registration form adapts based on system state

### 📋 **Demo Accounts**

- **Customer Account**: `customer@seedco.com` (any password)
- **Admin Account**: `admin@seedco.com` (any password)
- **Note**: Only one admin user can exist at any time

## Tech Stack

### **Frontend Framework**

- **React 18**: Latest React with hooks and modern patterns
- **Vite**: Fast build tool and development server
- **TypeScript**: Type-safe JavaScript development

### **UI Components**

- **Material-UI (MUI) v5**: Professional React component library
- **Emotion**: CSS-in-JS styling solution
- **Responsive Design**: Mobile-first approach

### **State Management**

- **Zustand**: Lightweight state management
- **Persistent Storage**: User preferences and cart data
- **Real-time Updates**: Reactive UI updates

### **Routing & Navigation**

- **React Router DOM**: Client-side routing
- **Protected Routes**: Authentication-based access control
- **Admin Routes**: Role-based route protection

### **Data Fetching**

- **Apollo Client**: GraphQL client for API communication
- **JWT Authentication**: Secure API requests
- **Error Handling**: Comprehensive error management

## Project Structure

```
seedco/
├── src/
│   ├── components/
│   │   ├── Layout/          # Header, Footer, Navigation
│   │   ├── Auth/            # Authentication components
│   │   └── UI/              # Reusable UI components
│   ├── pages/
│   │   ├── Auth/            # Login, Register, Profile
│   │   ├── Admin/           # Admin dashboard and management
│   │   └── Shop/            # Products, Cart, Checkout
│   ├── stores/              # Zustand state management
│   ├── graphql/             # GraphQL queries and mutations
│   ├── utils/               # Helper functions
│   └── styles/              # Global styles and themes
├── public/                  # Static assets
└── package.json            # Dependencies and scripts
```

## Getting Started

### **Prerequisites**

- Node.js 16+ and npm
- Modern web browser
- Backend API running (for full functionality)

### **Installation**

```bash
# Clone the repository
git clone <repository-url>
cd seedco

# Install dependencies
npm install

# Start development server
npm run dev
```

### **Development Commands**

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## Configuration

### **Environment Variables**

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:4000
VITE_GRAPHQL_ENDPOINT=/graphql
```

### **API Integration**

The frontend is configured to work with the SeedCo GraphQL API:

- **GraphQL Endpoint**: `/graphql`
- **REST API**: `/api/*`
- **Authentication**: JWT tokens in Authorization header

## Features in Detail

### **Product Management**

- **Product Catalog**: Grid and list views with filtering
- **Search Functionality**: Real-time search with suggestions
- **Category Navigation**: Browse by product type
- **Product Details**: Comprehensive information and images

### **Shopping Experience**

- **Add to Cart**: One-click product addition
- **Cart Management**: Update quantities, remove items
- **Checkout Process**: Multi-step form with validation
- **Order Confirmation**: Success messages and tracking

### **User Management**

- **Registration**: Customer account creation
- **Profile Management**: Update personal information
- **Order History**: View past purchases
- **Admin Dashboard**: Manage products, orders, and users

## Contributing

### **Development Guidelines**

- Follow React best practices and hooks
- Use Material-UI components consistently
- Maintain responsive design principles
- Write clean, readable code with proper comments

### **Code Style**

- Use functional components with hooks
- Implement proper error handling
- Follow Material-UI design patterns
- Maintain accessibility standards

## Deployment

### **Build Process**

```bash
# Create production build
npm run build

# Preview build locally
npm run preview

# Deploy to hosting service
# Upload dist/ folder contents
```

### **Hosting Options**

- **Vercel**: Easy deployment with Git integration
- **Netlify**: Simple static site hosting
- **AWS S3**: Scalable cloud hosting
- **Traditional hosting**: Upload to web server

## Support & Documentation

### **Additional Resources**

- [Material-UI Documentation](https://mui.com/)
- [React Documentation](https://reactjs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Zustand Documentation](https://github.com/pmndrs/zustand)

### **Troubleshooting**

- Check browser console for errors
- Verify API endpoints are accessible
- Ensure all dependencies are installed
- Check environment variable configuration

---

**SeedCo** - Growing dreams, one seed at a time! 🌱
