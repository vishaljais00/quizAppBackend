//importing modules
const express = require("express");
const quizAttendController = require("../controllers/quizAttendController");
const {protect} = require('../middleware/authController')
const router = express.Router();


//admin routes
router
  	.route("/")
		.post(quizAttendController.attendCheck) 
		.put(quizAttendController.attendStatus)
		.get(quizAttendController.getAllUserAttend)

router
    .route("/create")
        .post(quizAttendController.storeUserAttend) 
module.exports = router;

