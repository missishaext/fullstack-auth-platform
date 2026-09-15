import {
  Container,
  Paper,
  Typography,
  Button,
} from "@mui/material";

const Profile = () => {
  const user = {
    firstName: "Isha",
    lastName: "Sharma",
    email: "isha@gmail.com",
    role: "user",
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
        >
          Logout
        </Button>
      </Paper>
    </Container>
  );
};

export default Profile;