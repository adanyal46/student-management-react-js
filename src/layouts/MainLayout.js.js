// MainLayout.js
import React, { useState } from "react";
import { Box, CssBaseline, Drawer, Toolbar, Typography } from "@mui/material";
import Sidebar from "../components/Sidebar";
import AppBarComponent from "../components/AppBarComponent";
import ProfileMenu from "../components/ProfileMenu";
import { Outlet } from "react-router-dom";
import useAuthStore from "../stores/authStore";

const drawerWidth = 240;

const MainLayout = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const [activeItem, setActiveItem] = useState("Home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userRole] = useState("admin"); // Simulated user role

  const handleMenuItemClick = (text) => {
    setActiveItem(text);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Handle logout logic here
    logout();
    handleMenuClose();
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      {isAuthenticated ? (
        <>
          {" "}
          <AppBarComponent
            handleDrawerToggle={handleDrawerToggle}
            handleProfileMenuOpen={handleProfileMenuOpen}
          />
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
          >
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                  backgroundColor: "#333",
                  color: "#fff",
                },
              }}
            >
              <Sidebar
                userRole={userRole}
                activeItem={activeItem}
                onMenuItemClick={handleMenuItemClick}
              />
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: "none", sm: "block" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                  backgroundColor: "#333",
                  color: "#fff",
                },
              }}
              open
            >
              <Sidebar
                userRole={userRole}
                activeItem={activeItem}
                onMenuItemClick={handleMenuItemClick}
              />
            </Drawer>
          </Box>{" "}
        </>
      ) : null}
      <Box component="main" sx={{ flexGrow: 1, bgcolor: "#f5f5f5", p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
      <ProfileMenu
        anchorEl={anchorEl}
        handleMenuClose={handleMenuClose}
        handleLogout={handleLogout}
        user={user}
      />
    </Box>
  );
};

export default MainLayout;
