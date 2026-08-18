const db = require("../config/db");

const createBooking = async (req, res) => {
  try {
    const { customer_id, room_id, check_in, check_out } = req.body;

    // Validate required fields
    if (!customer_id || !room_id || !check_in || !check_out) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if room exists
    const [room] = await db.query(
      "SELECT * FROM rooms WHERE room_id = ?",
      [room_id]
    );

    if (room.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    // Check room availability
    if (room[0].status !== "Available") {
      return res.status(400).json({
        success: false,
        message: "Room is already occupied",
      });
    }

    // Create booking
    const [bookingResult] = await db.query(
      `INSERT INTO bookings
      (customer_id, room_id, check_in, check_out)
      VALUES (?, ?, ?, ?)`,
      [customer_id, room_id, check_in, check_out]
    );

    // Update room status
    await db.query(
      `UPDATE rooms
       SET status = 'Occupied'
       WHERE room_id = ?`,
      [room_id]
    );

    res.status(201).json({
      success: true,
      message: "Room booked successfully",
      booking_id: bookingResult.insertId,
    });
  } catch (error) {
    console.error("Create Booking Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create booking",
    });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const [bookings] = await db.query(`
      SELECT
        b.booking_id,
        c.full_name AS customer_name,
        r.room_number,
        r.room_type,
        b.check_in,
        b.check_out,
        b.booking_status
      FROM bookings b
      JOIN customers c
        ON b.customer_id = c.customer_id
      JOIN rooms r
        ON b.room_id = r.room_id
      ORDER BY b.booking_id DESC
    `);

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Get Bookings Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
    });
  }
};

const extendBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { check_out } = req.body;

    const [booking] = await db.query(
      "SELECT * FROM bookings WHERE booking_id = ?",
      [id]
    );

    if (booking.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    await db.query(
      `UPDATE bookings
       SET check_out = ?
       WHERE booking_id = ?`,
      [check_out, id]
    );

    res.status(200).json({
      success: true,
      message: "Booking extended successfully",
    });
  } catch (error) {
    console.error("Extend Booking Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to extend booking",
    });
  }
};

const checkoutBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const [bookingData] = await db.query(
      `
      SELECT
        b.*,
        r.room_id,
        r.price_per_day
      FROM bookings b
      JOIN rooms r
        ON b.room_id = r.room_id
      WHERE b.booking_id = ?
      `,
      [id]
    );

    if (bookingData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    const booking = bookingData[0];

        // Prevent duplicate checkout
    if (booking.booking_status === "CheckedOut") {
      return res.status(400).json({
        success: false,
        message: "Booking has already been checked out.",
      });
    }

    const checkIn = new Date(booking.check_in);
    const checkOut = new Date(booking.check_out);

    const days =
      Math.ceil(
        (checkOut - checkIn) /
        (1000 * 60 * 60 * 24)
      ) || 1;

    const totalAmount =
      days * Number(booking.price_per_day);

    // Update booking status
    await db.query(
      `
      UPDATE bookings
      SET booking_status = 'CheckedOut'
      WHERE booking_id = ?
      `,
      [id]
    );

    // Free room
    await db.query(
      `
      UPDATE rooms
      SET status = 'Available'
      WHERE room_id = ?
      `,
      [booking.room_id]
    );

    // Check if payment already exists
    const [existingPayment] = await db.query(
      "SELECT payment_id FROM payments WHERE booking_id = ?",
      [id]
    );

    // Create payment only once
    if (existingPayment.length === 0) {
      await db.query(
        `
        INSERT INTO payments
        (booking_id, amount, payment_method)
        VALUES (?, ?, ?)
        `,
        [id, totalAmount, "Cash"]
      );
    }

    res.status(200).json({
      success: true,
      message: "Checkout completed",
      total_days: days,
      total_amount: totalAmount,
    });

  } catch (error) {
    console.error("Checkout Error:", error);

    res.status(500).json({
      success: false,
      message: "Checkout failed",
    });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const [booking] = await db.query(
      "SELECT * FROM bookings WHERE booking_id = ?",
      [id]
    );

    if (booking.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    await db.query(
      "DELETE FROM payments WHERE booking_id = ?",
      [id]
    );

    await db.query(
      "DELETE FROM bookings WHERE booking_id = ?",
      [id]
    );

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    console.error("Delete Booking Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete booking",
    });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  extendBooking,
  checkoutBooking,
  deleteBooking,
};