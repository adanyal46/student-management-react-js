// AppBarComponent.js
import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Tooltip
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const AppBarComponent = ({ handleDrawerToggle, handleProfileMenuOpen }) => (
  <AppBar
    position="fixed"
    sx={{
      width: { sm: `calc(100% - ${240}px)` }, // Adjust width
      ml: { sm: `${240}px` },
      zIndex: (theme) => theme.zIndex.drawer + 1,
      bgcolor: '#fff', // White background for AppBar
      color: '#000', // Black text color for AppBar
      boxShadow: 'none', // Optional: Remove default AppBar shadow
    }}
  >
    <Toolbar>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { sm: 'none' } }}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
        Dashboard
      </Typography>
      <Tooltip title="Account settings">
        <IconButton
          edge="end"
          color="inherit"
          aria-label="profile-menu"
          onClick={handleProfileMenuOpen}
        >
          <Avatar sx={{ bgcolor: '#90caf9' }}>U</Avatar>
        </IconButton>
      </Tooltip>
    </Toolbar>
  </AppBar>
);

export default AppBarComponent;
