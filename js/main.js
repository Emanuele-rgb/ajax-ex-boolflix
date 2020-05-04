/**
 * WELCOME TO MOMENT JS
 */
$(document).ready(function () {

    /**
     * SETUP
     */




}); // <-- End doc ready
var button = $(".button");


button.click(function(query){
  var query = document.getElementById('text').value;
  console.log(query)

  $.ajax({
        url: 'https://api.themoviedb.org/3/search/movie?api_key=222844e50d27287b88da26be96b19b31'+'&query='+ query ,
        method: 'GET',
        data: {
            title: query.title,
            original_title: query.original_title,
            original_language: query.original_language,
            vote_average: query.vote_average
        },
        success: function(data) {
          console.log(data)
        },


       error: function() {
           console.log('Errore chiamata api');

       }});

})
