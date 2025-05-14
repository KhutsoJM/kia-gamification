import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Drawer, IconButton, Container } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { Link } from 'react-router-dom'
import { ForkRight, Gradient } from "@mui/icons-material";


const Navbar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (open) => {
    setOpenDrawer(open);
  };

  return (
    <AppBar position="absolute" color="primary" sx={{
      width: "100%",
      top: 0,
      left: 0,
      backgroundImage: "linear-gradient(to right, #1976d2, #1e88e5, #2196f3, #42a5f5, #64b5f6)",
    }}>
      <Toolbar>
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ width: "100%" }}>
          {/* Logo or Title */}
          <Typography to="/" variant="h6">
            Emotion Matcher
          </Typography>

          {/* Mobile Menu Icon */}
          <IconButton
            color="inherit"
            aria-label="open menu"
            edge="end"
            onClick={() => toggleDrawer(true)}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Desktop Links */}
          <Box display="flex" gap={2} sx={{ display: { xs: "none", md: "flex" } }}>
            <Button component={Link} color="inherit" to="/games">Games</Button>
            <Button component={Link} color="inherit" to="/profile">Profile</Button>
            <Button component={Link} color="inherit" to="/login">Login</Button>
            <Button component={Link} color="inherit" to="/register">Register</Button>
          </Box>
        </Box>
      </Toolbar>

      {/* Drawer (Sidebar) for Mobile */}
      <Drawer anchor="right" open={openDrawer} onClose={() => toggleDrawer(false)}>
        <Box p={2} width={250} role="presentation">
          <Typography variant="h6" sx={{ mb: 2 }}>Menu</Typography>
          <Button component={Link} color="inherit" fullWidth to="/games" onClick={() => toggleDrawer(false)}>Games</Button>
          <Button component={Link} color="inherit" fullWidth to="/profile" onClick={() => toggleDrawer(false)}>Profile</Button>
          <Button component={Link} color="inherit" fullWidth to="/login" onClick={() => toggleDrawer(false)}>Login</Button>
          <Button component={Link} color="inherit" fullWidth to="/register" onClick={() => toggleDrawer(false)}>Register</Button>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
