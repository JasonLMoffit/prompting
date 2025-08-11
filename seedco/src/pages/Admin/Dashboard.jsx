import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material";
import {
  ShoppingCart,
  People,
  Inventory,
  AttachMoney,
  TrendingUp,
  LocalShipping,
} from "@mui/icons-material";

const Dashboard = () => {
  // Mock data - replace with actual API calls
  const stats = {
    totalSales: 15420.5,
    totalOrders: 89,
    totalCustomers: 156,
    totalProducts: 45,
    recentOrders: [
      { id: 1, customer: "John Doe", amount: 89.99, status: "Delivered" },
      { id: 2, customer: "Jane Smith", amount: 124.5, status: "Processing" },
      { id: 3, customer: "Bob Johnson", amount: 67.25, status: "Shipped" },
    ],
    topProducts: [
      { name: "Organic Tomato Seeds", sales: 23 },
      { name: "Heirloom Carrot Seeds", sales: 18 },
      { name: "Basil Herb Seeds", sales: 15 },
    ],
  };

  const StatCard = ({ title, value, icon, color }) => (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography color="textSecondary" gutterBottom variant="h6">
              {title}
            </Typography>
            <Typography variant="h4" component="h2">
              {title.includes("Sales")
                ? `$${value.toLocaleString()}`
                : value.toLocaleString()}
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: color,
              borderRadius: "50%",
              width: 60,
              height: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>

      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        Welcome back! Here's what's happening with your store today.
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Sales"
            value={stats.totalSales}
            icon={<AttachMoney />}
            color="#4CAF50"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Orders"
            value={stats.totalOrders}
            icon={<ShoppingCart />}
            color="#2196F3"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Customers"
            value={stats.totalCustomers}
            icon={<People />}
            color="#FF9800"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Products"
            value={stats.totalProducts}
            icon={<Inventory />}
            color="#9C27B0"
          />
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        {/* Recent Orders */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <LocalShipping sx={{ mr: 1, color: "primary.main" }} />
              <Typography variant="h6">Recent Orders</Typography>
            </Box>
            <List>
              {stats.recentOrders.map((order, index) => (
                <React.Fragment key={order.id}>
                  <ListItem>
                    <ListItemIcon>
                      <ShoppingCart color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={`Order #${order.id} - ${order.customer}`}
                      secondary={`$${order.amount} - ${order.status}`}
                    />
                  </ListItem>
                  {index < stats.recentOrders.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Top Products */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <TrendingUp sx={{ mr: 1, color: "primary.main" }} />
              <Typography variant="h6">Top Selling Products</Typography>
            </Box>
            <List>
              {stats.topProducts.map((product, index) => (
                <React.Fragment key={product.name}>
                  <ListItem>
                    <ListItemIcon>
                      <Inventory color="secondary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={product.name}
                      secondary={`${product.sales} units sold`}
                    />
                  </ListItem>
                  {index < stats.topProducts.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <Card sx={{ minWidth: 200, cursor: "pointer" }}>
              <CardContent sx={{ textAlign: "center" }}>
                <Inventory
                  sx={{ fontSize: 40, color: "primary.main", mb: 1 }}
                />
                <Typography variant="h6">Add Product</Typography>
                <Typography variant="body2" color="text.secondary">
                  Create new product listings
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card sx={{ minWidth: 200, cursor: "pointer" }}>
              <CardContent sx={{ textAlign: "center" }}>
                <People sx={{ fontSize: 40, color: "primary.main", mb: 1 }} />
                <Typography variant="h6">Manage Users</Typography>
                <Typography variant="body2" color="text.secondary">
                  View and edit user accounts
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card sx={{ minWidth: 200, cursor: "pointer" }}>
              <CardContent sx={{ textAlign: "center" }}>
                <ShoppingCart
                  sx={{ fontSize: 40, color: "primary.main", mb: 1 }}
                />
                <Typography variant="h6">View Orders</Typography>
                <Typography variant="body2" color="text.secondary">
                  Process and track orders
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;
