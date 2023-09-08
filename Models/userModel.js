module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    "db_user",
    {
      user_id: {
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

      user_image: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      company: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      is_intersted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true
      },

      is_insightful: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true
      },

      is_volunteer: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true
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
