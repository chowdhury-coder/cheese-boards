const { sequelize } = require("../database")
const { DataTypes } = require("sequelize")

const UserModel = sequelize.define('User', {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    }
  }, {
    // Other model options go here
});

module.exports = { UserModel }