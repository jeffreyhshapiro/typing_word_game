let gameLogic = (function($, window, document) {
  const c = document.getElementById('typingGame');
  const context = c.getContext('2d');
  context.canvas.height = window.innerHeight;
  context.canvas.width = window.innerWidth > 800 ? 800 : window.innerWidth * .7;
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
    //get an array of random words from the api
    randomWord: () => {
      $.ajax({
        url: '/word',
        success: (res) => {
          metadata.res = res;
          //loop over the array
          $(metadata.res).each((i, val) => {
            gameLogic.wordChoice(val);
            return false;
          });
        }
      });
    },
    //this is where the HTML5 canvas API starts coming into play. when ever a new word is retrieved from the array, the canvas is redrawn
    wordChoice: (word) => {
      context.clearRect(0, 0, width, height);
      dHeight = 0;
      clearInterval(metadata.slideDown);
      gameLogic.newWord(word);
    },
    //render the word to canvas, attach the key press so that the browser is listening for the correct key press, and add it to the array of words that the user has seen
    newWord: (word) => {
      gameLogic.activateWord(word.word);
      gameLogic.attachKeyPress(word.word);
      gameLogic.wordsSeen(word);
    },
    //the main part of the game action. i'm using the setInterval function to redraw the word every 20 seconds. i start by erasing the canvas, then i will either redraw the word if it hasnt hit the bottom of the screen, or i will detach all event listeners, clear the interval, and show the user their gameplay stats.
    activateWord: (activated) => {
      context.font="20px Arial";
      context.fillStyle = "#000000";
      timing.start = analytics.startTime();
      metadata.slideDown = setInterval(() => {
        context.clearRect(0, 0, width, height);
        if (dHeight < height) {
          dHeight += metadata.j / 2;
          context.fillText(activated,width/2, dHeight);
        } else {
          //the game is over
          $('body').off('keypress');
          clearInterval(metadata.slideDown);
          context.fillText('Game over!',width/2, height/2);
          $(gameLogic.words).each(function(i, val) {
            $("#wordsSeen").append(`<div class='definition' data-definition=${i}><a href="javascript:void(0);">${val.word}</a>  ${val.totalTime / 1000}s </div>`);
          });

          gameLogic.saveWordData(gameLogic.words);

          $(".definition").click(function() {
            var index = $(this).attr('data-definition');
            $(".wordDefinition").empty();
            $(".wordDefinition").prepend(`<div> <h2>${gameLogic.words[index].word}</h2> ${gameLogic.words[index].def}</div>`);
          });

          $(".restart").html("<button class='restartGame button-primary'>Restart</button>");
          $(".restartGame").click(function(){
            gameLogic.restart();
          });
        }
      }, 20);
      metadata.j++
    },
    //this function listens for the correct key press. after each key press, we check if the word has been completed.
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
    wordsSeen: (word) => {
      gameLogic.words.push(word);
    },
    //if the word if done, then get calculate the total time and then get the next word.
    checkForCompletion: (i, word) => {
      if (i === word.length) {
        $("#lettersTyped").empty();
        timing.end = analytics.endTime();
        let totalTime = analytics.calculateTotalTime(timing.start, timing.end);
        gameLogic.words[metadata.wordcount].totalTime = totalTime;
        metadata.wordcount++
        let nextWord = metadata.res[metadata.wordcount];

        db.wordDefinition(word, metadata.wordcount - 1);

        gameLogic.wordChoice(nextWord);
      }
    },
    //if the user presses the button to do another game, then everything is reset and randomword is called.
    restart: () => {
      dHeight = 0;
      metadata.j = 0;
      $('#lettersTyped').empty();
      $('#wordsSeen').empty();
      $('#definition').empty();
      $('.wordDefinition').empty();
      $('.restart').empty();
      gameLogic.words = [];
      metadata.wordcount = 0;
      gameLogic.randomWord();
    },
    //save the word data to the db
    saveWordData: (wordData) => {
      db.saveRound(wordData);
    }
  }
})($, window, document, undefined)
