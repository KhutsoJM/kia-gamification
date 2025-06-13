import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Drawer, IconButton, MenuItem, Tooltip, Menu, Container } from "@mui/material";
import {
  AccountCircle,
} from "@mui/icons-material";

import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'


const Navbar = () => {
  const { user, logout } = useAuth()
  const [openDrawer, setOpenDrawer] = useState(false);
  // const [isAuth, setIsAuth] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);

  // const isAuth = !!user

  // useEffect(() => {
  //   setIsAuth(!!user)
  //   isAuth ? console.log(`User is logged in: ${user}`) : console.log('User is logged out')
  // }, [user])
  let isAuth = !!user

  const toggleDrawer = (open) => {
    setOpenDrawer(open);
  };

  const handleOpenUserMenu = (e) => {
    console.log('open menu')
    setAnchorElUser(e.currentTarget);
  }

  const handleCloseUserMenu = () => {
    console.log('close menu')
    setAnchorElUser(null);
  }


  return (
    <AppBar className="appbar" position="absolute" color="primary" sx={{
      width: "100%",
      top: 0,
      left: 0,
      backgroundImage: "linear-gradient(to right, #1976d2, #1e88e5, #2196f3, #42a5f5, #64b5f6)",
    }}>
      <Container disableGutters>
        <Toolbar>
          <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ width: "100%" }}>
            {/* Logo or Title */}
            <Typography to="/" variant="h6">
              NeuroGames
            </Typography>

            {/* Mobile Menu Icon */}
            <IconButton
              color="inherit"
              aria-label="open menu"
              edge="end"
              onClick={() => toggleDrawer(true)}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <Menu />
            </IconButton>

            {/* Desktop Links */}
            <Box display="flex" gap={2} sx={{ display: { xs: "none", md: "flex" } }}>
              <Button component={Link} color="inherit" to="/games">Games</Button>
              {!isAuth && (
                <>
                  <Button component={Link} color="inherit" to="/login">Login</Button>
                  <Button component={Link} color="inherit" to="/register">Register</Button>
                </>
              )}
              {isAuth && (
                <>
                  <Tooltip title="Open settings">
                    <IconButton
                      size="large"
                      aria-label="Account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleOpenUserMenu}
                      color="inherit"
                    >
                      <AccountCircle />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    disableScrollLock
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
                    <MenuItem onClick={() => {
                      logout()
                      handleCloseUserMenu()
                    }}>Logout</MenuItem>
                  </Menu>
                </>
              )}
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
      </Container>
    </AppBar>
  );
};

export default Navbar;
