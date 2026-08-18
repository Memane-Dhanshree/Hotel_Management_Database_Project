import { useEffect, useState } from "react";

import {
  Typography,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import { toast } from "react-toastify";

import api from "../api/axios";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  const [open, setOpen] = useState(false);

  const [selectedBooking, setSelectedBooking] =
    useState(null);

  const [newCheckout, setNewCheckout] =
    useState("");

const fetchBookings = async () => {
  try {
    const response = await api.get("/bookings");
    setBookings(response.data);
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  const loadBookings = async () => {
    try {
      const response = await api.get("/bookings");
      setBookings(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  loadBookings();
}, []);

  const handleExtend = (booking) => {
    setSelectedBooking(booking);
    setOpen(true);
  };

  const submitExtend = async () => {
    try {
      await api.put(
        `/bookings/extend/${selectedBooking.booking_id}`,
        {
          check_out: newCheckout,
        }
      );

      toast.success("Booking Extended");

      setOpen(false);

      fetchBookings();

    } catch (error) {
      console.error(error);

      toast.error("Failed to Extend");
    }
  };

  const handleCheckout = async (id) => {
    try {
      const response = await api.put(
        `/bookings/checkout/${id}`
      );

      toast.success(
        `Checkout Successful | Amount ₹${response.data.total_amount}`
      );

      fetchBookings();

    } catch (error) {
      console.error(error);

      toast.error("Checkout Failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/bookings/${id}`);

      toast.success("Booking Deleted");

      fetchBookings();

    } catch (error) {
      console.error(error);

      toast.error("Delete Failed");
    }
  };

  return (
    <>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        Bookings
      </Typography>

      <TableContainer component={Card}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Room</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Check In</TableCell>
              <TableCell>Check Out</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.booking_id}>
                <TableCell>
                  {booking.booking_id}
                </TableCell>

                <TableCell>
                  {booking.customer_name}
                </TableCell>

                <TableCell>
                  {booking.room_number}
                </TableCell>

                <TableCell>
                  {booking.room_type}
                </TableCell>

                <TableCell>
                  {booking.check_in?.split("T")[0]}
                </TableCell>

                <TableCell>
                  {booking.check_out?.split("T")[0]}
                </TableCell>

                <TableCell>
                  {booking.booking_status}
                </TableCell>

                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ mr: 1 }}
                    disabled={booking.booking_status === "CheckedOut"}
                    onClick={() => handleExtend(booking)}
                  >
                    Extend
                  </Button>

                  <Button
                    color="success"
                    variant="contained"
                    size="small"
                    sx={{ mr: 1 }}
                    disabled={booking.booking_status === "CheckedOut"}
                    onClick={() =>
                      handleCheckout(booking.booking_id)
                    }
                  >
                    {booking.booking_status === "CheckedOut"
                      ? "Checked Out"
                      : "Checkout"}
                  </Button>

                  <Button
                    color="error"
                    variant="contained"
                    size="small"
                    onClick={() =>
                      handleDelete(
                        booking.booking_id
                      )
                    }
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

        <Dialog
        open={open}
        onClose={() => setOpen(false)}
        >
        <DialogTitle>
            Extend Booking
        </DialogTitle>

        <DialogContent>
            <Typography sx={{ mb: 2 }}>
            Select a new checkout date
            </Typography>

            <TextField
            type="date"
            label="New Check Out Date"
            fullWidth
            margin="normal"
            InputLabelProps={{
                shrink: true,
            }}
            value={newCheckout}
            onChange={(e) =>
                setNewCheckout(
                e.target.value
                )
            }
            />
        </DialogContent>

        <DialogActions>
            <Button
            onClick={() => setOpen(false)}
            >
            Cancel
            </Button>

            <Button
            variant="contained"
            onClick={submitExtend}
            >
            Save
            </Button>
        </DialogActions>
        </Dialog>
    </>
  );
};

export default Bookings;