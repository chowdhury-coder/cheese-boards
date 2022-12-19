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
        const user = await User.create({
            name: "Mohammed Chowdhury",
            email: "mohammad.chowdhury@clover.com"
        })

        const dbUser = await User.findOne()
        expect(dbUser.name).toBe("Mohammed Chowdhury")
        expect(dbUser.email).toBe("mohammad.chowdhury@clover.com")
    })

    

})