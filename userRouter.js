const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Define routes
router.post('/', userController.createUser);
// Add other routes as needed

module.exports = router;
