import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Avatar,
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import TodayIcon from "@mui/icons-material/Today";

const AdminDashboard = () => {
  // Dummy Data
  const stats = {
    totalUsers: 1280,
    totalAppointments: 350,
    todayRegistrations: 18,
  };

  const cardStyle = {
    p: 3,
    display: "flex",
    alignItems: "center",
    borderRadius: 3,
    boxShadow: 3,
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
        Curaflix Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* TOTAL USERS */}
        <Grid item xs={12} md={3}>
          <Paper sx={cardStyle}>
            <Avatar sx={{ bgcolor: "#1976d2", mr: 2 }}>
              <PeopleIcon fontSize="large" />
            </Avatar>
            <Box>
              <Typography variant="h6">Total Users</Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {stats.totalUsers}
              </Typography>
            </Box>
          </Paper>
        </Grid>
        {/* TOTAL APPOINTMENTS */}
        <Grid item xs={12} md={3}>
          <Paper sx={cardStyle}>
            <Avatar sx={{ bgcolor: "#ed6c02", mr: 2 }}>
              <EventAvailableIcon fontSize="large" />
            </Avatar>
            <Box>
              <Typography variant="h6">Appointments</Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {stats.totalAppointments}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* TODAY'S REGISTRATIONS */}
        <Grid item xs={12} md={3}>
          <Paper sx={cardStyle}>
            <Avatar sx={{ bgcolor: "#9c27b0", mr: 2 }}>
              <TodayIcon fontSize="large" />
            </Avatar>
            <Box>
              <Typography variant="h6">Today’s Registrations</Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {stats.todayRegistrations}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* SECTION: Example Future Functional Blocks */}
      <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
        Quick Overview
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              User Growth (Coming Soon)
            </Typography>
            <Typography color="text.secondary">
              A graph showing how many users registered every week.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Recent Activity (Coming Soon)
            </Typography>
            <Typography color="text.secondary">
              A quick list of recent user registrations, appointments, etc.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
