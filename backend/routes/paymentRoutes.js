const express = require("express");

const router = express.Router();

const {
  getAllPayments,
} = require("../controllers/paymentController");

router.get("/", getAllPayments);

module.exports = router;