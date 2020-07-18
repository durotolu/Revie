const db = require('../database/dbConfig');

module.exports = {
  add
};

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

async function add(user) {
  const [id] = await db('users').insert(user, 'id')
  return findById(id)
}