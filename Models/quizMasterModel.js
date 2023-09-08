module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define(
      "db_quiz_master",
      {
        quiz_master_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
  
        quiz_end_date: {
          type: DataTypes.DATE,
          default: null,
        },
  
        quiz_start_date: {
          type: DataTypes.DATE,
          default: null,
        },

        quiz_event_name: {
          type: DataTypes.STRING,
          allowNull: true,
        },

        quiz_name: {
          type: DataTypes.STRING,
          default: null,
          allowNull: true,
        },

        quiz_master_status: {
          type: DataTypes.BOOLEAN,
          default: false,
        },

        quiz_final_status: {
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
    return users;
  };
  