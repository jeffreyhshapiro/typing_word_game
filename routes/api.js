// console.log('hello')
const express = require('express');
const router = express.Router();
const session = require('./session.js')
const ip = require('request-ip');
const os = require('os');
const wd = require('word-definition');
const Sequelize = require('sequelize');
const bp = require('body-parser');
const models = require('../models');
const dataHandler = require('../utility/data_handler.js');

router.use(bp.urlencoded({ extended: false }));
router.use(bp.json());

router.use('/', session);

router.get('/', (req, res) => {
  models.game_session.build({
    sid: req.sessionID,
    ip: ip.getClientIp(req) || 'IP NOT DETECTED',
    os: os.type() || 'OS NOT DETECTED',
    times_played: 1
  }).save().then((data) => {
    dataHandler.setCache('sessionID', data.id);
    // let options = {
    //   "root": __dirname,
    // }
    res.sendFile(process.cwd() + '/index.html', (err) => {
      console.log(err)
      if (err) {
        res.send(err)
      }
    });
  }).catch((e) => {
    res.send(`Unfortunately, Typefall has fallen- please check back later! Error code: ${e}`);
  });
});

router.get('/word', (req, res) => {
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

router.get('/gameSessionInfo', (req, res) => {
  res.json({id: dataHandler.getCache('sessionID')})
});

router.get('/replay', (req, res) => {
  //this is a promise in a promise. not the best way to do this, but it works for now
  let id = req.query.id;

  models.game_session.find({
    where: {
      id: id
    }
  }).then((data) => {
    times_played = data.times_played + 1;
    models.game_session.update({
      times_played: times_played
    }, {
      where: {
        id: id
      }
    }).then((data) => {
      res.json({success: true})
    }).catch((e) => {
      res.json({failure: e})
    });
  });
});

router.get('/defineWord', (req, res) => {
  let word = req.query.word;
  wd.getDef(word, 'en', null, (def) => {
    res.json({def: def.definition});
  })
})

router.post('/saveWordData', (req, res) => {
  let wordData = req.body;
});

router.post('/typo', (req, res) => {
  console.log(req.body)
});

module.exports = router;
