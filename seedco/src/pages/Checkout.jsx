import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Stepper,
  Step,
  StepLabel,
  Button,
  Grid,
  Card,
  CardContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Divider,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useCartStore } from "../stores/cartStore";
import { useAuthStore } from "../stores/authStore";
import { CREATE_ORDER } from "../graphql/mutations";
import emailjs from "@emailjs/browser";

const steps = ["Shipping Information", "Payment Details", "Order Review"];

const Checkout = () => {
  const navigate = useNavigate();
  const { items, total, clearCart, guestId, initializeGuestCart } =
    useCartStore();
  const { isAuthenticated, user } = useAuthStore();

  const [activeStep, setActiveStep] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });
  const [alertMessage, setAlertMessage] = useState({
    show: false,
    message: "",
    severity: "info",
  });
  const [orderConfirmation, setOrderConfirmation] = useState({
    show: false,
    orderId: "",
    email: "",
  });
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);

  // Initialize guest cart if needed
  React.useEffect(() => {
    if (!isAuthenticated && !guestId) {
      initializeGuestCart();
    }
  }, [isAuthenticated, guestId, initializeGuestCart]);

  // Auto-populate shipping information for authenticated users
  React.useEffect(() => {
    if (isAuthenticated && user) {
      setShippingInfo((prevInfo) => ({
        ...prevInfo,
        firstName: user.firstName || user.name?.split(" ")[0] || "",
        lastName:
          user.lastName || user.name?.split(" ").slice(1).join(" ") || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        zipCode: user.zipCode || "",
        country: user.country || "US",
      }));
    }
  }, [isAuthenticated, user]);

  const showAlert = (message, severity = "info") => {
    setAlertMessage({ show: true, message, severity });
    // Auto-hide alert after different durations based on severity
    const duration =
      severity === "error" ? 4000 : severity === "success" ? 3000 : 5000;
    setTimeout(() => {
      setAlertMessage({ show: false, message: "", severity: "info" });
    }, duration);
  };

  const sendOrderConfirmationEmail = async (orderData) => {
    try {
      // EmailJS configuration - you'll need to set these up
      const serviceId = "YOUR_EMAILJS_SERVICE_ID"; // Replace with your EmailJS service ID
      const templateId = "YOUR_EMAILJS_TEMPLATE_ID"; // Replace with your EmailJS template ID
      const publicKey = "YOUR_EMAILJS_PUBLIC_KEY"; // Replace with your EmailJS public key

      const templateParams = {
        to_email: orderData.customerInfo.email,
        to_name: `${orderData.customerInfo.firstName} ${orderData.customerInfo.lastName}`,
        order_id: orderData.orderId,
        order_total: `$${orderData.total.toFixed(2)}`,
        order_date: new Date().toLocaleDateString(),
        items_list: orderData.items
          .map((item) => `${item.name} x${item.quantity}`)
          .join(", "),
        shipping_address: `${orderData.customerInfo.address}, ${orderData.customerInfo.city}, ${orderData.customerInfo.state} ${orderData.customerInfo.zipCode}`,
      };

      console.log("Sending order confirmation email:", templateParams);

      // Send email using EmailJS
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      console.log("✅ Email sent successfully:", response);
      return true;
    } catch (error) {
      console.error("❌ Error sending order confirmation email:", error);

      // Fallback: log email content for demo purposes
      console.log("📧 Email Content (Demo):");
      console.log("To:", orderData.customerInfo.email);
      console.log("Subject: Order Confirmation -", orderData.orderId);
      console.log("Order ID:", orderData.orderId);
      console.log(
        "Customer:",
        `${orderData.customerInfo.firstName} ${orderData.customerInfo.lastName}`
      );
      console.log(
        "Items:",
        orderData.items
          .map((item) => `${item.name} x${item.quantity}`)
          .join(", ")
      );
      console.log("Total: $", orderData.total.toFixed(2));
      console.log("Order Date:", new Date().toLocaleDateString());
      console.log(
        "Shipping Address:",
        `${orderData.customerInfo.address}, ${orderData.customerInfo.city}, ${orderData.customerInfo.state} ${orderData.customerInfo.zipCode}`
      );

      return false;
    }
  };

  const handleOrderConfirmationClose = () => {
    setOrderConfirmation({ show: false, orderId: "", email: "" });
    navigate("/");
  };

  const handleNext = () => {
    // Validate current step before proceeding
    if (activeStep === 0) {
      // Validate shipping information
      const requiredShippingFields = [
        "firstName",
        "lastName",
        "email",
        "phone",
        "address",
        "city",
        "state",
        "zipCode",
      ];
      const hasEmptyShippingFields = requiredShippingFields.some(
        (field) => !shippingInfo[field]?.trim()
      );

      if (hasEmptyShippingFields) {
        showAlert(
          "Please fill in all required shipping information before proceeding.",
          "error"
        );
        return;
      }
    } else if (activeStep === 1) {
      // Validate payment information
      const requiredPaymentFields = [
        "cardNumber",
        "cardHolder",
        "expiryDate",
        "cvv",
      ];
      const hasEmptyPaymentFields = requiredPaymentFields.some(
        (field) => !paymentInfo[field]?.trim()
      );

      if (hasEmptyPaymentFields) {
        showAlert(
          "Please fill in all required payment information before proceeding.",
          "error"
        );
        return;
      }
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleShippingChange = (field) => (event) => {
    setShippingInfo({
      ...shippingInfo,
      [field]: event.target.value,
    });
  };

  const handlePaymentChange = (field) => (event) => {
    setPaymentInfo({
      ...paymentInfo,
      [field]: event.target.value,
    });
  };

  // Check if current step is valid
  const isCurrentStepValid = () => {
    if (activeStep === 0) {
      // Check shipping information
      const requiredShippingFields = [
        "firstName",
        "lastName",
        "email",
        "phone",
        "address",
        "city",
        "state",
        "zipCode",
      ];
      return !requiredShippingFields.some(
        (field) => !shippingInfo[field]?.trim()
      );
    } else if (activeStep === 1) {
      // Check payment information
      const requiredPaymentFields = [
        "cardNumber",
        "cardHolder",
        "expiryDate",
        "cvv",
      ];
      return !requiredPaymentFields.some(
        (field) => !paymentInfo[field]?.trim()
      );
    }
    return true;
  };

  // Get completion percentage for current step
  const getStepCompletionPercentage = () => {
    if (activeStep === 0) {
      const requiredShippingFields = [
        "firstName",
        "lastName",
        "email",
        "phone",
        "address",
        "city",
        "state",
        "zipCode",
      ];
      const completedFields = requiredShippingFields.filter((field) =>
        shippingInfo[field]?.trim()
      );
      return Math.round(
        (completedFields.length / requiredShippingFields.length) * 100
      );
    } else if (activeStep === 1) {
      const requiredPaymentFields = [
        "cardNumber",
        "cardHolder",
        "expiryDate",
        "cvv",
      ];
      const completedFields = requiredPaymentFields.filter((field) =>
        paymentInfo[field]?.trim()
      );
      return Math.round(
        (completedFields.length / requiredPaymentFields.length) * 100
      );
    }
    return 100;
  };

  const handleSubmitOrder = async () => {
    setIsSubmittingOrder(true);

    try {
      // Get Apollo Client instance
      const client = window.__APOLLO_CLIENT__;
      if (!client) {
        throw new Error("Apollo Client not available");
      }

      // Prepare order data for GraphQL
      const orderInput = {
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        total: total,
        customerInfo: {
          firstName: shippingInfo.firstName,
          lastName: shippingInfo.lastName,
          email: shippingInfo.email,
          phone: shippingInfo.phone,
          address: shippingInfo.address,
          city: shippingInfo.city,
          state: shippingInfo.state,
          zipCode: shippingInfo.zipCode,
          country: shippingInfo.country,
        },
        paymentInfo: {
          cardLast4: paymentInfo.cardNumber.slice(-4),
          cardType: "visa", // This would be determined by card number in production
          amount: total,
        },
        guestId: guestId || null,
        userId: isAuthenticated ? user.id : null,
      };

      console.log("Submitting order via GraphQL:", orderInput);
      console.log("Apollo Client available:", !!client);
      console.log("GraphQL endpoint:", "http://localhost:4000/graphql");

      // Create order via GraphQL
      const { data } = await client.mutate({
        mutation: CREATE_ORDER,
        variables: {
          input: orderInput,
        },
        context: {
          headers: {
            authorization: isAuthenticated
              ? `Bearer ${localStorage.getItem("token")}`
              : "",
          },
        },
      });

      console.log("GraphQL response:", data);

      if (!data?.createOrder?.success) {
        throw new Error(data?.createOrder?.message || "Failed to create order");
      }

      const order = data.createOrder.data.order;
      console.log("Order created successfully:", order);

      // Send order confirmation email
      const emailSent = await sendOrderConfirmationEmail({
        orderId: order.id,
        customerInfo: shippingInfo,
        items,
        total,
        orderDate: new Date().toISOString(),
      });

      // Clear cart after successful order
      clearCart();

      // Show order confirmation
      setOrderConfirmation({
        show: true,
        orderId: order.id,
        email: shippingInfo.email,
      });

      // Show success message
      showAlert(
        `Order placed successfully! Order confirmation sent to ${shippingInfo.email}`,
        "success"
      );
    } catch (error) {
      console.error("Error submitting order:", error);
      showAlert(
        `There was an error processing your order: ${error.message}`,
        "error"
      );
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                value={shippingInfo.firstName}
                onChange={handleShippingChange("firstName")}
                required
                error={!shippingInfo.firstName?.trim()}
                helperText={
                  !shippingInfo.firstName?.trim()
                    ? "First name is required"
                    : isAuthenticated && user?.firstName
                    ? "Auto-filled from profile"
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                value={shippingInfo.lastName}
                onChange={handleShippingChange("lastName")}
                required
                error={!shippingInfo.lastName?.trim()}
                helperText={
                  !shippingInfo.lastName?.trim()
                    ? "Last name is required"
                    : isAuthenticated && user?.lastName
                    ? "Auto-filled from profile"
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={shippingInfo.email}
                onChange={handleShippingChange("email")}
                required
                error={!shippingInfo.email?.trim()}
                helperText={
                  !shippingInfo.email?.trim()
                    ? "Email is required"
                    : isAuthenticated && user?.email
                    ? "Auto-filled from profile"
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                value={shippingInfo.phone}
                onChange={handleShippingChange("phone")}
                required
                error={!shippingInfo.phone?.trim()}
                helperText={
                  !shippingInfo.phone?.trim() ? "Phone is required" : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                value={shippingInfo.address}
                onChange={handleShippingChange("address")}
                required
                error={!shippingInfo.address?.trim()}
                helperText={
                  !shippingInfo.address?.trim() ? "Address is required" : ""
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                value={shippingInfo.city}
                onChange={handleShippingChange("city")}
                required
                error={!shippingInfo.city?.trim()}
                helperText={
                  !shippingInfo.city?.trim() ? "City is required" : ""
                }
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="State"
                value={shippingInfo.state}
                onChange={handleShippingChange("state")}
                required
                error={!shippingInfo.state?.trim()}
                helperText={
                  !shippingInfo.state?.trim() ? "State is required" : ""
                }
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="ZIP Code"
                value={shippingInfo.zipCode}
                onChange={handleShippingChange("zipCode")}
                required
                error={!shippingInfo.zipCode?.trim()}
                helperText={
                  !shippingInfo.zipCode?.trim() ? "ZIP Code is required" : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Country</InputLabel>
                <Select
                  value={shippingInfo.country}
                  label="Country"
                  onChange={handleShippingChange("country")}
                >
                  <MenuItem value="US">United States</MenuItem>
                  <MenuItem value="CA">Canada</MenuItem>
                  <MenuItem value="UK">United Kingdom</MenuItem>
                  <MenuItem value="AU">Australia</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Card Number"
                value={paymentInfo.cardNumber}
                onChange={handlePaymentChange("cardNumber")}
                placeholder="1234 5678 9012 3456"
                required
                error={!paymentInfo.cardNumber?.trim()}
                helperText={
                  !paymentInfo.cardNumber?.trim()
                    ? "Card number is required"
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Card Holder Name"
                value={paymentInfo.cardHolder}
                onChange={handlePaymentChange("cardHolder")}
                required
                error={!paymentInfo.cardHolder?.trim()}
                helperText={
                  !paymentInfo.cardHolder?.trim()
                    ? "Card holder name is required"
                    : ""
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Expiry Date"
                value={paymentInfo.expiryDate}
                onChange={handlePaymentChange("expiryDate")}
                placeholder="MM/YY"
                required
                error={!paymentInfo.expiryDate?.trim()}
                helperText={
                  !paymentInfo.expiryDate?.trim()
                    ? "Expiry date is required"
                    : ""
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="CVV"
                value={paymentInfo.cvv}
                onChange={handlePaymentChange("cvv")}
                required
                error={!paymentInfo.cvv?.trim()}
                helperText={!paymentInfo.cvv?.trim() ? "CVV is required" : ""}
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Paper sx={{ p: 2, mb: 2 }}>
              {items.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography>
                    {item.name} x {item.quantity}
                  </Typography>
                  <Typography>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </Box>
              ))}
              <Divider sx={{ my: 1 }} />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1,
                }}
              >
                <Typography>Subtotal ({items.length} items):</Typography>
                <Typography>${total.toFixed(2)}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1,
                }}
              >
                <Typography>Shipping:</Typography>
                <Typography>Free</Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6" color="primary">
                  ${total.toFixed(2)}
                </Typography>
              </Box>
            </Paper>

            {!isAuthenticated && (
              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  <strong>Guest Checkout Notice:</strong> You're checking out as
                  a guest. To view your order history and track orders, please{" "}
                  <Button
                    color="primary"
                    onClick={() => navigate("/login")}
                    sx={{ p: 0, minWidth: "auto", textTransform: "none" }}
                  >
                    create an account or log in
                  </Button>
                  .
                </Typography>
              </Alert>
            )}

            <Typography variant="body2" color="text.secondary">
              By placing this order, you agree to our terms and conditions.
            </Typography>
          </Box>
        );
      default:
        return "Unknown step";
    }
  };

  if (items.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box textAlign="center">
          <Typography variant="h4" gutterBottom>
            Your cart is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Add some products to your cart to proceed with checkout.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate("/products")}
          >
            Continue Shopping
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Checkout
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Alert Messages */}
      {alertMessage.show && (
        <Alert
          severity={alertMessage.severity}
          sx={{
            mb: 3,
            ...(alertMessage.severity === "success" && {
              border: "2px solid",
              borderColor: "success.main",
              bgcolor: "success.light",
              color: "success.contrastText",
            }),
          }}
          onClose={() =>
            setAlertMessage({ show: false, message: "", severity: "info" })
          }
        >
          {alertMessage.message}
        </Alert>
      )}

      {/* Order Confirmation */}
      {orderConfirmation.show && (
        <Alert
          severity="success"
          sx={{
            mb: 3,
            border: "2px solid",
            borderColor: "success.main",
            bgcolor: "success.light",
            color: "success.contrastText",
          }}
          onClose={() =>
            setOrderConfirmation({ show: false, orderId: "", email: "" })
          }
        >
          <Box>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
              🎉 Order Confirmed!
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Your order <strong>{orderConfirmation.orderId}</strong> has been
              placed successfully!
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              A confirmation email has been sent to{" "}
              <strong>{orderConfirmation.email}</strong>
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Button
                variant="outlined"
                color="inherit"
                size="small"
                onClick={() => navigate("/")}
              >
                Continue Shopping
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                size="small"
                onClick={handleOrderConfirmationClose}
              >
                Go to Home
              </Button>
            </Box>
          </Box>
        </Alert>
      )}

      <Box>
        {activeStep === steps.length ? (
          <Box textAlign="center">
            <Typography variant="h4" gutterBottom>
              Thank you for your order!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Your order has been placed successfully. You will receive a
              confirmation email shortly.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </Button>
          </Box>
        ) : (
          <Box>
            {getStepContent(activeStep)}
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}
            >
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box>
                {activeStep === steps.length - 1 ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmitOrder}
                    disabled={isSubmittingOrder}
                    startIcon={
                      isSubmittingOrder ? <CircularProgress size={20} /> : null
                    }
                  >
                    {isSubmittingOrder ? "Processing..." : "Place Order"}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    disabled={!isCurrentStepValid()}
                  >
                    Next
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Checkout;
