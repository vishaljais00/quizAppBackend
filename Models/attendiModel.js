module.exports = (sequelize, DataTypes) => {
    const user_attend = sequelize.define(
      "db_user_attend",
      {
        user_attend_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
  
        user_name:{
          type: DataTypes.STRING,
          allowNull: false,
        },
  
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
  
        phone: {
          type: DataTypes.BIGINT,
          allowNull: true,
        },
  
        company: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        visited: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },

        isNew: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },

        designation: {
          type: DataTypes.STRING,
          allowNull: true,
      },

      table_no: {
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
    return user_attend;
  };
  