const { User } = require("./models/UserModel")
const { Cheese } = require("./models/CheeseModel")
const { Board } = require("./models/BoardModel")


// Multiple Boards can be added to a User.
Board.belongsTo(User)
User.hasMany(Board)

// Many to Many association - A board can have many cheeses, and a cheese can be on many boards which creates a new table called Board_Cheese
Board.belongsToMany(Cheese, {through: "Board_Cheese"});
Cheese.belongsToMany(Board, {through: "Board_Cheese"});

module.exports = { User, Cheese, Board }