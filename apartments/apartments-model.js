const db = require('../database/dbConfig');
const mappers = require('../helpers/mappers')

module.exports = {
  find,
  findBy,
  add
};

function find() {
  return db('apartments')
    .leftJoin('reviews', 'apartments.id', 'reviews.apartments_id')
    .select(
      'apartments.*',
      'reviews.apartments_id',
      'reviews.users_id',
      'reviews.media',
      'reviews.environment',
      'reviews.lanlord',
      'reviews.amenities',
      'reviews.date_added',
      'reviews.helpful_count',
      'reviews.id as reviews_id'
    )
    .then(apartments => apartments.map(apartment => mappers.apartmentPropertyToBoolean(apartment)))
};

function findBy(id) {
  let query = db('apartments')
    .leftJoin('users', 'apartments.user_id', 'users.id')
    .select('apartments.*', 'users.username');

  if (id) {
    query.where('apartments.id', id).first();

    const promises = [query, getApartmentReviews(id)];

    return Promise.all(promises).then(function (results) {
      let [apartment, reviews] = results;

      if (apartment) {
        apartment.reviews = reviews;
        return mappers.apartmentPropertyToBoolean(apartment);
      } else {
        return null
      };
    });
  };
  return query.then(apartments => {
    return apartments.map(apartment => mappers.apartmentPropertyToBoolean(apartment))
  })
};

async function add(apartment) {
  const [id] = await db('apartments').insert(apartment, 'id');

  return findBy(id);
}

function getApartmentReviews(apartmentId) {
  return db('reviews')
    .where('apartment_id', apartmentId)
}