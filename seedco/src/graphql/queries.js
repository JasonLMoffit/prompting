import { gql } from "@apollo/client";

// User Queries
export const GET_ME = gql`
  query GetMe {
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
          lastLogin
          profileImage
          phone
          address
          createdAt
          updatedAt
        }
      }
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
          lastLogin
          profileImage
          phone
          address
          createdAt
          updatedAt
        }
      }
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers($role: UserRole, $limit: Int, $offset: Int) {
    getUsers(role: $role, limit: $limit, offset: $offset) {
      id
      email
      firstName
      lastName
      role
      isActive
      lastLogin
      profileImage
      phone
      address
      createdAt
      updatedAt
    }
  }
`;

// Product Queries (These would need to be added to your API)
export const GET_PRODUCTS = gql`
  query GetProducts(
    $category: String
    $search: String
    $limit: Int
    $offset: Int
  ) {
    getProducts(
      category: $category
      search: $search
      limit: $limit
      offset: $offset
    ) {
      id
      name
      description
      price
      image
      category
      stock
      rating
      reviews
      createdAt
      updatedAt
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      name
      description
      price
      image
      category
      stock
      rating
      reviews {
        id
        rating
        comment
        user {
          firstName
          lastName
        }
        createdAt
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    getCategories {
      id
      name
      description
      image
      productCount
    }
  }
`;

// Order Queries (These would need to be added to your API)
export const GET_ORDERS = gql`
  query GetOrders($status: OrderStatus, $limit: Int, $offset: Int) {
    getOrders(status: $status, limit: $limit, offset: $offset) {
      id
      orderNumber
      status
      total
      items {
        id
        product {
          id
          name
          image
          price
        }
        quantity
        price
      }
      user {
        id
        firstName
        lastName
        email
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_ORDER = gql`
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
      id
      orderNumber
      status
      total
      items {
        id
        product {
          id
          name
          image
          price
        }
        quantity
        price
      }
      user {
        id
        firstName
        lastName
        email
        phone
        address
      }
      createdAt
      updatedAt
    }
  }
`;

// Dashboard Queries (These would need to be added to your API)
export const GET_DASHBOARD_STATS = gql`
  query GetDashboardStats {
    getDashboardStats {
      totalUsers
      totalProducts
      totalOrders
      totalRevenue
      recentOrders {
        id
        orderNumber
        status
        total
        user {
          firstName
          lastName
        }
        createdAt
      }
      topProducts {
        id
        name
        sales
        revenue
      }
    }
  }
`;
