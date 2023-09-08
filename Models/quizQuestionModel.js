module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define(
      "db_quiz_question",
      {
        quiz_question_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
  
        quiz_master_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'db_quiz_masters', // 'fathers' refers to table name
                key: 'quiz_master_id', // 'id' refers to column name in fathers table
            }
        },
  
        quiz_question: {
          type: DataTypes.STRING,
          default: null,
        },

        quiz_answer: {
            type: DataTypes.STRING,
            default: null,
        },
  
      },
      
      {
        timestamps: true,
        paranoid: true,
  
        // Other model options go here
      }
    );
    return users;
  };
  