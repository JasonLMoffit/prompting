import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Container,
} from "@mui/material";
import { useCartStore } from "../stores/cartStore";

const Products = () => {
  const cartStore = useCartStore();
  const { addItem } = cartStore;

  // Debug logging
  console.log("Cart store functions:", Object.keys(cartStore));
  console.log("addItem function:", addItem);
  console.log("addItem type:", typeof addItem);

  // Mock data for products (replace with GraphQL queries)
  const products = [
    {
      id: 1,
      name: "Organic Tomato Seeds",
      price: 4.99,
      image:
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop",
      category: "Vegetables",
      rating: 4.8,
      stock: 50,
      description: "High-quality organic tomato seeds for your garden.",
    },
    {
      id: 2,
      name: "Carrot Seeds",
      price: 3.99,
      image:
        "https://images.unsplash.com/photo-1447175008436-170170d0a737?w=400&h=300&fit=crop",
      category: "Vegetables",
      rating: 4.6,
      stock: 75,
      description: "Sweet and crunchy carrot seeds for fresh harvests.",
    },
    {
      id: 3,
      name: "Basil Seeds",
      price: 2.99,
      image:
        "https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?w=400&h=300&fit=crop",
      category: "Herbs",
      rating: 4.9,
      stock: 100,
      description: "Aromatic basil seeds for culinary herbs.",
    },
  ];

  const handleAddToCart = (product) => {
    console.log("handleAddToCart called with:", product);
    console.log("addItem function available:", !!addItem);

    if (typeof addItem === "function") {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      });
    } else {
      console.error("addItem is not a function:", addItem);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Our Products
      </Typography>
      <Typography
        variant="h6"
        color="text.secondary"
        align="center"
        sx={{ mb: 4 }}
      >
        Discover our selection of high-quality seeds and gardening supplies
      </Typography>

      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
              />
              <CardContent
                sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
              >
                <Typography gutterBottom variant="h6" component="h2">
                  {product.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2, flexGrow: 1 }}
                >
                  {product.description}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" color="primary">
                    ${product.price}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Products;
