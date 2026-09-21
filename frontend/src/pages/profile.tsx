import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Avatar,
  Divider,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token =
          localStorage.getItem("token");

        const response = await api.get(
          "/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data.data);
      } catch (error) {
        console.error(error);

        alert("Failed to load profile");

        navigate("/signin");
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
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
            textAlign: "center",
          }}
        >
          <Avatar
            sx={{
              width: 90,
              height: 90,
              bgcolor: "primary.main",
              mx: "auto",
              mb: 2,
            }}
          >
            <PersonIcon sx={{ fontSize: 50 }} />
          </Avatar>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 1,
            }}
          >
            My Profile
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            User Information
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Box
            sx={{
              textAlign: "left",
              mb: 3,
            }}
          >
            <Typography
              variant="subtitle2"
              color="text.secondary"
            >
              Full Name
            </Typography>

            <Typography
              variant="h6"
              sx={{ mb: 2 }}
            >
              {user.firstName} {user.lastName}
            </Typography>

            <Typography
              variant="subtitle2"
              color="text.secondary"
            >
              Email Address
            </Typography>

            <Typography
              variant="h6"
              sx={{ mb: 2 }}
            >
              {user.email}
            </Typography>

            <Typography
              variant="subtitle2"
              color="text.secondary"
            >
              Role
            </Typography>

            <Typography
              variant="h6"
              color="primary"
            >
              {user.role}
            </Typography>
          </Box>
{user.role === "ADMIN" && (
  <Button
    variant="contained"
    color="primary"
    fullWidth
    size="large"
    sx={{
      mb: 2,
      py: 1.5,
      borderRadius: 2,
      fontWeight: 700,
      textTransform: "none",
    }}
    onClick={() => navigate("/users")}
  >
    Manage Users
  </Button>
)}
          <Button
            variant="contained"
            color="error"
            fullWidth
            size="large"
            sx={{
              py: 1.5,
              borderRadius: 2,
              fontWeight: 700,
              textTransform: "none",
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default Profile;