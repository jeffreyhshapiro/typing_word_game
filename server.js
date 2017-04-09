const express = require('express');
const app = express();
const session = require('express-session');
const ip = require('request-ip');
const os = require('os');
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
    sid: req.sessionID,
    ip: ip.getClientIp(req) || 'IP NOT DETECTED',
    os: os.type() || 'OS NOT DETECTED',
    times_played: 1
  }).save().then((data) => {
    let options = {
      "root": __dirname,
      headers: {
        "x-sid": data.id
      }
    }
    res.sendFile('/index.html', options, (err) => {
      if (err) {
        res.send(err)
      }
    });
  }).catch((e) => {
    res.send(`Unfortunately, Typefall has fallen- please check back later! Error code: ${e}`);
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
