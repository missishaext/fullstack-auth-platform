import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Avatar,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import api from "../services/api";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roleFilter, setRoleFilter] =
    useState("ALL");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token =
          localStorage.getItem("token");

        const response = await api.get(
          "/users/list",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(
          "Users API Response:",
          response.data
        );

        setUsers(response.data.data.users || []);
      } catch (error: any) {
        console.error(
          "Users List Error:",
          error?.response?.data || error
        );

        alert(
          error?.response?.data?.message ||
            "Access Denied"
        );
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers =
    roleFilter === "ALL"
      ? users
      : users.filter(
          (user) => user.role === roleFilter
        );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #ead466 0%, #764ba2 100%)",
        py: 5,
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={10}
          sx={{
            p: 4,
            borderRadius: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Avatar
              sx={{
                bgcolor: "primary.main",
                width: 60,
                height: 60,
                mr: 2,
              }}
            >
              <AdminPanelSettingsIcon />
            </Avatar>

            <Box>
              <Typography
                variant="h4"
                sx={{ fontWeight: 700 }}
              >
                Users Management
              </Typography>

              <Typography
                color="text.secondary"
              >
                Admin Access Panel
              </Typography>
            </Box>
          </Box>

          <Paper
            sx={{
              p: 2,
              mb: 3,
              bgcolor: "#f5f7ff",
            }}
          >
            <Typography
              variant="h6"
              color="primary"
            >
              Total Users: {filteredUsers.length}
            </Typography>
          </Paper>

          <FormControl
            sx={{
              minWidth: 220,
              mb: 3,
            }}
          >
            <InputLabel>
              Filter By Role
            </InputLabel>

            <Select
              value={roleFilter}
              label="Filter By Role"
              onChange={(e) =>
                setRoleFilter(
                  e.target.value
                )
              }
            >
              <MenuItem value="ALL">
                All Users
              </MenuItem>

              <MenuItem value="USER">
                Users
              </MenuItem>

              <MenuItem value="ADMIN">
                Admins
              </MenuItem>
            </Select>
          </FormControl>

          <Table>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "#1976d2",
                }}
              >
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  ID
                </TableCell>

                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  First Name
                </TableCell>

                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Last Name
                </TableCell>

                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Email
                </TableCell>

                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Role
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    hover
                  >
                    <TableCell>
                      {user.id}
                    </TableCell>

                    <TableCell>
                      {user.firstName}
                    </TableCell>

                    <TableCell>
                      {user.lastName}
                    </TableCell>

                    <TableCell>
                      {user.email}
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={user.role}
                        color={
                          user.role === "ADMIN"
                            ? "error"
                            : "success"
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    align="center"
                  >
                    No Users Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </Box>
  );
};

export default UsersList;