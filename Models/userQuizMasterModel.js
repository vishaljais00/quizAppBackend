module.exports = (sequelize, DataTypes) => {
    const userQuizaster = sequelize.define(
      "db_user_quiz_master",
      {
        user_quiz_master: {
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

        user_start_time: {
            type: DataTypes.STRING,
            default: null,
            allowNull: true,
          },
    
        user_end_time: {
            type: DataTypes.STRING,
            default: null,
            allowNull: true,
        },

        total_time: {
            type: DataTypes.FLOAT,
            default: null,
            allowNull: true,
        },

        total_question: {
            type: DataTypes.STRING,
            default: null,
        },

        total_marks: {
            type: DataTypes.STRING,
            default: null,
        },

        status: {
            type: DataTypes.BOOLEAN,
            default: false,
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
  