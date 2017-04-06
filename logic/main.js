let main = (function($, window, document){

  //fire the game
  $('.startGame').click(() => {
    $('.startGame').hide();
    gameLogic.randomWord();
  });

})($, window, document, undefined);
