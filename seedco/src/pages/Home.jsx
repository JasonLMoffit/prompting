import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Chip,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  LocalFlorist as SeedIcon,
  Nature as EcoIcon,
  LocalShipping as ShippingIcon,
  Support as SupportIcon,
  ArrowForward as ArrowIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../stores/cartStore";
import { useAuthStore } from "../stores/authStore";

// Mock data for featured products (replace with GraphQL queries)
const featuredProducts = [
  {
    id: 1,
    name: "Organic Tomato Seeds",
    price: 4.99,
    image:
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop",
    category: "Vegetables",
    rating: 4.8,
    stock: 50,
  },
  {
    id: 2,
    name: "Basil Herb Seeds",
    price: 3.99,
    image:
      "https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?w=400&h=300&fit=crop",
    category: "Herbs",
    rating: 4.6,
    stock: 75,
  },
  {
    id: 3,
    name: "Sunflower Seeds",
    price: 2.99,
    image:
      "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=400&h=300&fit=crop",
    category: "Flowers",
    rating: 4.9,
    stock: 100,
  },
  {
    id: 4,
    name: "Garden Tool Set",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=300&fit=crop",
    category: "Tools",
    rating: 4.7,
    stock: 25,
  },
];

const categories = [
  {
    name: "Vegetable Seeds",
    icon: "🥕",
    count: 45,
    color: "#4CAF50",
  },
  {
    name: "Herb Seeds",
    icon: "🌿",
    count: 32,
    color: "#8BC34A",
  },
  {
    name: "Flower Seeds",
    icon: "🌸",
    count: 28,
    color: "#E91E63",
  },
  {
    name: "Garden Tools",
    icon: "🛠️",
    count: 18,
    color: "#FF9800",
  },
];

const features = [
  {
    icon: <SeedIcon sx={{ fontSize: 40, color: "primary.main" }} />,
    title: "Premium Quality Seeds",
    description:
      "Carefully selected and tested seeds for optimal germination and growth.",
  },
  {
    icon: <EcoIcon sx={{ fontSize: 40, color: "primary.main" }} />,
    title: "Organic & Sustainable",
    description:
      "Eco-friendly products that support sustainable gardening practices.",
  },
  {
    icon: <ShippingIcon sx={{ fontSize: 40, color: "primary.main" }} />,
    title: "Fast Shipping",
    description:
      "Quick delivery to ensure your seeds arrive in perfect condition.",
  },
  {
    icon: <SupportIcon sx={{ fontSize: 40, color: "primary.main" }} />,
    title: "Expert Support",
    description: "Get gardening advice from our team of horticulture experts.",
  },
];

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  const handleAddToCart = (product) => {
    addItem(product);
  };

  const handleViewProduct = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleStartShopping = () => {
    navigate("/products");
  };

  return (
    <Box>
      {/* Hero Section */}
      <Paper
        sx={{
          position: "relative",
          backgroundColor: "grey.800",
          color: "white",
          mb: 6,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&h=600&fit=crop)",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: "rgba(0,0,0,.3)",
          }}
        />
        <Container maxWidth="lg" sx={{ position: "relative", py: 8 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                component="h1"
                variant={isMobile ? "h3" : "h2"}
                gutterBottom
                sx={{ fontWeight: 700, mb: 3 }}
              >
                Grow Your Dreams with Premium Seeds
              </Typography>
              <Typography variant="h6" paragraph sx={{ mb: 4, opacity: 0.9 }}>
                Discover our carefully curated collection of high-quality seeds,
                garden tools, and expert advice to help your garden thrive.
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate("/products")}
                  sx={{ px: 4, py: 1.5 }}
                >
                  Shop Now
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{ px: 4, py: 1.5, color: "white", borderColor: "white" }}
                >
                  Learn More
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Paper>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          textAlign="center"
          sx={{ mb: 6, fontWeight: 600 }}
        >
          Why Choose SeedCo?
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                sx={{
                  textAlign: "center",
                  p: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                {feature.icon}
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  sx={{ fontWeight: 600 }}
                >
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Categories Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          textAlign="center"
          sx={{ mb: 6, fontWeight: 600 }}
        >
          Shop by Category
        </Typography>
        <Grid container spacing={3}>
          {categories.map((category, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: theme.shadows[8],
                  },
                  borderTop: `4px solid ${category.color}`,
                }}
                onClick={() =>
                  navigate(
                    `/products?category=${category.name
                      .toLowerCase()
                      .replace(" ", "-")}`
                  )
                }
              >
                <Typography variant="h1" sx={{ mb: 2 }}>
                  {category.icon}
                </Typography>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  sx={{ fontWeight: 600 }}
                >
                  {category.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {category.count} products
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Products Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography variant="h4" component="h2" sx={{ fontWeight: 600 }}>
            Featured Products
          </Typography>
          <Button
            endIcon={<ArrowIcon />}
            onClick={() => navigate("/products")}
            sx={{ textTransform: "none" }}
          >
            View All Products
          </Button>
        </Box>
        <Grid container spacing={3}>
          {featuredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: theme.shadows[8],
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 1,
                    }}
                  >
                    <Chip
                      label={product.category}
                      size="small"
                      sx={{ bgcolor: "primary.light", color: "white" }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      ⭐ {product.rating}
                    </Typography>
                  </Box>
                  <Typography
                    variant="h6"
                    component="h3"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{ fontWeight: 700 }}
                  >
                    ${product.price}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    {product.stock} in stock
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleViewProduct(product.id)}
                    sx={{ flex: 1 }}
                  >
                    View Details
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => handleAddToCart(product)}
                    sx={{ flex: 1 }}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Container maxWidth="md" sx={{ mb: 8 }}>
        <Paper
          sx={{
            p: 6,
            textAlign: "center",
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            color: "white",
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ fontWeight: 700, mb: 2 }}
          >
            Ready to Start Your Garden?
          </Typography>
          <Typography variant="h6" paragraph sx={{ mb: 4, opacity: 0.9 }}>
            {isAuthenticated
              ? "Continue your gardening journey with SeedCo."
              : "Start shopping today - no account required for checkout!"}
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={handleStartShopping}
              sx={{
                px: 6,
                py: 2,
                bgcolor: "white",
                color: "primary.main",
                "&:hover": {
                  bgcolor: "grey.100",
                },
              }}
            >
              Start Shopping
            </Button>
            {!isAuthenticated && (
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate("/register")}
                sx={{
                  px: 6,
                  py: 2,
                  color: "white",
                  borderColor: "white",
                  "&:hover": {
                    borderColor: "white",
                    bgcolor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                Create Account
              </Button>
            )}
          </Box>
          {!isAuthenticated && (
            <Typography variant="body2" sx={{ mt: 3, opacity: 0.8 }}>
              Shop as a guest or create an account to track orders and save
              favorites
            </Typography>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Home;
