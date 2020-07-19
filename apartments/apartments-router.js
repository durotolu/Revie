const router = require('express').Router();
const Apartments = require('./apartments-model');
const Reviews = require('../reviews/reviews-model');
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
  Apartments.findReviewByUserApartment(postInfo.user_id, postInfo.apartment_id)
    .then(review => {
      if (review) {
        Apartments.updateReview(review.id, postInfo)
          .then(updated => {
            res.status(200).json(updated);
          })
          .catch(error => {
            res.status(500).json({
              'error editing reviews': error.message
            });
          });
      } else {
        Apartments.addReviews(postInfo)
          .then(saved => {
            res.status(201).json(saved);
          })
          .catch(error => {
            res.status(500).json(error.message);
          });
      }
    })
    .catch(error => {
      res.status(500).json(error.message);
    })
});

router.put('/:id/reviews/:rid', (req, res) => {
  Reviews.update(req.params)
    .then(edited => {
      res.status(200).json(edited)
    })
    .catch(error => {
      res.status(500).json({
        'error editing review': error.message
      });
    });
})

module.exports = router;