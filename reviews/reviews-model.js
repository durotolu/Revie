const db = require('../database/dbConfig');
const Apartments = require('../apartments/apartments-model')

module.exports = {
  update
}

async function update (params) {
  let review = await db('reviews').where('id', params.rid).first()
  let currentCount = review.helpful_count
  currentCount++
  return db('reviews')
      .where('id', params.rid)
      .update({ helpful_count: currentCount })
      .then(count => (count > 0 ? Apartments.findBy(review.apartment_id) : null));
}