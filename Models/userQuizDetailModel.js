module.exports = (sequelize, DataTypes) => {
    const userQuizaster = sequelize.define(
      "db_user_quiz_detail",
      {
        user_quiz_detail_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
  
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'db_users', // 'fathers' refers to table name
                key: 'user_id', // 'id' refers to column name in fathers table
            }
        },
  
        quiz_master_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'db_quiz_masters', // 'fathers' refers to table name
                key: 'quiz_master_id', // 'id' refers to column name in fathers table
            }
        },

        quiz_question_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'db_quiz_questions', // 'fathers' refers to table name
                key: 'quiz_question_id', // 'id' refers to column name in fathers table
            }
        },

        user_answer: {
            type: DataTypes.STRING,
            allowNull: true,
        },
  
      },
      
      {
        timestamps: true,
        paranoid: true,
  
        // Other model options go here
      }
    );
    return userQuizaster;
  };
  