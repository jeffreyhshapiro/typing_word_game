const express = require('express');
const app = express();
const session = require('express-session');
const bp = require('body-parser');
const wd = require('word-definition');
const Sequelize = require('sequelize');
const models = require('./models');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use(express.static('logic'));
app.use(express.static('css'));
app.use(express.static('emoji'));
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

app.get('/', (req, res) => {
  models.game_session.build({
    sid: req.sessionID
  }).save().then(() => {
    res.sendFile(__dirname + '/index.html');
  }).catch((e) => {
    res.send(`Unfortunately, Typefall has fallen- please check back later!`);
  });
});

app.get('/word', (req, res) => {
  models.dictionary.findAll({
    order: [
      Sequelize.fn( 'RANDOM' ),
    ],
    limit: 30
  }).then((res) => {
    return rWord = res.map((val) => {
      return {
        id: val.id,
        word: val.word
      }
    });
  }).then((wordsArr) => {
    res.json(wordsArr);
  }).catch((err) => {
    throw err;
  });
});

app.get('/defineWord', (req, res) => {
  let word = req.query.word;
  wd.getDef(word, 'en', null, (def) => {
    res.json({def: def.definition});
  })
})

app.post('/saveWordData', (req, res) => {
  let wordData = req.body;
});

app.post('/typo', (req, res) => {
  console.log(req.body)
})

models.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
