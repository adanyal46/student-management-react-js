// ProfileMenu.js
import React from 'react';
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ProfileMenu = ({ anchorEl, handleMenuClose, handleLogout, user }) => (
  <Menu
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={handleMenuClose}
    sx={{
      '& .MuiMenu-paper': {
        bgcolor: '#fff',
        color: '#000',
        width: '300px', // Increased width to accommodate user info
      },
    }}
  >
    <Box sx={{ padding: 2, display: 'flex', alignItems: 'center' }}>
      <AccountCircleIcon sx={{ fontSize: 35, color: '#1976d2' }} />
      <Box sx={{ marginLeft: 2 }}>
        <Typography variant="h6" fontSize={15} fontWeight={600}>{user?.username}</Typography>
        <Typography variant="body2" textTransform={'capitalize'} color="textSecondary">
          {user?.role}
        </Typography>
      </Box>
    </Box>
    <Divider />
    <MenuItem onClick={handleMenuClose}>
      <ListItemIcon>
        <PersonIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </MenuItem>
    <MenuItem onClick={handleMenuClose}>
      <ListItemIcon>
        <SettingsIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </MenuItem>
    <MenuItem
      onClick={handleLogout}
      sx={{ color: 'red' }}
    >
      <ListItemIcon>
        <ExitToAppIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </MenuItem>
  </Menu>
);

export default ProfileMenu;
