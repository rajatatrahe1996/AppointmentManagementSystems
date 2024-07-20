const express = require('express');
const { registerController } = require('../controllers/userController');

const {loginController } = require(("../controllers/userController"))

const router = express.Router();

router.post('/login',loginController)

router.post('/register',registerController)


module.exports = router;