import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Button,
} from "@mui/material";
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
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          mt: 8,
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{ mb: 3 }}
        >
          Profile
        </Typography>

        <Typography>
          <strong>Name:</strong>{" "}
          {user.firstName} {user.lastName}
        </Typography>

        <Typography sx={{ mt: 2 }}>
          <strong>Email:</strong>{" "}
          {user.email}
        </Typography>

        <Typography sx={{ mt: 2 }}>
          <strong>Role:</strong>{" "}
          {user.role}
        </Typography>

        <Button
          variant="outlined"
          color="error"
          sx={{ mt: 3 }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Paper>
    </Container>
  );
};

export default Profile;