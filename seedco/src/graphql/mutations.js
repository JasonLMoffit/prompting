import { gql } from "@apollo/client";

// Authentication Mutations
export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
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
        token
      }
    }
  }
`;

export const REGISTER_CUSTOMER = gql`
  mutation RegisterCustomer($input: CustomerRegistrationInput!) {
    registerCustomer(input: $input) {
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
        token
      }
    }
  }
`;

export const REGISTER_ADMIN = gql`
  mutation RegisterAdmin($input: AdminRegistrationInput!) {
    registerAdmin(input: $input) {
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
        token
      }
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($input: ChangePasswordInput!) {
    changePassword(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($input: ProfileUpdateInput!) {
    updateProfile(input: $input) {
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

// Admin Mutations
export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: ProfileUpdateInput!) {
    updateUser(id: $id, input: $input) {
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

export const DEACTIVATE_USER = gql`
  mutation DeactivateUser($id: ID!) {
    deactivateUser(id: $id) {
      success
      message
    }
  }
`;

export const ACTIVATE_USER = gql`
  mutation ActivateUser($id: ID!) {
    activateUser(id: $id) {
      success
      message
    }
  }
`;

// Product Mutations (These would need to be added to your API)
export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: ProductInput!) {
    createProduct(input: $input) {
      success
      message
      data {
        product {
          id
          name
          description
          price
          image
          category
          stock
          rating
          createdAt
          updatedAt
        }
      }
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $input: ProductUpdateInput!) {
    updateProduct(id: $id, input: $input) {
      success
      message
      data {
        product {
          id
          name
          description
          price
          image
          category
          stock
          rating
          createdAt
          updatedAt
        }
      }
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      success
      message
    }
  }
`;

// Order Mutations
export const CREATE_ORDER = gql`
  mutation CreateOrder($input: OrderInput!) {
    createOrder(input: $input) {
      success
      message
      data {
        order {
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
    }
  }
`;

export const UPDATE_ORDER_STATUS = gql`
  mutation UpdateOrderStatus($id: ID!, $status: OrderStatus!) {
    updateOrderStatus(id: $id, status: $status) {
      success
      message
      data {
        order {
          id
          orderNumber
          status
          total
          createdAt
          updatedAt
        }
      }
    }
  }
`;

// Review Mutations (These would need to be added to your API)
export const CREATE_REVIEW = gql`
  mutation CreateReview($input: ReviewInput!) {
    createReview(input: $input) {
      success
      message
      data {
        review {
          id
          rating
          comment
          product {
            id
            name
          }
          user {
            id
            firstName
            lastName
          }
          createdAt
        }
      }
    }
  }
`;

export const UPDATE_REVIEW = gql`
  mutation UpdateReview($id: ID!, $input: ReviewUpdateInput!) {
    updateReview(id: $id, input: $input) {
      success
      message
      data {
        review {
          id
          rating
          comment
          updatedAt
        }
      }
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation DeleteReview($id: ID!) {
    deleteReview(id: $id) {
      success
      message
    }
  }
`;
