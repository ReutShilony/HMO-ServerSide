const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userController = require('./userController');


const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // !!!

// Define routes
app.get('/users', userController.getAllUsers);
app.post('/users', userController.createUser);
app.put('/users/:id', userController.updateUser); 
app.delete('/users/:id', userController.deleteUser); 

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
