const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { user: User } = require("../models");

// Helper function to get user from context
const getUserFromContext = (context) => {
  if (!context.user) {
    throw new Error("Authentication required");
  }
  return context.user;
};

// Helper function to check admin role
const checkAdminRole = (user) => {
  if (user.role !== "admin") {
    throw new Error("Admin access required");
  }
};

// Helper function to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const resolvers = {
  Query: {
    // Get current user profile
    me: async (_, __, context) => {
      try {
        const user = getUserFromContext(context);
        const currentUser = await User.findByPk(user.id);

        if (!currentUser) {
          throw new Error("User not found");
        }

        return {
          success: true,
          data: {
            user: currentUser.getPublicProfile(),
          },
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
        };
      }
    },

    // Admin-only: Get any user profile
    getUser: async (_, { id }, context) => {
      try {
        const user = getUserFromContext(context);
        checkAdminRole(user);

        const targetUser = await User.findByPk(id);
        if (!targetUser) {
          throw new Error("User not found");
        }

        return {
          success: true,
          data: {
            user: targetUser.getPublicProfile(),
          },
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
        };
      }
    },

    // Admin-only: Get all users
    getUsers: async (_, { role, limit = 50, offset = 0 }, context) => {
      try {
        const user = getUserFromContext(context);
        checkAdminRole(user);

        const whereClause = {};
        if (role) {
          whereClause.role = role;
        }

        const users = await User.findAll({
          where: whereClause,
          limit: Math.min(limit, 100), // Max 100 users per request
          offset,
          order: [["createdAt", "DESC"]],
        });

        return users.map((user) => user.getPublicProfile());
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },

  Mutation: {
    // Customer registration
    registerCustomer: async (_, { input }) => {
      try {
        const { email, password, firstName, lastName, phone, address } = input;

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
          throw new Error("User with this email already exists");
        }

        // Create new customer
        const user = await User.create({
          email,
          password,
          firstName,
          lastName,
          phone,
          address,
          role: "customer",
        });

        const token = generateToken(user.id);

        return {
          success: true,
          message: "Customer registered successfully",
          data: {
            user: user.getPublicProfile(),
            token,
          },
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
        };
      }
    },

    // Admin registration
    registerAdmin: async (_, { input }) => {
      try {
        const { email, password, firstName, lastName, adminCode } = input;

        // Verify admin code (you can customize this)
        if (adminCode !== (process.env.ADMIN_REGISTRATION_CODE || "ADMIN123")) {
          throw new Error("Invalid admin registration code");
        }

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
          throw new Error("User with this email already exists");
        }

        // Create new admin
        const user = await User.create({
          email,
          password,
          firstName,
          lastName,
          role: "admin",
        });

        const token = generateToken(user.id);

        return {
          success: true,
          message: "Admin registered successfully",
          data: {
            user: user.getPublicProfile(),
            token,
          },
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
        };
      }
    },

    // Login for both customers and admins
    login: async (_, { input }) => {
      try {
        const { email, password } = input;

        // Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
          throw new Error("Invalid email or password");
        }

        // Check if user is active
        if (!user.isActive) {
          throw new Error("Account is deactivated");
        }

        // Verify password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
          throw new Error("Invalid email or password");
        }

        // Update last login
        await user.update({ lastLogin: new Date() });

        const token = generateToken(user.id);

        return {
          success: true,
          message: "Login successful",
          data: {
            user: user.getPublicProfile(),
            token,
          },
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
        };
      }
    },

    // Change password
    changePassword: async (_, { input }, context) => {
      try {
        const user = getUserFromContext(context);
        const { currentPassword, newPassword } = input;

        const currentUser = await User.findByPk(user.id);
        if (!currentUser) {
          throw new Error("User not found");
        }

        // Verify current password
        const isCurrentPasswordValid = await currentUser.comparePassword(
          currentPassword
        );
        if (!isCurrentPasswordValid) {
          throw new Error("Current password is incorrect");
        }

        // Update password
        await currentUser.update({ password: newPassword });

        return {
          success: true,
          message: "Password changed successfully",
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
        };
      }
    },

    // Update profile
    updateProfile: async (_, { input }, context) => {
      try {
        const user = getUserFromContext(context);
        const { firstName, lastName, phone, address, profileImage } = input;

        const currentUser = await User.findByPk(user.id);
        if (!currentUser) {
          throw new Error("User not found");
        }

        // Update profile fields
        const updateData = {};
        if (firstName !== undefined) updateData.firstName = firstName;
        if (lastName !== undefined) updateData.lastName = lastName;
        if (phone !== undefined) updateData.phone = phone;
        if (address !== undefined) updateData.address = address;
        if (profileImage !== undefined) updateData.profileImage = profileImage;

        await currentUser.update(updateData);

        return {
          success: true,
          message: "Profile updated successfully",
          data: {
            user: currentUser.getPublicProfile(),
          },
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
        };
      }
    },

    // Admin-only: Update any user
    updateUser: async (_, { id, input }, context) => {
      try {
        const user = getUserFromContext(context);
        checkAdminRole(user);

        const targetUser = await User.findByPk(id);
        if (!targetUser) {
          throw new Error("User not found");
        }

        const { firstName, lastName, phone, address, profileImage } = input;

        // Update profile fields
        const updateData = {};
        if (firstName !== undefined) updateData.firstName = firstName;
        if (lastName !== undefined) updateData.lastName = lastName;
        if (phone !== undefined) updateData.phone = phone;
        if (address !== undefined) updateData.address = address;
        if (profileImage !== undefined) updateData.profileImage = profileImage;

        await targetUser.update(updateData);

        return {
          success: true,
          message: "User updated successfully",
          data: {
            user: targetUser.getPublicProfile(),
          },
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
        };
      }
    },

    // Admin-only: Deactivate user
    deactivateUser: async (_, { id }, context) => {
      try {
        const user = getUserFromContext(context);
        checkAdminRole(user);

        const targetUser = await User.findByPk(id);
        if (!targetUser) {
          throw new Error("User not found");
        }

        await targetUser.update({ isActive: false });

        return {
          success: true,
          message: "User deactivated successfully",
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
        };
      }
    },

    // Admin-only: Activate user
    activateUser: async (_, { id }, context) => {
      try {
        const user = getUserFromContext(context);
        checkAdminRole(user);

        const targetUser = await User.findByPk(id);
        if (!targetUser) {
          throw new Error("User not found");
        }

        await targetUser.update({ isActive: true });

        return {
          success: true,
          message: "User activated successfully",
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
        };
      }
    },

    // Create order (for both authenticated users and guests)
    createOrder: async (_, { input }, context) => {
      try {
        const { items, total, customerInfo, paymentInfo, guestId, userId } =
          input;

        // For demo purposes, we'll create a simple order object
        // In production, this would save to the database
        const order = {
          id: `ORDER_${Date.now()}`,
          orderNumber: `ORD-${Date.now()}`,
          status: "pending",
          total,
          items: items.map((item, index) => ({
            id: index + 1,
            product: {
              id: item.productId,
              name: `Product ${item.productId}`,
              image: "",
              price: item.price,
            },
            quantity: item.quantity,
            price: item.price,
          })),
          user: userId
            ? {
                id: userId,
                firstName: customerInfo.firstName,
                lastName: customerInfo.lastName,
                email: customerInfo.email,
              }
            : null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        console.log("Order created:", order);

        return {
          success: true,
          message: "Order created successfully",
          data: {
            order,
          },
        };
      } catch (error) {
        console.error("Error creating order:", error);
        return {
          success: false,
          message: error.message || "Failed to create order",
        };
      }
    },
  },
};

module.exports = resolvers;
