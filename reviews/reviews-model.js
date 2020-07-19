const db = require('../database/dbConfig');
const Apartments = require('../apartments/apartments-model')

module.exports = {
  update,
  findOrderedReviews
}

async function update(params) {
  let review = await db('reviews').where('id', params.rid).first()
  let currentCount = review.helpful_count;
  currentCount++;
  return db('reviews')
    .where('id', params.rid)
    .update({ helpful_count: currentCount })
    .then(count => (count > 0 ? Apartments.findBy(review.apartment_id) : null));
};

function findOrderedReviews(req) {
  if (req.body.helpful_count) {
    return db('reviews')
      .where('apartment_id', req.params.id)
      .orderBy('helpful_count', 'desc')
  } else if (req.body.created_at) {
    return db('reviews')
      .where('apartment_id', req.params.id)
      .orderBy('created_at', 'desc');
  }
}