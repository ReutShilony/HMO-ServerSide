const express = require('express');
const userController = require('./userController');

const router = express.Router();

// Define routes
//router.post('/', userController.createUser);
// Add other routes as needed

router.get('/', userController.getAllUsers);

module.exports = router;
