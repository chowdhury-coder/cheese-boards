const { User, Board, Cheese } = require("./index")
const { sequelize } = require("./database")

describe("Cheese Board Test", () => {

    beforeAll(async () => {
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    })

    beforeEach(async() => {
        await sequelize.sync({ force: true });
    });

    test("Test: Add a user to User Model", async () => {
        await User.create({
            name: "Mohammed Chowdhury",
            email: "mohammad.chowdhury@clover.com"
        })
        // querying the user model
        const user = await User.findOne()
        expect(user.name).toBe("Mohammed Chowdhury")
        expect(user.email).toBe("mohammad.chowdhury@clover.com")
    })

    test("Test: Add Cheese to Cheese Model", async() =>{

        await Cheese.create({
            title: 'Percorino Romano',
            description: 'Hard and grayish'
        })
        // query the cheese model
        const cheese = await Cheese.findOne()
        expect(cheese.title).toBe("Percorino Romano")
        expect(cheese.description).toBe("Hard and grayish")
    })

    test("Test: Add Board to  Board Model", async ()=>{
        await Board.create({
            type:"Glass",
            description: "Rectangular in shape",
            rating:5
        })
        // querying the board model
        const board = await Board.findOne();
        expect(board.type).toBe("Glass")
        expect(board.description).toBe("Rectangular in shape")
        expect(board.rating).toBe(5)
    })

})