import React from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Container,
  Chip,
} from "@mui/material";
import { useCartStore } from "../stores/cartStore";

const ProductDetail = () => {
  const { id } = useParams();
  const { addItem } = useCartStore();

  // Mock product data (replace with GraphQL query)
  const product = {
    id: 1,
    name: "Organic Tomato Seeds",
    price: 4.99,
    image:
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&h=400&fit=crop",
    category: "Vegetables",
    rating: 4.8,
    stock: 50,
    description: "High-quality organic tomato seeds for your garden.",
    longDescription:
      "These premium organic tomato seeds are carefully selected for optimal germination and growth. Perfect for both beginners and experienced gardeners, they produce robust plants with delicious, juicy tomatoes. Each packet contains enough seeds for multiple plants and includes detailed growing instructions.",
    features: [
      "100% Organic",
      "Non-GMO",
      "High germination rate",
      "Disease resistant",
      "Suitable for containers",
    ],
    growingInfo: {
      season: "Spring to Summer",
      daysToGermination: "7-14 days",
      daysToHarvest: "60-80 days",
      sunRequirement: "Full sun",
      waterRequirement: "Regular watering",
    },
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
  };

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4">Product not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Product Image */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={product.image}
              alt={product.name}
              sx={{ objectFit: "cover" }}
            />
          </Card>
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h3" component="h1" gutterBottom>
              {product.name}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography variant="h4" color="primary" sx={{ mr: 2 }}>
                ${product.price}
              </Typography>
              <Chip
                label={product.stock > 0 ? "In Stock" : "Out of Stock"}
                color={product.stock > 0 ? "success" : "error"}
                size="small"
              />
            </Box>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {product.description}
            </Typography>

            {/* Product Specifications */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Growing Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Season:</strong> {product.growingInfo.season}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Days to Germination:</strong>{" "}
                    {product.growingInfo.daysToGermination}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Days to Harvest:</strong>{" "}
                    {product.growingInfo.daysToHarvest}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Sun Requirement:</strong>{" "}
                    {product.growingInfo.sunRequirement}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Water Requirement:</strong>{" "}
                    {product.growingInfo.waterRequirement}
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            {/* Rating */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Typography variant="body2" sx={{ mr: 1 }}>
                Rating: {product.rating}/5
              </Typography>
              <Typography variant="body2" color="text.secondary">
                (Based on 100 reviews)
              </Typography>
            </Box>

            {/* Add to Cart Button */}
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              sx={{ width: "100%", py: 1.5 }}
            >
              {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail;
