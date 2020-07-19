const jwt = require('jsonwebtoken');
const Apartment = require('../apartments/apartments-model')

module.exports = {
  checkUserInput,
  verifyToken,
  checkApartmentInput,
  validateApartmentId
};

function checkUserInput(req, res, next) {
  let user = req.body;
  if (user.username && user.password) {
    next();
  } else {
    res.status(403).json({ message: 'missing required field' });
  };
};

function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
      jwt.verify(
          token,
          process.env.NODE_ENV === 'development' ? 'this is supposed to be secret' : process.env.SECRET,
          (err, decodedToken) => {
              if (err) {
                  res.status(401).json({ 'credentials not valid': err });
              } else {
                  req.decodedToken = decodedToken;
                  next();
              };
          }
      );
  } else {
      res.status(400).json({ message: 'No credentials provided' });
  };
};

function checkApartmentInput(req, res, next) {
  const { address, city, toilets, bathrooms, bedrooms } = req.body;
  if (address && city && toilets && bathrooms && bedrooms) {
      next();
  } else {
      res.status(403).json({ message: 'missing required field(s)' });
  }
};

function validateApartmentId(req, res, next) {
  Apartment.findBy(req.params.id)
      .then(apartment => {
          if (apartment) {
              req.apartment = apartment;
              next();
          } else {
              res.status(404).json({ message: "invalid apartment id" });
          }
      })
      .catch(error => {
          res.status(500).json({
              'something went wrong quering db': error.message
          });
      });
};