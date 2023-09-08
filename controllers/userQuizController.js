const db = require("../Models");
const {responseJSON} = require("../helper/responce");
const { QueryTypes, where, Op , Sequelize} = require("sequelize");

// declaring the usermodel
const quizMaster = db.quizMaster;
const quizQuestion = db.quizQuestion;
const quizOption = db.quizOption;
const userQuizMasterModel = db.userQuizMasterModel;
const userQuizDetail = db.userQuizDetail;
const User = db.users;

exports.storeUserQuizMaster = async (req, res) => {
  try {
    const {quiz_master_id, user_start_time, total_question} = req.body;

    const findUserQuiz = await userQuizMasterModel.findOne({ 
      where: {
        user_id: req.user.user_id , 
        quiz_master_id, 
      }
  });

  if(findUserQuiz) return await responseJSON(res, 200, "user quiz already created", findUserQuiz);
    // created quiz
    const userCreatedQuiz = await userQuizMasterModel.create({ 
        user_id: req.user.user_id , 
        quiz_master_id, 
        user_start_time, 
        total_question,
        status: false
    });

    return await responseJSON(res, 200, "user quiz has been initiated", userCreatedQuiz);

  } catch (error) {
    return await responseJSON(res, 400, "something went wrong", error.message);
  }
};

exports.submitUserQuizMaster = async (req, res) => {
  try {
    const { user_quiz_master, answer, user_end_time } = req.body;
  
    // Find user quiz data by ID
    let userQuizData = await userQuizMasterModel.findByPk(user_quiz_master);
  
    // Check if the quiz has already been submitted
    if (userQuizData.status) {
      return responseJSON(res, 200, "quiz has been already submitted", userQuizData);
    }
  
    let total_marks = 0;
    let promises = answer.map(async (item) => {
      // Find the question data for the current answer
      const questData = await quizQuestion.findByPk(item.quiz_question_id);
  
      // Create user quiz detail entry
      await userQuizDetail.create({
        user_id: req.user.user_id,
        quiz_master_id: userQuizData.quiz_master_id,
        quiz_question_id: item.quiz_question_id,
        user_answer: item.user_answer
      });
  
      // Check if the answer is correct and update total marks
      if (questData.quiz_answer.trim() == item.user_answer.trim()) {
        total_marks += 1;
      }
    });
  
    // Wait for all promises to resolve
    await Promise.all(promises);
  
    // Update user quiz data with submission details
    userQuizData.user_end_time = user_end_time;
    userQuizData.total_marks = total_marks;
    userQuizData.total_time = new Date(user_end_time) - new Date(userQuizData.user_start_time);
    userQuizData.status = true;
  
    // Save the updated user quiz data
    await userQuizData.save();
  
    // Return success response
    return responseJSON(res, 200, "user quiz submitted", userQuizData);
  } catch (error) {
    // Handle errors and return error response
    return await responseJSON(res, 400, "something went wrong", error.message);
  }
  
  };

exports.getAllQuizResult = async (req, res) => {
    try {
      // created quiz
      const QuizAnswerList = await quizMaster.findAll({
        include: [
            {
                model: userQuizMasterModel,
                as: 'user_quiz_list',
                where: {
                  total_question : {
                    [Op.eq]: db.sequelize.col("total_marks")
                } 
              },
                include: [{
                  model: User,
                  as: 'quiz_user_detail',
                }],
                separate: true, order:[['total_marks', 'DESC'], ['total_time', 'ASC']],
                limit: 10
            }
        ]
      })
  
      return await responseJSON(res, 200, "quiz master list with result", QuizAnswerList);
  
    } catch (error) {
      return await responseJSON(res, 400, "something went wrong", error.message);
    }
  };

exports.getCombineResult = async (req, res) => {
  try {
    const QuizAnswerList = await userQuizMasterModel.findAll({
      attributes: [
        [
          db.sequelize.fn('SUM', db.sequelize.col('total_marks')),
          'total_marks2'
        ],
        [
          db.sequelize.fn('SUM', db.sequelize.col('total_time')),
          'total_time2'
        ],
        [
          db.sequelize.fn('SUM', db.sequelize.col('total_question')),
          'total_question'
        ],
        'quiz_user_detail.user_id',
        'quiz_user_detail.user_name',
        'quiz_user_detail.email',
        'quiz_user_detail.phone'
      ],
      include: [
        {
          model: User,
          as: 'quiz_user_detail'
        }
      ],
      where: {
        status: true
      },
      group: ['quiz_user_detail.user_id'],
      having: Sequelize.literal('total_marks2 = 17'),
      order: [
        [Sequelize.literal('total_marks2 DESC')],
        [Sequelize.literal('total_time2 ASC')]
      ] 
    });

    return await responseJSON(res, 200, "combine result", QuizAnswerList);
  } catch (error) {
    return await responseJSON(res, 400, "something went wrong", error.message);
  }
}

exports.checkUserQuizMaster = async (req, res) => {
  try {
    const {id} = req.query;

    const findUserQuiz = await userQuizMasterModel.findOne({ 
      where: {
        user_id: req.user.user_id, 
        quiz_master_id: id, 
      }
  });

    return await responseJSON(res, 200, "user quiz status", findUserQuiz);

  } catch (error) {
    return await responseJSON(res, 400, "something went wrong", error.message);
  }
};

exports.updateInterestedUserState = async (req, res) => {
  try {
    
    const {is_intersted, is_insightful, is_volunteer } = req.body
    const UserData = await User.findByPk(req.user.user_id);
 
    if(!UserData)  return await responseJSON(res, 200, "no user found", UserData);
    UserData.is_intersted = is_intersted
    UserData.is_insightful = is_insightful
    UserData.is_volunteer = is_volunteer
    await UserData.save()
    return await responseJSON(res, 200, "user quiz status", UserData);

  } catch (error) {
    return await responseJSON(res, 400, "something went wrong", error.message);
  }
};


  