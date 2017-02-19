const c = document.getElementById('typingGame');
const context = c.getContext('2d');
const height = c.height;
const width = c.width;
let dHeight = 0;
let dWidth = 0;
let metadata = {};
metadata.j = 0;
let words = [];

function randomWord() {
  $.ajax({
    url: '/word',
    success: (res) => {
      wordChoice(res.word)
    }
  });
}

function newWord(word) {
  this.word = word;
  activateWord(this.word);
  attachKeyPress(this.word);
  wordsSeen(this.word);
}

function activateWord(activated) {
  context.font="20px Arial";
  context.fillStyle = "#000000";
  metadata.slideDown = setInterval(() => {
    context.clearRect(0, 0, width, height);
    if (dHeight < height) {
      dHeight += metadata.j;
      context.fillText(activated,width/2, dHeight);
    } else {
      context.fillText('Game over!',width/2, height/2);
      $(words).each(function(i, val) {
        $("#wordsSeen").append(`<a href="http://dictionary.cambridge.org/us/dictionary/english/${val}" target="_blank">${val}</a> `);
        clearInterval(metadata.slideDown);
      });
    }
  }, 20);
  metadata.j++
}

function attachKeyPress(word) {
  let i = 0;
  $(document).keypress((e) => {
    if (e.keyCode === word.charCodeAt(i)) {
      $("#lettersTyped").append(word[i]);
      i++
      checkForCompletion(i, word)
    }
  });
}

function checkForCompletion(i, word) {
  if (i === word.length) {
    $("#lettersTyped").append("\n");
    randomWord();
  }
}

function wordChoice(word) {
  context.clearRect(0, 0, width, height);
  dHeight = 0;
  clearInterval(metadata.slideDown);
  new newWord(word);
}

function wordsSeen(word) {
  words.push(word);
}

randomWord();
