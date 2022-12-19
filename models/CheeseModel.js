const { sequelize } = require("../database")
const { DataTypes } = require("sequelize")

const CheeseModel = sequelize.define('Cheese', {
    // Model attributes are defined here
    title: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    }
  }, {
    // Other model options go here
});

module.exports = { CheeseModel }