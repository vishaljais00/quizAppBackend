//importing modules
const express = require("express");
const userQuizController = require("../controllers/userQuizController");
const {protect} = require('../middleware/authController')
const router = express.Router();


//admin routes
router
  	.route("/")
		.post(protect,userQuizController.storeUserQuizMaster) 
		.put(protect, userQuizController.submitUserQuizMaster)
		.get(userQuizController.getAllQuizResult)

router
  	.route("/result")
		.get(userQuizController.getCombineResult)
		
router
  	.route("/check")
		.get(protect, userQuizController.checkUserQuizMaster)

router
	.route("/interested")
		  .post(protect, userQuizController.updateInterestedUserState)

module.exports = router;