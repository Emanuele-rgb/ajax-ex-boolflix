
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
  search(searchInput, template, movieList)
})

searchInput.keypress(function(event){
  if(event.which == 13) {
    search(searchInput, template, movieList)
  }
});



function search(searchInput, template, movieList){

    reset(movieList);

    var apiKey = '222844e50d27287b88da26be96b19b31'
    var apiLang = 'it-IT'

    var query = searchInput.val().trim()

    console.log(query)

    var dataMovie = {
      url: 'https://api.themoviedb.org/3/search/movie',
      key: apiKey,
      query: query,
      language: apiLang,
      type: 'Film'
    }
    getData(dataMovie, template, movieList)

    var dataSerie = {
      url: 'https://api.themoviedb.org/3/search/tv',
      key: apiKey,
      query: query,
      language: apiLang,
      type: 'Tv'
    }
    getData(dataSerie, template, movieList)
}




function getData(dataMovie, template, movieList){
  $.ajax({
        url: dataMovie.url,
        method: 'GET',
        data: {
            api_key: dataMovie.key,
            query: dataMovie.query,
            language: dataMovie.lang
        },
        success: function(response) {

          var movies = response.results;

          if(movies.length > 0) {
            print(template, movies, movieList, dataMovie.type)
          } else {
            alert('Nessun contenuto trovato')
            searchInput.select()
          }
        console.log(response)
        //compilare e aggiungere template
        },
       error: function() {
           console.log('Errore chiamata api');
       }});
}


function print(template, movies, container, type){
  for(var i=0; i < movies.length; i++) {

    var movie = movies[i];

    var title, originalTitle

    if (type == 'Film') {
      title = movie.title;
      originalTitle = movie.original_title;
    } else if (type == 'Tv') {
      title = movie.name;
      originalTitle = movie.original_name;
    }

  var context = {
    title: title,
    originalTitle: originalTitle,
    language: movie.original_language,
    languageFlag: getFlag(movie.original_language),
    vote: movie.vote_average,
    votestars: getStars(movie.vote_average),
    type: type,
    poster: getPoster(movie.poster_path),
    overview: substring(movie.overview)

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
  stars ='';

  console.log(vote_rounded)

  for (var i = 1; i <= 5; i++ ){
    if (i <= vote_rounded){
      stars +='<i class="fas fa-star"></i>';
    } else {
      stars +='<i class="far fa-star"></i>';
    }
  }
return stars
}



function getFlag(language){

  var languages = [
    'en',
    'it'
  ];

  if (languages.includes(language)) {

    var flag = '<img src="img/' + language + '.svg" alt"' + language + '"class="language" />';

    return flag;

}
  return language;
}

function getPoster(poster) {

  console.log(poster)

  if (poster == null) {
    return '<img src="img/no-poster.png" alt="">';
  } else {

  return '<img src=' + 'https://image.tmdb.org/t/p/' + '/w342' + poster +'>';
}
}

function substring(overview) {

  var str = overview;
  var res = str.substr(0, 250);

  return res + '...Read more';

}
