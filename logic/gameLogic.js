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
  metadata.typo = [];

  return {
    words: [],
    randomWord: () => {
      $.ajax({
        url: '/word',
        success: (res) => {
          metadata.res = res;
          $(metadata.res).each((i, val) => {
            gameLogic.wordChoice(val);
            return false;
          });
        }
      });
    },
    wordChoice: (word) => {
      context.clearRect(0, 0, width, height);
      dHeight = 0;
      clearInterval(metadata.slideDown);
      gameLogic.newWord(word);
    },
    newWord: (word) => {
      gameLogic.activateWord(word.word);
      gameLogic.attachKeyPress(word.word);
      gameLogic.wordsSeen(word);
    },
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
          $('body').off('keypress');
          clearInterval(metadata.slideDown);
          context.fillText('Game over!',width/2, height/2);

          gameLogic.words.pop()

          $(gameLogic.words).each(function(i, val) {
            $("#wordsSeen").append(`<tr><td class='definition' data-definition=${i}><a href="javascript:void(0);">${val.word}</td>  <td>${val.totalTime / 1000}s </td></tr>`);
          });

          gameLogic.saveWordData(gameLogic.words);

          analytics.typo(metadata.typo);

          $(".definition").click(function() {
            var index = $(this).attr('data-definition');
            $(".wordDefinition").empty();
            $(".wordDefinition").prepend(`<div> <h2>${gameLogic.words[index].word}</h2> ${gameLogic.words[index].def}</div>`);
          });

          $(".restart").html("<button class='restartGame button-primary'>Restart</button>");
          $(".restartGame").click(function(){
            $.ajax({
              type: "GET",
              url: `/replay?id=${gameLogic.sid}`,
              success: (res) => {
                if (res.success === true) {
                  gameLogic.restart();
                } else {
                  $(".restart").prepend(`An error has occured, please try again later`)
                }
              }
            });
          });
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
        } else {
          let typoInfo = {
            letterPressed: String.fromCharCode(e.keyCode),
            correctLetter: word[i],
            letterIndex: i,
            typoWord: word,
            wordNumber: gameLogic.words.length,
            word_id: gameLogic.words[metadata.wordcount].id
          }
          metadata.typo.push(typoInfo);
        }
      });
    },
    wordsSeen: (word) => {
      gameLogic.words.push(word);
    },
    checkForCompletion: (i, word) => {
      if (i === word.length) {
        $("#lettersTyped").empty();
        timing.end = analytics.endTime();
        let totalTime = analytics.calculateTotalTime(timing.start, timing.end);
        gameLogic.words[metadata.wordcount].totalTime = totalTime;
        metadata.wordcount++
        let nextWord = metadata.res[metadata.wordcount];

        db.wordDefinition(word, metadata.wordcount - 1);

        $('body').off('keypress');

        gameLogic.wordChoice(nextWord);
      }
    },
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
    saveWordData: (wordData) => {
      db.saveRound(wordData);
    }
  }
})($, window, document, undefined)
