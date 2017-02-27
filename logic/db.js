let db = (function($) {

  return {
    saveRound: (wordData) => {
      console.log('herrrr')
      $.ajax({
        type: "POST",
        url: '/saveWordData',
        data: wordData,
        success: (res) => {
          console.log('success');
        }
      });
    }
  }
})($)
