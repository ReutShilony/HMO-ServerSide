const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./userRouter');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
app.use('/users', userRoutes);
// Add other routes as needed

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
