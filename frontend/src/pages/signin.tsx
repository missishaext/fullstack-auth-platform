import { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Typography,
  Button,
  Box,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/auth/signin",
        formData
      );

      console.log(response.data);

      localStorage.setItem(
        "token",
        response.data.data.token
      );

      alert("Login Successful!");

      navigate("/profile");
    } catch (error: any) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Invalid Credentials"
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg,  #ead466 0%, #764ba2 100%)",
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            p: 5,
            borderRadius: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Avatar
              sx={{
                bgcolor: "primary.main",
                width: 70,
                height: 70,
                mb: 2,
              }}
            >
              <LockOutlinedIcon fontSize="large" />
            </Avatar>

           <Typography
  variant="h4"
  sx={{ fontWeight: "bold" }}
>
  Welcome Back
</Typography>

            <Typography
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              Sign in to your account
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit}
          >
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              margin="normal"
              value={formData.email}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              margin="normal"
              value={formData.password}
              onChange={handleChange}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{
                mt: 3,
                py: 1.5,
                borderRadius: 2,
                fontWeight: "bold",
              }}
            >
              Login
            </Button>

            <Typography
              sx={{
                mt: 3,
                textAlign: "center",
              }}
            >
              Don't have an account?{" "}
              <Link to="/signup">
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Signin;