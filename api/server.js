const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRouter = require('../user/auth-router')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/auth', authRouter);

server.get('/', (req, res) => {
  res.send({ revie: 'Welcome to Revie!'})
});

module.exports = server;