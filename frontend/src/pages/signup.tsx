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
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { Link, useNavigate } from "react-router-dom";
import { validateSignup } from "../utils/validation";
import api from "../services/api";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<
    Record<string, string>
  >({});

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

    const validationErrors =
      validateSignup(formData);

    if (
      Object.keys(validationErrors).length > 0
    ) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await api.post(
        "/auth/signup",
        formData
      );

      console.log(response.data);

      alert("Signup Successful!");

      navigate("/signin");
    } catch (error: any) {
      console.error(error);

      if (
        error?.response?.data?.error?.fields
      ) {
        console.log(
          error.response.data.error.fields
        );
      }

      alert(
        error?.response?.data?.message ||
          "Signup Failed"
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
                bgcolor: "success.main",
                width: 70,
                height: 70,
                mb: 2,
              }}
            >
              <PersonAddAlt1Icon fontSize="large" />
            </Avatar>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              Create Account
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                mt: 1,
                textAlign: "center",
              }}
            >
              Join Learning Management Portal
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit}
          >
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              margin="normal"
              value={formData.firstName}
              onChange={handleChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
            />

            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              margin="normal"
              value={formData.lastName}
              onChange={handleChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
            />

            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
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
                fontWeight: 700,
                textTransform: "none",
              }}
            >
              Create Account
            </Button>

            <Typography
              sx={{
                mt: 3,
                textAlign: "center",
              }}
            >
              Already have an account?{" "}
              <Link to="/signin">
                Login
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Signup;