const db = require('../database/dbConfig');

module.exports = {
  add,
  findByUsername
};

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

async function add(user) {
  const [id] = await db('users').insert(user, 'id')
  return findById(id)
};

function findByUsername(username) {
  return db('users')
    .where({ username })
    .first();
};