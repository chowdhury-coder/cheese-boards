const { sequelize } = require("../database")
const { DataTypes } = require("sequelize")

const User = sequelize.define('User', {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    }
  });

module.exports = { User }