const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRouter = require('../user/auth-router');
const ApartmentsRouter = require('../apartments/apartments-router')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/auth', authRouter);
server.use('/apartments', ApartmentsRouter);

server.get('/', (req, res) => {
  res.send({ revie: 'Welcome to Revie!'})
});

module.exports = server;