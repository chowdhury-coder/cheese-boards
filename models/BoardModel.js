const { sequelize } = require("../database")
const { DataTypes } = require("sequelize")

const Board = sequelize.define('Board', {
    // Model attributes are defined here
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    // Other model options go here
});

module.exports = { Board }