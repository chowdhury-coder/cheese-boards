const { User, Board, Cheese } = require("./index")
const { sequelize } = require("./database")
const { DataTypes } = require("sequelize")


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

    test("Test: Multiple Boards can be added to a User.", async ()=>{
        const user = await User.create({
            name: "Mohammed Chowdhury",
            email: "mohammad.chowdhury@clover.com"
        })

        const board_1 = await Board.create({
            type:"Glass",
            description: "Rectangular in shape",
            rating:5
        })

        const board_2 = await Board.create({
            type:"Bronze",
            description: "Smooth in texture and triangular in shape",
            rating:7
        })
        const board_3 = await Board.create({
            type:"Gold",
            description: "Glossy and shiny and spherical in shape",
            rating:10
        })

        // Special methods/mixins added to instances
        await user.addBoards([board_1, board_2, board_3])

        // Special methods/mixins added to instances to get the boards associated with user
        const userBoards = await user.getBoards()

        expect(userBoards[0].type).toBe("Glass")
        expect(userBoards[1].type).toBe("Bronze")
        expect(userBoards[2].rating).toBe(10)
        expect(userBoards[2].description).toBe("Glossy and shiny and spherical in shape")
        expect(await user.countBoards()).toBe(3)

        // Un-associate all previously associated bars
        await user.setBoards([]);
        
        expect(await user.getBoards()).toEqual([])
    })

})
