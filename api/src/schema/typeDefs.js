const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    role: UserRole!
    isActive: Boolean!
    lastLogin: String
    profileImage: String
    phone: String
    address: String
    createdAt: String!
    updatedAt: String!
  }

  enum UserRole {
    customer
    admin
  }

  type AuthResponse {
    success: Boolean!
    message: String!
    data: AuthData
  }

  type AuthData {
    user: User!
    token: String!
  }

  type ProfileResponse {
    success: Boolean!
    message: String
    data: ProfileData
  }

  type ProfileData {
    user: User!
  }

  type MessageResponse {
    success: Boolean!
    message: String!
  }

  type OrderItem {
    id: ID!
    product: Product!
    quantity: Int!
    price: Float!
  }

  type Product {
    id: ID!
    name: String!
    image: String
    price: Float!
  }

  type Order {
    id: ID!
    orderNumber: String!
    status: OrderStatus!
    total: Float!
    items: [OrderItem!]!
    user: User
    createdAt: String!
    updatedAt: String!
  }

  enum OrderStatus {
    pending
    confirmed
    shipped
    delivered
    cancelled
  }

  type OrderResponse {
    success: Boolean!
    message: String!
    data: OrderData
  }

  type OrderData {
    order: Order!
  }

  input CustomerRegistrationInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    phone: String
    address: String
  }

  input AdminRegistrationInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    adminCode: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input ChangePasswordInput {
    currentPassword: String!
    newPassword: String!
  }

  input ProfileUpdateInput {
    firstName: String
    lastName: String
    phone: String
    address: String
    profileImage: String
  }

  input OrderItemInput {
    productId: ID!
    quantity: Int!
    price: Float!
  }

  input CustomerInfoInput {
    firstName: String!
    lastName: String!
    email: String!
    phone: String
    address: String
    city: String
    state: String
    zipCode: String
    country: String
  }

  input PaymentInfoInput {
    cardLast4: String
    cardType: String
    amount: Float!
  }

  input OrderInput {
    items: [OrderItemInput!]!
    total: Float!
    customerInfo: CustomerInfoInput!
    paymentInfo: PaymentInfoInput!
    guestId: String
    userId: ID
  }

  type Query {
    # Get current user profile
    me: ProfileResponse!

    # Admin-only: Get any user profile
    getUser(id: ID!): ProfileResponse!

    # Admin-only: Get all users
    getUsers(role: UserRole, limit: Int, offset: Int): [User!]!
  }

  type Mutation {
    # Customer registration
    registerCustomer(input: CustomerRegistrationInput!): AuthResponse!

    # Admin registration
    registerAdmin(input: AdminRegistrationInput!): AuthResponse!

    # Login for both customers and admins
    login(input: LoginInput!): AuthResponse!

    # Change password
    changePassword(input: ChangePasswordInput!): MessageResponse!

    # Update profile
    updateProfile(input: ProfileUpdateInput!): ProfileResponse!

    # Admin-only: Update any user
    updateUser(id: ID!, input: ProfileUpdateInput!): ProfileResponse!

    # Admin-only: Deactivate user
    deactivateUser(id: ID!): MessageResponse!

    # Admin-only: Activate user
    activateUser(id: ID!): MessageResponse!

    # Create order (for both authenticated users and guests)
    createOrder(input: OrderInput!): OrderResponse!
  }
`;

module.exports = typeDefs;
