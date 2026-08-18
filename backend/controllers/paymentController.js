const db = require("../config/db");

const getAllPayments = async (req, res) => {
  try {
    const [payments] = await db.query(`
      SELECT
        p.payment_id,
        p.amount,
        p.payment_method,
        p.payment_date,
        c.full_name,
        r.room_number
      FROM payments p
      JOIN bookings b
        ON p.booking_id = b.booking_id
      JOIN customers c
        ON b.customer_id = c.customer_id
      JOIN rooms r
        ON b.room_id = r.room_id
      ORDER BY p.payment_id DESC
    `);

    res.status(200).json(payments);
  } catch (error) {
    console.error("Payment Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch payments",
    });
  }
};

module.exports = {
  getAllPayments,
};