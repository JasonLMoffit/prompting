import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useApolloClient } from "@apollo/client";
import { LOGIN, REGISTER_CUSTOMER, REGISTER_ADMIN } from "../graphql/mutations";
import { GET_ME } from "../graphql/queries";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      // Actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),

      setToken: (token) => {
        set({ token });
        if (token) {
          localStorage.setItem("token", token);
        } else {
          localStorage.removeItem("token");
        }
      },

      // User registration and management using GraphQL
      registerUser: async (userData) => {
        console.log("registerUser called with:", userData);
        set({ isLoading: true });

        try {
          // Get Apollo Client instance
          const client = window.__APOLLO_CLIENT__;
          console.log("Apollo Client in registerUser:", !!client);
          if (!client) {
            throw new Error("Apollo Client not available");
          }

          let mutation;
          let variables;

          if (userData.role === "admin") {
            mutation = REGISTER_ADMIN;
            variables = {
              input: {
                email: userData.email,
                password: userData.password,
                firstName: userData.firstName,
                lastName: userData.lastName,
                adminCode: userData.adminCode || "ADMIN123",
              },
            };
          } else {
            mutation = REGISTER_CUSTOMER;
            variables = {
              input: {
                email: userData.email,
                password: userData.password,
                firstName: userData.firstName,
                lastName: userData.lastName,
                phone: userData.phone || "",
                address: userData.address || "",
              },
            };
          }

          console.log("Executing GraphQL mutation:", mutation);
          console.log("With variables:", variables);

          const { data } = await client.mutate({
            mutation,
            variables,
          });

          console.log("GraphQL response:", data);

          const result =
            userData.role === "admin"
              ? data.registerAdmin
              : data.registerCustomer;

          if (!result.success) {
            throw new Error(result.message);
          }

          const newUser = result.data.user;
          const token = result.data.token;

          // Set user and token
          set({
            user: newUser,
            token,
            isAuthenticated: true,
            isLoading: false,
          });

          localStorage.setItem("token", token);
          console.log("User registered successfully:", newUser);

          return newUser;
        } catch (error) {
          console.error("Error in registerUser:", error);
          set({ isLoading: false });
          throw error;
        }
      },

      authenticateUser: async (email, password) => {
        set({ isLoading: true });

        try {
          // Get Apollo Client instance
          const client = window.__APOLLO_CLIENT__;
          console.log("Apollo Client in authenticateUser:", !!client);
          if (!client) {
            throw new Error("Apollo Client not available");
          }

          console.log("Executing LOGIN mutation with:", { email, password });

          const { data } = await client.mutate({
            mutation: LOGIN,
            variables: {
              input: { email, password },
            },
          });

          console.log("LOGIN response:", data);

          if (!data.login.success) {
            throw new Error(data.login.message);
          }

          const user = data.login.data.user;
          const token = data.login.data.token;

          // Set user and token
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });

          localStorage.setItem("token", token);
          console.log("User authenticated successfully:", user);

          return user;
        } catch (error) {
          console.error("Error in authenticateUser:", error);
          set({ isLoading: false });
          throw error;
        }
      },

      login: (userData, token) => {
        set({
          user: userData,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
        localStorage.setItem("token", token);
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
        localStorage.removeItem("token");
      },

      updateProfile: (updatedUser) => {
        set((state) => ({
          user: { ...state.user, ...updatedUser },
        }));
      },

      setLoading: (loading) => set({ isLoading: loading }),

      // Check if user is still valid on app start
      checkAuthStatus: async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          set({ isAuthenticated: false, user: null, token: null });
          return;
        }

        try {
          set({ isLoading: true });

          // Get Apollo Client instance
          const client = window.__APOLLO_CLIENT__;
          if (!client) {
            throw new Error("Apollo Client not available");
          }

          const { data } = await client.query({
            query: GET_ME,
            context: {
              headers: {
                authorization: `Bearer ${token}`,
              },
            },
          });

          if (data.me.success) {
            set({
              user: data.me.data.user,
              token,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            // Token is invalid, clear everything
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
            });
            localStorage.removeItem("token");
          }
        } catch (error) {
          console.error("Error checking auth status:", error);
          // Token is invalid, clear everything
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
          localStorage.removeItem("token");
        }
      },

      // Getters
      getUserRole: () => get().user?.role || null,
      isAdmin: () => {
        const user = get().user;
        return user?.role === "admin";
      },
      isCustomer: () => get().user?.role === "customer",

      // Admin restriction check - for now, allow admin creation
      // In production, this would check against the database
      canCreateAdmin: () => {
        return true; // Allow admin creation for demo purposes
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
