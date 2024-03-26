const pool = require('./database');


//✌️
async function createUser(req, res) {
  console.log(req.body)
  const { id, firstName, lastName, phone, cellphone, address, covidDetails } = req.body;
  try {
    // Inserting address details into the Address table
    const addressQuery = `
      INSERT INTO Address (City, Street, HouseNumber)
      VALUES ($1, $2, $3)
      RETURNING AddressID;
    `;
    const addressValues = [address.city, address.street, address.houseNumber];
    const addressResult = await pool.query(addressQuery, addressValues);
    const addressID = addressResult.rows[0].addressid;

    console.log(addressID);
    // Inserting vaccine details into the Vaccines table
    const vaccineQueries = [];
    const vaccineValues = [];
    console.log('---- vaccines -------')
    console.log(covidDetails.vaccines);
    for (let i = 0; i < 4; i++) {
      const vaccine = covidDetails.vaccines[i];
      const vaccineQuery = `
        INSERT INTO Vaccines ( ManufactureName, Date)
        VALUES ( $1, $2)
        RETURNING VaccineID;
      `;
      const vaccineValue = [vaccine.manufactureName, vaccine.date];
      vaccineQueries.push(vaccineQuery);
      vaccineValues.push(vaccineValue);
    }

    const vaccineIDs = [];
    for (let i = 0; i < 4; i++) {
      const vaccineResult = await pool.query(vaccineQueries[i], vaccineValues[i]);
      vaccineIDs.push(vaccineResult.rows[0].vaccineid);
    }

    // Inserting covid details into the CovidDetails table
    const covidQuery = `
      INSERT INTO CovidDetails (Vaccine1ID, Vaccine2ID, Vaccine3ID, Vaccine4ID, SickDate, RecoveryDate)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING CovidID;
    `;
    const covidValues = [vaccineIDs[0], vaccineIDs[1], vaccineIDs[2], vaccineIDs[3], covidDetails.sickDate, covidDetails.recoveryDate];
    const covidResult = await pool.query(covidQuery, covidValues);
    const covidDetailsID = covidResult.rows[0].covidid;

    // Inserting user details into the Users table
    const userQuery = `
      INSERT INTO Users (ID, FirstName, LastName, Phone, Cellphone, AddressID, CovidDetailsID)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    const userValues = [id, firstName, lastName, phone, cellphone, addressID, covidDetailsID];
    const userResult = await pool.query(userQuery, userValues);

    res.status(201).json(userResult.rows[0]);
  } catch (error) {
    console.log(error.message)
    res.status(400).json({ error: error.message });
  }
}

async function getAllUsers(req, res) {
  try {
    // Query to fetch all users along with their address and covid details
    const query = `
      SELECT u.id, u.firstName, u.lastName, u.phone, u.cellphone, 
             a.city AS address_city, a.street AS address_street, a.houseNumber AS address_houseNumber, 
             cd.sickDate, cd.recoveryDate
      FROM Users u
      INNER JOIN Address a ON u.addressID = a.addressID
      INNER JOIN CovidDetails cd ON u.covidDetailsID = cd.covidID;
    `;
    const result = await pool.query(query);

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  getAllUsers,
  createUser,
};
