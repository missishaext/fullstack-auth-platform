import { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
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
    const response =
      await api.post(
        "/auth/signin",
        formData
      );

    console.log(response.data);

    localStorage.setItem(
      "token",
      response.data.token
    );

    navigate("/profile");
  } catch (error) {
    console.error(error);

    alert("Invalid Credentials");
  }
};

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mt: 8,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{ mb: 3 }}
        >
          Login
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
        >
          <TextField
            fullWidth
            label="Email"
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
            sx={{ mt: 3 }}
          >
            Login
          </Button>
          <Typography
  sx={{
    mt: 2,
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
  );
};

export default Signin;
