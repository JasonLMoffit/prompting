const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const {
  authenticateToken,
  requireAdmin,
  requireCustomer,
} = require("../middleware/auth");
const {
  validateCustomerRegistration,
  validateAdminRegistration,
  validateLogin,
  validateChangePassword,
  validateProfileUpdate,
} = require("../utils/validation");

// Public routes (no authentication required)
router.post(
  "/register/customer",
  validateCustomerRegistration,
  authController.registerCustomer
);
router.post(
  "/register/admin",
  validateAdminRegistration,
  authController.registerAdmin
);
router.post("/login", validateLogin, authController.login);

// Protected routes (authentication required)
router.get("/profile", authenticateToken, authController.getProfile);
router.put(
  "/profile",
  authenticateToken,
  validateProfileUpdate,
  authController.updateProfile
);
router.put(
  "/change-password",
  authenticateToken,
  validateChangePassword,
  authController.changePassword
);

// Admin-only routes
router.get(
  "/admin/profile",
  authenticateToken,
  requireAdmin,
  authController.getProfile
);
router.put(
  "/admin/profile",
  authenticateToken,
  requireAdmin,
  validateProfileUpdate,
  authController.updateProfile
);
router.put(
  "/admin/change-password",
  authenticateToken,
  requireAdmin,
  validateChangePassword,
  authController.changePassword
);

// Customer-only routes
router.get(
  "/customer/profile",
  authenticateToken,
  requireCustomer,
  authController.getProfile
);
router.put(
  "/customer/profile",
  authenticateToken,
  requireCustomer,
  validateProfileUpdate,
  authController.updateProfile
);
router.put(
  "/customer/change-password",
  authenticateToken,
  requireCustomer,
  validateChangePassword,
  authController.changePassword
);

module.exports = router;
