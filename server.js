const express = require('express');
const app = express();
const bp = require('body-parser');
const randomWord = require('random-words');
const defineWord = require('define-word');
const Sequelize = require('sequelize');
const models = require('./models');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use(express.static('logic'));
app.use(express.static('css'));

app.use(bp.urlencoded({ extended: false }))
app.use(bp.json())

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
  console.log(req.body)
});

models.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
