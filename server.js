const express = require('express');
const app = express();
const randomWord = require('random-word');
const PORT = 3000;

app.use(express.static('logic'));
app.use(express.static('css'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/word', (req, res) => {
  res.json({
    word: randomWord()
  })
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
