

let gameLogic = (function($, window, document) {
  const c = document.getElementById('typingGame');
  const context = c.getContext('2d');
  const height = c.height;
  const width = c.width;
  let dHeight = 0;
  let dWidth = 0;
  let metadata = {};
  let timing = {};
  metadata.wordcount = 0;
  metadata.j = 0;

  return {
    words: [],
    randomWord: () => {
      $.ajax({
        url: '/word',
        success: (res) => {
          gameLogic.wordChoice(res)
        }
      });
    },
    newWord: (word) => {
      this.word = word.word;
      gameLogic.activateWord(this.word);
      gameLogic.attachKeyPress(this.word);
      gameLogic.wordsSeen(word);
    },
    activateWord: (activated) => {
      context.font="20px Arial";
      context.fillStyle = "#000000";
      timing.start = analytics.startTime();
      metadata.slideDown = setInterval(() => {
        context.clearRect(0, 0, width, height);
        if (dHeight < height) {
          dHeight += metadata.j;
          context.fillText(activated,width/2, dHeight);
        } else {
          clearInterval(metadata.slideDown);
          context.fillText('Game over!',width/2, height/2);
          $(gameLogic.words).each(function(i, val) {
            $("#wordsSeen").append(`<div class='definition' data-definition=${i}><a href="#">${val.word}</a>  ${val.totalTime / 1000}s </div>`);
          });
          $(".definition").click(function() {
            var def = $(this).attr('data-definition');
            $(".wordDefinition").empty();
            $(".wordDefinition").prepend(`<div> Word: ${words[def].word}  <br /> ${words[def].definition.definitions[0]}</div>`)
          })
        }
      }, 20);
      metadata.j++
    },
    attachKeyPress: (word) => {
      let i = 0;
      $('body').keypress((e) => {
        if (e.keyCode === word.charCodeAt(i)) {
          $("#lettersTyped").append(word[i]);
          i++
          gameLogic.checkForCompletion(i, word)
        }
      });
    },
    checkForCompletion: (i, word) => {
      if (i === word.length) {
        $("#lettersTyped").append("\n");
        timing.end = analytics.endTime();
        let totalTime = analytics.calculateTotalTime(timing.start, timing.end);
        gameLogic.words[metadata.wordcount].totalTime = totalTime;
        gameLogic.randomWord();
        metadata.wordcount++
      }
    },
    wordChoice: (word) => {
      context.clearRect(0, 0, width, height);
      dHeight = 0;
      clearInterval(metadata.slideDown);
      gameLogic.newWord(word);
    },
    wordsSeen: (word) => {
      gameLogic.words.push(word);
    }
  }
})($, window, document, undefined)

gameLogic.randomWord();
