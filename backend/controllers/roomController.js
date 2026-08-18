const db = require("../config/db");

const getAllRooms = async (req, res) => {
  try {
    const [rooms] = await db.query(
      "SELECT * FROM rooms ORDER BY room_number"
    );

    res.status(200).json(rooms);
  } catch (error) {
    console.error("Get Rooms Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch rooms",
    });
  }
};

const getAvailableRooms = async (req, res) => {
  try {
    const [rooms] = await db.query(
      "SELECT * FROM rooms WHERE status = 'Available' ORDER BY room_number"
    );

    res.status(200).json(rooms);
  } catch (error) {
    console.error("Available Rooms Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch available rooms",
    });
  }
};

module.exports = {
  getAllRooms,
  getAvailableRooms,
};