//importing modules
const express = require("express");
const quizMasterController = require("../controllers/quizMasterController");
const {protect} = require('../middleware/authController')
const router = express.Router();


//admin routes
router
  	.route("/master")
		.post(quizMasterController.storeQuizMaster) 
		.get(quizMasterController.getAllQuestionAndOptionFromMaster)
		.delete(quizMasterController.resetQuiz)
		 
router
  	.route("/question")
		.post(quizMasterController.storeQuizQuestion) 
		.get(quizMasterController.getOneQuestion)
		
router
	.route("/question/all/:id")
		.get(quizMasterController.getAllQuestion)
		
router
  	.route("/option")
		.post(quizMasterController.storeQuizOption) 

router
  	.route("/all")
		.get(quizMasterController.getAllQuiz)

router
	.route("/admin")
		.get(quizMasterController.getAllQuizforAdmin)
		.put(quizMasterController.updateQuizMasterStatus)

module.exports = router;