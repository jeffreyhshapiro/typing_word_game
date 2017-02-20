const express = require('express');
const app = express();
const randomWord = require('random-words');
const defineWord = require('define-word');
const PORT = process.env.PORT || 3000;

app.use(express.static('logic'));
app.use(express.static('css'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/word', (req, res) => {
  let rWord = randomWord();
  let definition = defineWord.define(rWord);
  res.json({
    word: rWord,
    definition, definition
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
