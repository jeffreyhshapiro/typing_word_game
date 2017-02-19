const c = document.getElementById('typingGame');
const context = c.getContext('2d');
const height = c.height;
const width = c.width;
let dHeight = 0;
let dWidth = 0;
let self = this;

const words = "hand,wrong,late,fang,clip,rub,perfect,private,guitar,grape,quaint,stupid";

const wordOptions = words.split(',');

const chooseWord = () => {
  const arrayLength = wordOptions.length - 1;
  const anyIndex = Math.floor(Math.random() * arrayLength);
  return wordOptions[anyIndex];
}

function newWord(word) {
  this.word = word;
  activateWord(this.word);
  attachKeyPress(this.word);
}

function activateWord(activated) {
  context.font="20px Arial";
  context.fillStyle = "#000000";
  self.slideDown = setInterval(() => {
    context.clearRect(0, 0, width, height);
    if (dHeight < height) {
      dHeight += 1;
      context.fillText(activated,width/2, dHeight);
    } else {
      context.fillText('Game over!',width/2, height/2);
    }
  }, 20)
}

function attachKeyPress(word) {
  let i = 0;
  $(document).keypress((e) => {
    if (e.keyCode === word.charCodeAt(i)) {
      $("#lettersTyped").text(word[i]);
      i++
      checkForCompletion(i, word)
    }
  });
}

function checkForCompletion(i, word) {
  if (i === word.length) {
    getNewWord();
  }
}

function getNewWord() {
  wordChoice();
}

function wordChoice() {
  context.clearRect(0, 0, width, height);
  dHeight = 0;
  clearInterval(self.slideDown);
  new newWord(chooseWord());
}

wordChoice();
