let emojis = (function($){
  $.ajax({
    type: "GET",
    url: "./emojis.json",
    success: (res) => {
      db.emojis = res;
    }
  });
})($)
