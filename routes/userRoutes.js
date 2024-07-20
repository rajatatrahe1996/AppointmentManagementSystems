const express = require('express');
const { registerController,loginController,authController } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();


router.post('/login',loginController)

router.post('/register',registerController)

router.post('/getUserData', authMiddleware, authController);
module.exports = router;