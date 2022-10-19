const express = require('express');

const userController = require('../controllers/user')
const user = require('../models/user');

const router = express.Router();

router.post('/getScrapping', userController.getScrapping);


module.exports = router; 