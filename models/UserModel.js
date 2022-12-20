const { sequelize } = require("../database")
const { DataTypes } = require("sequelize")

const User = sequelize.define('User', {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    }
  });

module.exports = { User }