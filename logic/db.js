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
          gameLogic.words[j].def = res.def;
        }
      })
    }
  }
})($)
