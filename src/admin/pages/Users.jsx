import React, { useState, useMemo } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import useAdminUsers from "./../hooks/useAdminUsers";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();
  const { users, loading, error, deleteUser } = useAdminUsers();

  const [searchText, setSearchText] = useState("");

  const filteredUsers = useMemo(() => {
    if (!searchText) return users;

    return users.filter((u) =>
      `${u.full_name} ${u.phone} ${u.email}`
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
  }, [searchText, users]);

  // const handleEdit = (user) => {
  //   navigate(`/admin/users/${user.id}/medical-record`);
  // };

  const handleEdit = (user) => {
    navigate(`/admin/users/${user.id}/medical-record`, {
      state: { name: user.full_name },
    });
  };

  return (
    <Box>
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 3,
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Users
        </Typography>

        <TextField
          placeholder="Search by name, phone, email..."
          size="small"
          sx={{ width: 300, background: "#fff", borderRadius: 2 }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Loading State */}
      {loading && (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Error */}
      {error && <Typography color="error">{error}</Typography>}

      {/* TABLE */}
      {!loading && filteredUsers.length > 0 && (
        <TableContainer
          component={Paper}
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            overflow: "hidden",
            maxHeight: "70vh",
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
                <TableCell>
                  <b>ID</b>
                </TableCell>
                <TableCell>
                  <b>Name</b>
                </TableCell>
                <TableCell>
                  <b>Phone</b>
                </TableCell>
                <TableCell>
                  <b>Email</b>
                </TableCell>
                <TableCell align="center">
                  <b>Actions</b>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow
                  key={user.id}
                  hover
                  sx={{ "&:hover": { backgroundColor: "#fafafa" } }}
                >
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.full_name}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.email}</TableCell>

                  <TableCell align="center">
                    {/* EDIT → Go to medical record */}
                    <IconButton
                      color="primary"
                      sx={{ mr: 1 }}
                      onClick={() => handleEdit(user)}
                    >
                      <EditIcon />
                    </IconButton>

                    {/* DELETE */}
                    <IconButton
                      color="error"
                      onClick={() => deleteUser(user.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* No Results */}
      {!loading && filteredUsers.length === 0 && (
        <Typography sx={{ textAlign: "center", mt: 4, color: "gray" }}>
          No users found matching "<b>{searchText}</b>"
        </Typography>
      )}
    </Box>
  );
};

export default Users;
