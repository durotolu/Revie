const request = require('supertest');
const server = require('../api/server');

const input = {
  address: "23, Address",
  city: "Sample City",
  toilets: "2",
  bathrooms: "1",
  bedrooms: "0",
  user_id: 1
}

describe('apartments router', () => {
  describe('POST /apartments', () => {
    test('should return 400 with no token passed', () => {
      return request(server)
        .post('/apartments')
        .send(input)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(res => {
          (res.body)
        })
    });
  });

  describe('GET /apartments', () => {
    test('should return 201, with testing as user and correct content-type', () => {
      return request(server)
        .get('/apartments')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(res => {
          (res.body)
        })
    });
  });

  describe('POST /apartments', () => {
    test('should return 404 with no id present', () => {
      return request(server)
        .get('/apartments/:id')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
        .then(res => {
          (res.body)
        })
    });
  });

})