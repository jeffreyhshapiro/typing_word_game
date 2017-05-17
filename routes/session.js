const express = require('express');
const sesh = express();
const session = require('express-session');
require('dotenv').config();

sesh.set('trust proxy', 1) // trust first proxy
sesh.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

module.exports = sesh;
