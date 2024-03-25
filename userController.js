//const pool = require('./database');

// Create a new user
// async function createUser(req, res) {
//   const { firstName, lastName, email } = req.body;
//   try {
//     const query = 'INSERT INTO users (first_name, last_name, email) VALUES ($1, $2, $3) RETURNING *';
//     const values = [firstName, lastName, email];
//     const result = await pool.query(query, values);
//     res.status(201).json(result.rows[0]);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// }

const fakeUsers = [
  { name: "John Doe", birthDate: "1990-05-15", wasSick: true, wasVaccinated: false },
  { name: "Jane Smith", birthDate: "1985-10-20", wasSick: false, wasVaccinated: true },
  // Add more fake user data as needed
];

async function getAllUsers(req, res) {
  // Fake user data
  

  try {
    // Simulate database query
    // You would typically fetch data from your database here
    
    // Send fake user data as response
    res.status(200).json(fakeUsers);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

function addUser(req, res) {
  const { name, birthDate, wasSick, wasVaccinated } = req.body;
  const newUser = {
      name:name,
      birthDate:birthDate,
      wasSick:wasSick,
      wasVaccinated:wasVaccinated
  };
  fakeUsers.push(newUser);
  res.status(201).json(newUser); // Respond with the added user
}


// Add other controller functions as needed

module.exports = {
  getAllUsers,
  addUser
  // Add other controller functions here
};
