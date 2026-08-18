const db = require("../config/db");

const createCustomer = async (req, res) => {
  try {
    const {
      full_name,
      phone,
      email,
      date_of_birth,
      gender,
      address,
    } = req.body;

    // Age Validation
    const birthDate = new Date(date_of_birth);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDifference =
      today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 &&
        today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    if (age < 18) {
      return res.status(400).json({
        success: false,
        message: "Customer must be at least 18 years old",
      });
    }

    const [result] = await db.query(
      `INSERT INTO customers
      (full_name, phone, email, date_of_birth, gender, address)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        full_name,
        phone,
        email,
        date_of_birth,
        gender,
        address,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Customer created successfully",
      customer_id: result.insertId,
    });
  } catch (error) {
    console.error("Create Customer Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create customer",
    });
  }
};

const getAllCustomers = async (req, res) => {
  try {
    const [customers] = await db.query(
      "SELECT * FROM customers ORDER BY customer_id DESC"
    );

    res.status(200).json(customers);
  } catch (error) {
    console.error("Get Customers Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch customers",
    });
  }
};

module.exports = {
  createCustomer,
  getAllCustomers,
};