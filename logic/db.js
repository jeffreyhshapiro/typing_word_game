let db = (function($) {

  return {
    saveRound: () => {
      $.ajax{
        type: "POST",
        url: '/saveWordData',
        success: (res) => {
          console.log('success');
        }
      }
    }
  }
})($)
