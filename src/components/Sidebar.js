// Sidebar.js
import React from "react";
import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import PaymentIcon from "@mui/icons-material/Payment";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useNavigate } from "react-router-dom";

const menuItems = {
  admin: [
    { text: "Dashboard", icon: <DashboardIcon />, path: "dashboard" },
    { text: "Students", icon: <PersonIcon />, path: "students" },
    { text: "Teachers", icon: <GroupIcon />, path: "teachers" },
    { text: "Parents", icon: <SchoolIcon />, path: "parents" },
    { text: "Payments", icon: <PaymentIcon />, path: "payments" },
    { text: "Classes", icon: <MenuBookIcon />, path: "classes" },
  ],
  teacher: [
    { text: "Dashboard", icon: <DashboardIcon />, path: "dashboard" },
    { text: "My Classes", icon: <MenuBookIcon />, path: "my-classes" },
    { text: "Students", icon: <PersonIcon />, path: "students" },
  ],
  student: [
    { text: "Dashboard", icon: <DashboardIcon />, path: "dashboard" },
    { text: "My Classes", icon: <MenuBookIcon />, path: "my-classes" },
    { text: "Payments", icon: <PaymentIcon />, path: "payments" },
  ],
  parent: [
    { text: "Dashboard", icon: <DashboardIcon />, path: "dashboard" },
    { text: "My Children", icon: <PersonIcon />, path: "my-children" },
    { text: "Payments", icon: <PaymentIcon />, path: "payments" },
  ],
};
const Sidebar = ({ userRole, activeItem, onMenuItemClick }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleMenuItemClick = (path, text) => {
    navigate(path); // Navigate to the selected route
    onMenuItemClick(text); // Set active item
  };

  return (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap>
          Student Management
        </Typography>
      </Toolbar>
      <Divider />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {menuItems[userRole].map(({ text, icon,path }) => (
            <ListItemButton
              key={text}
              onClick={() => handleMenuItemClick(path, text)}
              sx={{
                backgroundColor: activeItem === text ? "#444" : "inherit", // Active menu item color
                color: activeItem === text ? "#90caf9" : "#fff", // Active menu item text color
              }}
            >
              <ListItemIcon
                sx={{ color: activeItem === text ? "#90caf9" : "#fff" }}
              >
                {icon}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </div>
  );
};

export default Sidebar;
