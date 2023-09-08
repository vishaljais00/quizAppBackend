module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define(
      "db_quiz_option",
      {
        quiz_option_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
  
        quiz_question_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'db_quiz_questions', // 'fathers' refers to table name
                key: 'quiz_question_id', // 'id' refers to column name in fathers table
            }
        },
  
        quiz_option: {
          type: DataTypes.STRING,
          default: null,
          allowNull: true,
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
  