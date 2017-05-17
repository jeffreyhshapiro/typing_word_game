let main = (function($, window, document){

  //fire the game
  $('.startGame').click(() => {
    $.ajax({
      type: "GET",
      url: "/gameSessionInfo",
      success: (res) => {
        gameLogic.sid = res.id
      }
    })
    $('.startGame').hide();
    gameLogic.randomWord();
  });

})($, window, document, undefined);
