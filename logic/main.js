let main = (function($, window, document){

  //fire the game
  $('.startGame').click(() => {
    $.ajax({
      type: "GET",
      url: "/gameSessionInfo",
      success: (res) => {
        gameLogic.id = res.id
      }
    })
    $('.startGame').hide();
    gameLogic.randomWord();
  });

})($, window, document, undefined);
