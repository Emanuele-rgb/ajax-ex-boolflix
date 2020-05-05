/**
 * WELCOME TO MOMENT JS
 */
$(document).ready(function () {

    /**
     * SETUP
     */




}); // <-- End doc ready
var source = $('#movie-template').html();
var template = Handlebars.compile(source);
var button = $(".button");
var searchInput = $('#searchText');
var movieList = $('#movie-list')


button.click(function(query){

  var query = searchInput.val().trim()

  console.log(query)

  $.ajax({
        url: 'https://api.themoviedb.org/3/search/movie',
        method: 'GET',
        data: {
            api_key: '222844e50d27287b88da26be96b19b31',
            query: query,
            language: 'it_IT'

        },
        success: function(response) {

          var movies = response.results;

          if(movies.length > 0) {

            print(template, movies, movieList)

          } else {
            alert('Nessun film trovato')
            searchInput.select()
          }


        console.log(response)
        console.log(context)

        //compilare e aggiungere template

        },


       error: function() {
           console.log('Errore chiamata api');

       }});

})



function print(template, movies, container){

  reset(container);

  for(var i=0; i < movies.length; i++) {

    var movie = movies[i];

  var context = {
    title: movie.title,
    originalTitle: movie.original_title,
    language: movie.original_language,
    vote: movie.vote_average
};


var html = template(context);
container.append(html);
}
}

function reset(element){
  element.html('');
}
