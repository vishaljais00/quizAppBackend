const db = require("../Models");
const {responseJSON} = require("../helper/responce");
const { QueryTypes, where, Op } = require("sequelize");

// declaring the usermodel
const quizMaster = db.quizMaster;
const quizQuestion = db.quizQuestion;
const quizOption = db.quizOption;
const userQuizDetail = db.userQuizDetail;
const userQuizMasterModel = db.userQuizMasterModel;
const User = db.users;

exports.storeQuizMaster = async (req, res) => {
  try {
    const { quiz_end_date , quiz_start_date , quiz_event_name, quiz_name} = req.body;
    // created quiz
    const createdQuiz = await quizMaster.create({
        quiz_end_date: quiz_end_date,
        quiz_start_date: quiz_start_date,
        quiz_event_name, quiz_name
    });

    return await responseJSON(res, 200, "quiz master created", createdQuiz);

  } catch (error) {
    return await responseJSON(res, 400, "something went wrong", error.message);
  }
};

exports.getAllQuestionAndOptionFromMaster = async (req, res) => {
    try {
      const { id } = req.query;
      // created quiz
      const QuizMasterList = await quizMaster.findOne({
        where:{
            quiz_master_id: id
        },
        include: [
            {
                model: quizQuestion,
                as: "quiz_master", 
                include: [
                    {
                        model: quizOption,
                        as: 'option_list'
                    }
                ]
            }
        ]
      })
  
      return await responseJSON(res, 200, "quiz master list with question", QuizMasterList);
  
    } catch (error) {
      return await responseJSON(res, 400, "something went wrong", error.message);
    }
  };

  exports.getOneQuestion = async (req, res) => {
    try {
      const { id } = req.query;
      // created quiz
      const QuizQuestion = await quizQuestion.findByPk(id, {
        include: [
            {
                model: quizMaster,
                as: "quiz_master" 
            }
        ]
      })
  
      return await responseJSON(res, 200, "quiz master list with question", QuizQuestion);
  
    } catch (error) {
      return await responseJSON(res, 400, "something went wrong", error.message);
    }
  };

  exports.getAllQuiz = async (req, res) => {
    try {
      // created quiz
      const QuizMaster = await quizMaster.findAll({
        where:{
          quiz_master_status : true
        }
      })
  
      return await responseJSON(res, 200, "all quiz master list", QuizMaster);
  
    } catch (error) {
      return await responseJSON(res, 400, "something went wrong", error.message);
    }
  };

  exports.getAllQuizforAdmin = async (req, res) => {
    try {
      // created quiz
      const QuizMaster = await quizMaster.findAll()
  
      return await responseJSON(res, 200, "all quiz master list for master", QuizMaster);
  
    } catch (error) {
      return await responseJSON(res, 400, "something went wrong", error.message);
    }
  };

  exports.updateQuizMasterStatus = async (req, res) => {
    try {
      // created quiz
      const {quiz_master_id , status} = req.body

      await quizMaster.update({
        quiz_master_status : true,
        quiz_final_status: true
      }, {
        where:{
          quiz_master_id : quiz_master_id
        }
      })

      await quizMaster.update({
        quiz_master_status : false
      }, {
        where:{
          quiz_master_id : {
            [Op.ne] : quiz_master_id
          }
        }
      })

      const QuizMasterData = await quizMaster.findAll()
      return await responseJSON(res, 200, "updated QuizMAster List", QuizMasterData);
  
    } catch (error) {
      return await responseJSON(res, 400, "something went wrong", error.message);
    }
  };
  

  exports.getAllQuestion = async (req, res) => {
    try {
      const { id } = req.params;
      // created quiz
      const QuizQuestionList = await quizQuestion.findAll({
        where: {
          quiz_master_id: id
        },
        include: [
          {
            model: quizOption,
            as: 'option_list'
          }
        ],
        attributes: {
          exclude: ['quiz_answer']
        }
      });
  
      return await responseJSON(res, 200, "quiz question list", QuizQuestionList);
  
    } catch (error) {
      return await responseJSON(res, 400, "something went wrong", error.message);
    }
  };
  

exports.storeQuizQuestion = async (req, res) => {
    try {
      const {quiz_master_id, quiz_question , quiz_answer} = req.body;
      // created quiz
      const createdQuizQuestion = await quizQuestion.create({quiz_master_id, quiz_question , quiz_answer});
  
      return await responseJSON(res, 200, "quiz question created", createdQuizQuestion);
  
    } catch (error) {
      return await responseJSON(res, 400, "something went wrong", error.message);
    }
};

exports.storeQuizOption = async (req, res) => {
    try {
      const {quiz_question_id, quiz_option } = req.body;
      // created quiz
      const createdQuizOption = await quizOption.create({quiz_question_id, quiz_option});
  
      return await responseJSON(res, 200, "quiz question option created", createdQuizOption);
  
    } catch (error) {
      return await responseJSON(res, 400, "something went wrong", error.message);
    }
};


exports.resetQuiz = async (req, res) => {
  try {
        await quizMaster.update({quiz_master_status: 0, quiz_final_status: 0},{
          where:{}
        })

        await userQuizDetail.destroy({
          where:{},
          force: true
        })

        await userQuizMasterModel.destroy({
          where:{},
          force: true
        })

        await User.destroy({
          where:{},
          force: true
        })

        

    return await responseJSON(res, 200, "quiz reseted");

  } catch (error) {
    return await responseJSON(res, 400, "something went wrong", error.message);
  }
};
