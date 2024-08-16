// src/pages/LoginPage.js
import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  CircularProgress,
} from "@mui/material";
import useAuthStore from "../stores/authStore"; // Import Zustand store
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useSnackbar } from "notistack";
import { handleApiError } from "../utils/errorHandler";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // State for loading
  const { login, isAuthenticated } = useAuthStore(); // Access Zustand actions
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      // Perform login API call using Axios
      const response = await api.post("/auth/login", { username, password });
      const data = response.data;

      console.log("response", response);
      console.log("data", data);

      if (response.status === 200) {
        console.log("run success");
        login(data.token); // Save token and user data in Zustand store
        enqueueSnackbar("Login successful!", { variant: "success" }); // Show success notification
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        console.log("run false");
        enqueueSnackbar("Login failed. Please check your credentials.", {
          variant: "error",
        }); // Show error notification
      }
    } catch (error) {
      console.log("error login page", error);
      handleApiError(error, enqueueSnackbar);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="calc(100vh - 25vh)"
      p={3}
      bgcolor="background.default"
    >
      <Card sx={{ maxWidth: 400, width: "100%" }}>
        <CardHeader
          title="Login"
          subheader="Please enter your credentials to access your account"
          titleTypographyProps={{ variant: "h5" }}
          subheaderTypographyProps={{ variant: "body2" }}
          sx={{ textAlign: "center" }}
        />
        <Divider />
        <CardContent>
          <form onSubmit={handleLogin} autoComplete="off">
            <Box mb={2}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="off"
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;
