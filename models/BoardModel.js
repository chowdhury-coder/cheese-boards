const { sequelize } = require("../database")
const { DataTypes } = require("sequelize")

const Board = sequelize.define('Board', {
    // Model attributes are defined here
    type: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    rating: {
      type: DataTypes.INTEGER
    }
  }, {
    // Other model options go here
});

module.exports = { Board }