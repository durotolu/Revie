const Users = require('./users-model')
const db = require('../database/dbConfig')

beforeEach(async () => {
   await db('users').truncate()
})

describe('User model', () => {
    describe('insert function', () => {
        let users
        test('should insert user', async () => {
            await Users.add({ username: 'tobi', password: 'math', email: 'testing@gmail.com' })
            
            users = await db('users')
            expect(users).toHaveLength(1)

            await Users.add({ username: 'shade', password: 'tech', email: 'test@gmail.com' })

            users = await db('users')
            expect(users).toHaveLength(2)
        })
    })
})