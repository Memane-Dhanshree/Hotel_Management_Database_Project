import { useEffect, useState } from "react";

import {
  Typography,
  Grid,
  Paper,
  Box,
} from "@mui/material";

import HotelIcon from "@mui/icons-material/Hotel";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import BedroomParentIcon from "@mui/icons-material/BedroomParent";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

import api from "../api/axios";
import DashboardCard from "../components/DashboardCard";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalRooms: 0,
    availableRooms: 0,
    occupiedRooms: 0,
    activeBookings: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await api.get("/dashboard");
        setStats(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadDashboard();
  }, []);

  return (
    <>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={4}
      >
        Hotel Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <DashboardCard
            title="Total Rooms"
            value={stats.totalRooms}
            color="#1976d2"
            icon={<HotelIcon />}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <DashboardCard
            title="Available Rooms"
            value={stats.availableRooms}
            color="#2e7d32"
            icon={<MeetingRoomIcon />}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <DashboardCard
            title="Occupied Rooms"
            value={stats.occupiedRooms}
            color="#ed6c02"
            icon={<BedroomParentIcon />}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <DashboardCard
            title="Active Bookings"
            value={stats.activeBookings}
            color="#d32f2f"
            icon={<EventNoteIcon />}
          />
        </Grid>
      </Grid>

      <Paper
        elevation={3}
        sx={{
          mt: 4,
          p: 4,
          borderRadius: 4,
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          gap={2}
        >
          <CurrencyRupeeIcon
            sx={{
              fontSize: 50,
              color: "#9c27b0",
            }}
          />

          <Box>
            <Typography
              variant="body1"
              color="text.secondary"
            >
              Total Revenue
            </Typography>

            <Typography
              variant="h3"
              fontWeight="bold"
            >
              ₹{stats.totalRevenue}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default Dashboard;