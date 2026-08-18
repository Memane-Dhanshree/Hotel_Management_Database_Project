const express = require("express");

const router = express.Router();

const {
  createBooking,
  getAllBookings,
  extendBooking,
  checkoutBooking,
  deleteBooking,
} = require("../controllers/bookingController");

router.post("/", createBooking);

router.get("/", getAllBookings);

router.put("/extend/:id", extendBooking);

router.put("/checkout/:id", checkoutBooking);

router.delete("/:id", deleteBooking);

module.exports = router;