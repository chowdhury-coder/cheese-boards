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


    test("Test: Many to Many association - A board can have many cheeses", async ()=>{
        const board = await Board.create({
            type:"Gem",
            description: "Polished and shiny and rectangular in shape",
            rating:10
        })

        const cheese_1 = await Cheese.create({
            title: 'Chedar',
            description:'Yellow and semi soft'
        })
        const cheese_2 = await Cheese.create({
            title: 'Fetah',
            description:'Hard'
        })
        const cheese_3 = await Cheese.create({
            title: 'Brie',
            description:'Whitish'
        })
        const cheese_4 = await Cheese.create({
            title: 'Blue Cheese',
            description:'Blue'
        })

        // Special methods/mixins added to instance
        await board.addCheeses([cheese_1, cheese_2, cheese_3, cheese_4])

        // Special methods/mixins added to instances to get the cheese associated with board
        const cheeseBoards = await board.getCheeses()
        
        expect(cheeseBoards[0].title).toBe("Chedar")
        expect(cheeseBoards[0].description).toBe("Yellow and semi soft")
        expect(cheeseBoards[1].title).toBe("Fetah")
        expect(cheeseBoards[1].description).toBe("Hard")
        expect(cheeseBoards[2].title).toBe("Brie")
        expect(cheeseBoards[2].description).toBe("Whitish")
        expect(cheeseBoards[3].title).toBe("Blue Cheese")
        expect(cheeseBoards[3].description).toBe("Blue")
        expect(await board.countCheeses()).toBe(4)
    })

    test("Test: Many to Many association - A cheese can be on many boards", async ()=>{
        const cheese = await Cheese.create({
            title: 'Brie',
            description:'Whitish'
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
        const board_4 = await Board.create({
            type:"Wood",
            description: "Rough",
            rating:4
        })
        const board_5 = await Board.create({
            type:"Iron",
            description: "Brittle and Hard",
            rating:6
        })

        await cheese.addBoards([board_1, board_2, board_3, board_4, board_5])

        const cheeseBoards = await cheese.getBoards()

        expect(cheese instanceof Board).toBe(false)
        expect(cheese instanceof Cheese).toBe(true)
        expect(board_5 instanceof Board).toBe(true)
        expect(await cheese.countBoards()).toBe(5)
    })
})
