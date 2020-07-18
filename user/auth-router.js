const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Auth = require('./users-model');
const midware = require('../middleware/middleware');
const generateToken = require('../helpers/generateToken')

router.post('/register', midware.checkUserInput, (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;

  Auth.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error.message);
    })
});

router.post('/login', midware.checkUserInput, (req, res) => {
  let user = req.body;
  Auth.findByUsername(user.username)
    .then(data => {
      if (data && bcrypt.compareSync(user.password, data.password)) {
        const token = generateToken(data);
        res.status(200).json({
          message: `Welcome ${data.username}`,
          token: token,
          user_id: data.id,
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' })
      }
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
});

module.exports = router