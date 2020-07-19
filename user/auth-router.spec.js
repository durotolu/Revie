const request = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig');

beforeAll(async () => {
  await db('users').truncate();
});

let token;

const input = {
  username: 'testing',
  password: 'testing',
  email: 'testing@gmail.com'
};

describe('users authorization', () => {
  describe('POST /users', () => {
    test('should return 201, with testing as user and correct content-type', () => {
      return request(server)
        .post('/auth/register')
        .send(input)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .then(res => {
          (res.body.username, 'testing');
        });

      
    });
  })
})