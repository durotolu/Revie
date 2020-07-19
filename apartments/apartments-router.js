const router = require('express').Router();
const Apartments = require('./apartments-model');
const midware = require('../middleware/middleware');

router.get('/', (req, res) => {
  Apartments.findBy()
    .then(apartments => {
      res.status(200).json(apartments);
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
});

router.post('/', [midware.verifyToken, midware.checkApartmentInput], (req, res) => {
  let apartment = req.body;
  Apartments.add(apartment)
      .then(saved => {
          res.status(201).json(saved);
      })
      .catch(error => {
          res.status(500).json(error.message);
      });
});

router.get('/:id', midware.validateApartmentId, (req, res) => {
  res.status(200).json(req.apartment)
});

router.get('/:id/reviews', midware.validateApartmentId, (req, res) => {
  Apartments.getApartmentReviews(req.params.id)
      .then(reviews => {
          res.status(200).json(reviews);
      })
      .catch(error => {
          res.status(500).json({
              'Error getting reviews of apartment': error.message
          })
      });
});

router.post('/:id/reviews', midware.verifyToken, (req, res) => {
  const postInfo = { ...req.body, apartment_id: req.params.id }
  Apartments.addReviews(postInfo)
      .then(saved => {
          res.status(201).json(saved);
      })
      .catch(error => {
          res.status(500).json(error.message);
      });
});

router.put('/:id/reviews/:id')

module.exports = router;