// importing modules
const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require('../config/db.config.js')

const sequelize = new Sequelize(
  dbConfig.DB ,dbConfig.USER , dbConfig.PASSWORD,
  { host: 'localhost' , dialect: "mysql", logging: false, 
    timezone: "+05:30",  dialectOptions: {
      // useUTC: false, //for reading from database
      dateStrings: true,
      typeCast: true,
      timezone: "+05:30"
    }, pool:{
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  } }
);

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./userModel")(sequelize, DataTypes);
db.quizMaster = require("./quizMasterModel.js")(sequelize, DataTypes);
db.quizQuestion = require("./quizQuestionModel.js")(sequelize, DataTypes);
db.quizOption = require("./quizOptionModel.js")(sequelize, DataTypes);
db.userQuizMasterModel = require("./userQuizMasterModel.js")(sequelize, DataTypes);
db.attendiModel = require("./attendiModel.js")(sequelize, DataTypes);
db.userQuizDetail = require("./userQuizDetailModel.js")(sequelize, DataTypes);
db.email = require("./emailModel.js")(sequelize, DataTypes);



// asociates 

// ===> question Model started
db.quizMaster.hasMany(db.quizQuestion, {as: "quiz_master",foreignKey: 'quiz_master_id'})
db.quizQuestion.belongsTo(db.quizMaster, {as: "quiz_master",foreignKey: 'quiz_master_id'})

// ===> quizOption Model started

db.quizQuestion.hasMany(db.quizOption, {as: "option_list", foreignKey: 'quiz_question_id'})
db.quizOption.belongsTo(db.quizQuestion, {as: "quiz_question",foreignKey: 'quiz_question_id'})

// ===> user QuizMaster Model  started

db.quizMaster.hasMany(db.userQuizMasterModel, {as: "user_quiz_list", foreignKey: 'quiz_master_id'})
db.users.hasMany(db.userQuizMasterModel, {as: "user_list", foreignKey: 'user_id'})

db.userQuizMasterModel.belongsTo(db.quizMaster, {as: "quiz_master_detail",foreignKey: 'quiz_master_id'})
db.userQuizMasterModel.belongsTo(db.users, {as: "quiz_user_detail",foreignKey: 'user_id'})


db.sequelize.sync();
// db.sequelize.sync();
module.exports = db;
