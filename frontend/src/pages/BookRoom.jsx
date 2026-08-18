import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";

import { toast } from "react-toastify";

import api from "../api/axios";

const BookRoom = () => {
  const [rooms, setRooms] = useState([]);

  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    email: "",
    date_of_birth: "",
    gender: "",
    address: "",

    room_id: "",
    check_in: "",
    check_out: "",
  });

    useEffect(() => {
    const loadRooms = async () => {
        try {
        const response = await api.get("/rooms/available");
        setRooms(response.data);
        } catch (error) {
        console.error(error);
        }
    };

    loadRooms();
    }, []);

    const reloadRooms = async () => {
    try {
        const response = await api.get("/rooms/available");
        setRooms(response.data);
    } catch (error) {
        console.error(error);
    }
    };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create Customer
      const customerResponse = await api.post(
        "/customers",
        {
          full_name: formData.full_name,
          phone: formData.phone,
          email: formData.email,
          date_of_birth: formData.date_of_birth,
          gender: formData.gender,
          address: formData.address,
        }
      );

      const customerId =
        customerResponse.data.customer_id;

      // Create Booking
      await api.post("/bookings", {
        customer_id: customerId,
        room_id: formData.room_id,
        check_in: formData.check_in,
        check_out: formData.check_out,
      });

      toast.success("Room Booked Successfully");

      setFormData({
        full_name: "",
        phone: "",
        email: "",
        date_of_birth: "",
        gender: "",
        address: "",
        room_id: "",
        check_in: "",
        check_out: "",
      });

       reloadRooms();

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Booking Failed"
      );
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={3}
        >
          Book Room
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Full Name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                     Email
                </Typography>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                     Date of Birth
                </Typography>
              <TextField
                fullWidth
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                select
                fullWidth
                required
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <MenuItem value="Male">
                  Male
                </MenuItem>

                <MenuItem value="Female">
                  Female
                </MenuItem>

                <MenuItem value="Other">
                  Other
                </MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                required
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                select
                fullWidth
                required
                label="Select Room"
                name="room_id"
                value={formData.room_id}
                onChange={handleChange}
                required
              >
                {rooms.map((room) => (
                  <MenuItem
                    key={room.room_id}
                    value={room.room_id}
                  >
                    Room {room.room_number} -{" "}
                    {room.room_type} - ₹
                    {room.price_per_day}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Check In Date
                </Typography>
              <TextField
                fullWidth
                required
                type="date"
                name="check_in"
                value={formData.check_in}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Check Out Date
                </Typography>
              <TextField
                fullWidth
                required
                type="date"
                name="check_out"
                value={formData.check_out}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button
                variant="contained"
                size="large"
                type="submit"
              >
                Book Room
              </Button>
            </Grid>

          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookRoom;