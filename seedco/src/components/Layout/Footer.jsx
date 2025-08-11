import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
} from "@mui/material";
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
} from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "grey.900",
        color: "white",
        py: 6,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: "primary.main", fontWeight: 700 }}
            >
              SeedCo
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: "grey.300" }}>
              Premium seeds and garden supplies for passionate gardeners. Grow
              your dreams with our carefully curated selection of high-quality
              products.
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                size="small"
                sx={{ color: "grey.400", "&:hover": { color: "primary.main" } }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                size="small"
                sx={{ color: "grey.400", "&:hover": { color: "primary.main" } }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                size="small"
                sx={{ color: "grey.400", "&:hover": { color: "primary.main" } }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                size="small"
                sx={{ color: "grey.400", "&:hover": { color: "primary.main" } }}
              >
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={2}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: "primary.main" }}
            >
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link
                href="/"
                color="inherit"
                underline="hover"
                sx={{ color: "grey.300" }}
              >
                Home
              </Link>
              <Link
                href="/products"
                color="inherit"
                underline="hover"
                sx={{ color: "grey.300" }}
              >
                Products
              </Link>
              <Link
                href="/about"
                color="inherit"
                underline="hover"
                sx={{ color: "grey.300" }}
              >
                About Us
              </Link>
              <Link
                href="/contact"
                color="inherit"
                underline="hover"
                sx={{ color: "grey.300" }}
              >
                Contact
              </Link>
            </Box>
          </Grid>

          {/* Categories */}
          <Grid item xs={12} md={2}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: "primary.main" }}
            >
              Categories
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link
                href="/products?category=vegetables"
                color="inherit"
                underline="hover"
                sx={{ color: "grey.300" }}
              >
                Vegetable Seeds
              </Link>
              <Link
                href="/products?category=herbs"
                color="inherit"
                underline="hover"
                sx={{ color: "grey.300" }}
              >
                Herb Seeds
              </Link>
              <Link
                href="/products?category=flowers"
                color="inherit"
                underline="hover"
                sx={{ color: "grey.300" }}
              >
                Flower Seeds
              </Link>
              <Link
                href="/products?category=tools"
                color="inherit"
                underline="hover"
                sx={{ color: "grey.300" }}
              >
                Garden Tools
              </Link>
            </Box>
          </Grid>

          {/* Support */}
          <Grid item xs={12} md={2}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: "primary.main" }}
            >
              Support
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link
                href="/help"
                color="inherit"
                underline="hover"
                sx={{ color: "grey.300" }}
              >
                Help Center
              </Link>
              <Link
                href="/shipping"
                color="inherit"
                underline="hover"
                sx={{ color: "grey.300" }}
              >
                Shipping Info
              </Link>
              <Link
                href="/returns"
                color="inherit"
                underline="hover"
                sx={{ color: "grey.300" }}
              >
                Returns
              </Link>
              <Link
                href="/faq"
                color="inherit"
                underline="hover"
                sx={{ color: "grey.300" }}
              >
                FAQ
              </Link>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={2}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: "primary.main" }}
            >
              Contact
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <EmailIcon fontSize="small" sx={{ color: "grey.400" }} />
                <Typography variant="body2" sx={{ color: "grey.300" }}>
                  info@seedco.com
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PhoneIcon fontSize="small" sx={{ color: "grey.400" }} />
                <Typography variant="body2" sx={{ color: "grey.300" }}>
                  +1 (555) 123-4567
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LocationIcon fontSize="small" sx={{ color: "grey.400" }} />
                <Typography variant="body2" sx={{ color: "grey.300" }}>
                  123 Garden St, Green City, GC 12345
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: "grey.700" }} />

        {/* Bottom Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: "grey.400" }}>
            © {new Date().getFullYear()} SeedCo. All rights reserved.
          </Typography>
          <Box sx={{ display: "flex", gap: 3 }}>
            <Link
              href="/privacy"
              color="inherit"
              underline="hover"
              sx={{ color: "grey.400" }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              color="inherit"
              underline="hover"
              sx={{ color: "grey.400" }}
            >
              Terms of Service
            </Link>
            <Link
              href="/sitemap"
              color="inherit"
              underline="hover"
              sx={{ color: "grey.400" }}
            >
              Sitemap
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
