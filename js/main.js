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
    languageFlag: getFlag(movie.original_language),
    vote: movie.vote_average,

    votestars: getStars(movie.vote_average),
    votestarsMiss: getMissStars(movie.vote_average)


};

console.log(context)



var html = template(context);
container.append(html);
}
}

function reset(element){
  element.html('');
}

function getStars(vote_average){

  var vote_rounded = Math.ceil(vote_average / 2)
  console.log(vote_rounded)

  for (var i = 0; i < vote_rounded; i++ ){
    return '<i class="fas fa-star"></i>'.repeat(vote_rounded)
  }

}

function getMissStars(vote_average){

  var vote_rounded = Math.ceil(vote_average / 2)
  console.log(vote_rounded)

  for (var i = 0; i < vote_rounded; i++ ){
    return '<i class="far fa-star"></i>'.repeat(5-vote_rounded)
  }

}

function getFlag(language){

  if (language == 'it') {
    return 'https://lh3.googleusercontent.com/proxy/GsH5PPOYQt9csNQriTJ1cfqAOagwpH75NrVQJPTtAptv7r7PQff0ufIaUQThyX4W442aOuC06mJiwRTAlnpws2pmRrcSTRMH2E0ZgBO0uxtYng_B5LYGmY5pGxlslQ'
  } else if (language == 'en') {
    return 'https://www.lamiaestate.it/wp-content/uploads/2019/01/Bandiera-Inglese.png'
  } else {
    return 'https://lh3.googleusercontent.com/proxy/Wdzech_d9l5i_D86Lho4hoi-NB1XOop1yOyhQSCGzS7aLFSmcNfft3mCkjjQaPEqoUi5jc2wT3cKCIBgHBXKu2giH7VwUUmeZkGc1bt4lmB61cc'
  }

}
