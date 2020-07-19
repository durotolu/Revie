const request = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig')

beforeAll(async () => {
    await db('users').truncate();
})

let token;

const input = {
    username: 'testing',
    password: 'testing',
    email: 'testing@gmail.com'
}