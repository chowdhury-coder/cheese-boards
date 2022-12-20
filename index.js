const { User } = require("./models/UserModel")
const { Cheese } = require("./models/CheeseModel")
const { Board } = require("./models/BoardModel")


// Multiple Boards can be added to a User.
Board.belongsTo(User)
User.hasMany(Board)

module.exports = { User, Cheese, Board }