import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { Box, CircularProgress, Typography, Alert } from "@mui/material";

const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuthStore();
  const location = useLocation();

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "50vh",
          gap: 2,
        }}
      >
        <CircularProgress size={40} />
        <Typography variant="body1" color="text.secondary">
          Loading...
        </Typography>
      </Box>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page with the return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    // Show access denied message
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "50vh",
          gap: 3,
          p: 4,
        }}
      >
        <Alert severity="error" sx={{ maxWidth: 500 }}>
          Access Denied. You need administrator privileges to access this page.
        </Alert>
        <Typography variant="body1" color="text.secondary" textAlign="center">
          If you believe this is an error, please contact your system
          administrator.
        </Typography>
      </Box>
    );
  }

  return children;
};

export default AdminRoute;
