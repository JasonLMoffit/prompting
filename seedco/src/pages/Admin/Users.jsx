import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  Switch,
  FormControlLabel,
} from "@mui/material";
import {
  Edit,
  Delete,
  Visibility,
  Block,
  CheckCircle,
} from "@mui/icons-material";

const AdminUsers = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "customer",
      status: "active",
      joinDate: "2024-01-01",
      lastLogin: "2024-01-15",
      totalOrders: 5,
      totalSpent: 234.5,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "admin",
      status: "active",
      joinDate: "2023-12-15",
      lastLogin: "2024-01-15",
      totalOrders: 0,
      totalSpent: 0,
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "customer",
      status: "inactive",
      joinDate: "2024-01-05",
      lastLogin: "2024-01-10",
      totalOrders: 2,
      totalSpent: 67.25,
    },
  ]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const roles = ["all", "customer", "admin"];
  const statuses = ["all", "active", "inactive"];

  const getRoleColor = (role) => {
    return role === "admin" ? "error" : "primary";
  };

  const getStatusColor = (status) => {
    return status === "active" ? "success" : "error";
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
    setEditingUser(null);
  };

  const handleStatusToggle = (userId) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: user.status === "active" ? "inactive" : "active",
            }
          : user
      )
    );
  };

  const handleRoleChange = (userId, newRole) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
  };

  const handleDeleteUser = (userId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      )
    ) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  const filteredUsers = users.filter((user) => {
    const roleMatch = roleFilter === "all" || user.role === roleFilter;
    const statusMatch = statusFilter === "all" || user.status === statusFilter;
    return roleMatch && statusMatch;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h3" component="h1">
          Manage Users
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Filter by Role</InputLabel>
            <Select
              value={roleFilter}
              label="Filter by Role"
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role === "all"
                    ? "All Roles"
                    : role.charAt(0).toUpperCase() + role.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Filter by Status</InputLabel>
            <Select
              value={statusFilter}
              label="Filter by Status"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {statuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status === "all"
                    ? "All Statuses"
                    : status.charAt(0).toUpperCase() + status.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Users Summary */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Users
              </Typography>
              <Typography variant="h4">{users.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Active Users
              </Typography>
              <Typography variant="h4">
                {users.filter((u) => u.status === "active").length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Customers
              </Typography>
              <Typography variant="h4">
                {users.filter((u) => u.role === "customer").length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Administrators
              </Typography>
              <Typography variant="h4">
                {users.filter((u) => u.role === "admin").length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Users Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Join Date</TableCell>
              <TableCell>Last Login</TableCell>
              <TableCell>Orders</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar sx={{ mr: 2, bgcolor: "primary.main" }}>
                      {user.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight="bold">
                        {user.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {user.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={
                      user.role.charAt(0).toUpperCase() + user.role.slice(1)
                    }
                    color={getRoleColor(user.role)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={
                      user.status.charAt(0).toUpperCase() + user.status.slice(1)
                    }
                    color={getStatusColor(user.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{formatDate(user.joinDate)}</TableCell>
                <TableCell>{formatDate(user.lastLogin)}</TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2">
                      {user.totalOrders} orders
                    </Typography>
                    {user.role === "customer" && (
                      <Typography variant="caption" color="text.secondary">
                        ${user.totalSpent.toFixed(2)} spent
                      </Typography>
                    )}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <IconButton
                      color="primary"
                      onClick={() => handleViewUser(user)}
                      size="small"
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleEditUser(user)}
                      size="small"
                    >
                      <Edit />
                    </IconButton>
                    <FormControl size="small" sx={{ minWidth: 100 }}>
                      <Select
                        value={user.role}
                        onChange={(e) =>
                          handleRoleChange(user.id, e.target.value)
                        }
                        displayEmpty
                      >
                        <MenuItem value="customer">Customer</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={user.status === "active"}
                          onChange={() => handleStatusToggle(user.id)}
                          color="success"
                        />
                      }
                      label=""
                    />
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteUser(user.id)}
                      size="small"
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* User Detail/Edit Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editingUser ? "Edit User" : "User Details"} -{" "}
          {selectedUser?.name || editingUser?.name}
        </DialogTitle>
        <DialogContent>
          {(selectedUser || editingUser) && (
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    value={editingUser ? editingUser.name : selectedUser.name}
                    disabled={!editingUser}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    value={editingUser ? editingUser.email : selectedUser.email}
                    disabled={!editingUser}
                    sx={{ mb: 2 }}
                  />
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Role</InputLabel>
                    <Select
                      value={editingUser ? editingUser.role : selectedUser.role}
                      label="Role"
                      disabled={!editingUser}
                    >
                      <MenuItem value="customer">Customer</MenuItem>
                      <MenuItem value="admin">Administrator</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Account Information
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Join Date:</strong>{" "}
                    {formatDate(
                      selectedUser?.joinDate || editingUser?.joinDate
                    )}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Last Login:</strong>{" "}
                    {formatDate(
                      selectedUser?.lastLogin || editingUser?.lastLogin
                    )}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Status:</strong>
                    <Chip
                      label={
                        (selectedUser?.status || editingUser?.status)
                          .charAt(0)
                          .toUpperCase() +
                        (selectedUser?.status || editingUser?.status).slice(1)
                      }
                      color={getStatusColor(
                        selectedUser?.status || editingUser?.status
                      )}
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </Typography>

                  {(selectedUser?.role === "customer" ||
                    editingUser?.role === "customer") && (
                    <>
                      <Typography variant="body2" gutterBottom>
                        <strong>Total Orders:</strong>{" "}
                        {selectedUser?.totalOrders || editingUser?.totalOrders}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Total Spent:</strong> $
                        {(
                          selectedUser?.totalSpent || editingUser?.totalSpent
                        ).toFixed(2)}
                      </Typography>
                    </>
                  )}
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
          {editingUser && (
            <Button variant="contained" onClick={handleCloseDialog}>
              Save Changes
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminUsers;
