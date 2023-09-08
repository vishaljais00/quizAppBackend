//importing modules
const express = require("express");
const userController = require("../controllers/userController");
const {protect} = require('../middleware/authController')
const {check} = require('../middleware/validUser')
const router = express.Router();


//admin routes
router
  	.route("/")
		.post(userController.loginRegisterUser) 
		.get(check, userController.checkToken) 

module.exports = router;