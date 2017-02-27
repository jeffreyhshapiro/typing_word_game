const express = require('express');
const app = express();
const randomWord = require('random-words');
const defineWord = require('define-word');
const Sequelize = require('sequelize');
const models = require('./models');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use(express.static('logic'));
app.use(express.static('css'));

// let sequelize = new Sequelize('typefall', process.env.DB_USERNAME, process.env.DB_PASSWORD, {
//   host: 'localhost',
//   dialect: 'postgres',
// }).authenticate().then(() => {
//   console.log('successful')
// }).catch((err) => {
//   console.log(`Unable to connect to database: ${err}`);
// });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/word', (req, res) => {
  let rWord = randomWord(30);
  let wordsArr = rWord.map((word)=> {
    return {
      word: word,
      definition: defineWord.define(word)
    }
  });
  res.json(wordsArr);
});

app.post('/saveWordData', (req, res) => {
  console.log('right herrrrrr');
});

models.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
