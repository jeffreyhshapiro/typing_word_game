const express = require('express');
const app = express();
const bp = require('body-parser');
const randomWord = require('random-words');
const defineWord = require('define-word');
const Sequelize = require('sequelize');
const models = require('./models');
require('dotenv').config();
const PORT = process.env.PORT || 8080;

app.use(express.static('logic'));
app.use(express.static('css'));

app.use(bp.urlencoded({ extended: false }))
app.use(bp.json())

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/word', (req, res) => {
  let rWord = randomWord(25);
  new Promise((resolve, reject) => {
    if (rWord) {
      resolve(rWord);
    } else {
      reject('No words!');
    }
  }).then((words) => {
    return words.map((word) => {
      return {
        word: word,
        definition: defineWord.define(word)
      }
    })
  }).then((wordsArr) => {
    res.json(wordsArr);
  });
});

app.post('/saveWordData', (req, res) => {
  let wordData = req.body;
  console.log(req.body)

});

// models.sequelize.sync().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Listening on port ${PORT}`);
//   });
// });
models.sequelize.sync({force: true}).then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});