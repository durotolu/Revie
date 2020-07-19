const request = require('supertest');
const server = require('./server');

describe('server', () => {
  describe('[GET] / endpoint', () => {
    test('the db env is using testing', () => {
      expect(process.env.NODE_ENV).toBe('testing');
    });
    test('should return 200 OK', async () => {
      const response = await request(server).get('/');
      expect(response.status).toBe(200);
    })
  })
})