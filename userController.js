const pool = require('../config/database');

// Create a new user
async function createUser(req, res) {
  const { firstName, lastName, email } = req.body;
  try {
    const query = 'INSERT INTO users (first_name, last_name, email) VALUES ($1, $2, $3) RETURNING *';
    const values = [firstName, lastName, email];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Add other controller functions as needed

module.exports = {
  createUser,
  // Add other controller functions here
};
