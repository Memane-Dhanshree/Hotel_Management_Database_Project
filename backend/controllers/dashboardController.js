const db = require("../config/db");

const getDashboardStats = async (req, res) => {
  try {
    const [[totalRooms]] = await db.query(
      "SELECT COUNT(*) AS totalRooms FROM rooms"
    );

    const [[availableRooms]] = await db.query(
      "SELECT COUNT(*) AS availableRooms FROM rooms WHERE status = 'Available'"
    );

    const [[occupiedRooms]] = await db.query(
      "SELECT COUNT(*) AS occupiedRooms FROM rooms WHERE status = 'Occupied'"
    );

    const [[activeBookings]] = await db.query(
      "SELECT COUNT(*) AS activeBookings FROM bookings WHERE booking_status = 'Active'"
    );

    const [[revenue]] = await db.query(
      "SELECT IFNULL(SUM(amount), 0) AS totalRevenue FROM payments"
    );

    res.status(200).json({
      totalRooms: totalRooms.totalRooms,
      availableRooms: availableRooms.availableRooms,
      occupiedRooms: occupiedRooms.occupiedRooms,
      activeBookings: activeBookings.activeBookings,
      totalRevenue: revenue.totalRevenue,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard data",
    });
  }
};

module.exports = {
  getDashboardStats,
};