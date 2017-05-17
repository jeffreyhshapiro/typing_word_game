let db = (function($) {
  return {
    saveRound: (wordData) => {
      $.ajax({
        type: "POST",
        url: '/saveWordData',
        data: {words: wordData},
        success: (res) => {
          console.log('success');
        }
      });
    },
    wordDefinition: (word, j) => {
      $.ajax({
        type: "GET",
        url: `/defineWord?word=${word}`,
        success: (res) => {
          if (!!res.def) {
            gameLogic.words[j].def = res.def;
          } else {
            //TODO add table for words without definitions
            gameLogic.words[j].def = `We currently don't have a definition for ${gameLogic.words[j].word}, but we will have one soon! ${db.emojis['100']} ${db.emojis['curry']} ${db.emojis['v']}`;
          }
        }
      })
    }
  }
})($)
