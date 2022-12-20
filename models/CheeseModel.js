const { sequelize } = require("../database")
const { DataTypes } = require("sequelize")

const Cheese = sequelize.define('Cheese', {
    // Model attributes are defined here
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    // Other model options go here
});

module.exports = { Cheese }