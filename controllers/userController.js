const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


const loginController = async (req, res) => {
  // Implement your login logic here
  try {
    const user = await userModel.findOne({ email: req.body.email })
    if (!user) {
      return res.status(200).send({ message: "user not found", success: false })
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password)
    if (!isMatch) {
      return res.status(200).send({ message: 'Invalid email or password', success: false })
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.status(200).send({ message: 'Login Success', success: true, token })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: `Error in Login ${error.message}` })
  }
};

const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email }).maxTimeMS(10000);

    if (existingUser) {
      return res.status(400).send({ message: "User Already Exists", success: false });
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      email: req.body.email,
      password: hashedPass, // Store hashed password
      name: req.body.name
    });

    await newUser.save();

    res.status(201).send({ message: "Registered Successfully", success: true });
  } catch (error) {
    console.error(`Error in registerController: ${error.message}`);
    res.status(500).send({ success: false, message: `Register Controller Error: ${error.message}` });
  }
};

const authController = async (req, res) => {
  try {
    const user = await userModel.findOne({_id:req.body.userId})
    if(!user){
      return res.status(200).send({message: "User not found", success: false})
    }else{
      res.status(200).send({
        success: true,
        data :{
          name: user.name,
          email: user.email
        }
      })
    }
  } catch (error) {
    console.error(error)
    res.status(500).send({
      message:'Auth Error',
      success: false,
      error: error.message
    })
  }
}

module.exports = { loginController, registerController,authController };
