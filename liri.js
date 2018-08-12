// require("dotenv").config();

// var spotify = new Spotify(keys.spotify);
//var client = new Twitter(keys.twitter);




var Twitter = require('twitter');
var spotify = require('node-spotify-api');
var request = require('request');
var keys = require("./keys");
var client = new Twitter(keys.twitter);


// grap data from keys 
var keys = require ('./keys.js');
// take in command line arguments
var arguments1 = process.argv;
var arguments2 = process.argv[2];

// A variable to hold our data
var data ="";

// capture all data 
for ( var i =3; i < arguments1.length; i++ ){
    data = data + "" + arguments1[i];

}


// twitter
displayTweets = function(){

var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for (var i = 0; i <tweets.length; i++){
      var date = tweets[i].created_at;
      console.log(tweets[i].text);
      console.log("created at" + date);
      }
   
  }
  else {
    console.log(error);
  }
});

}

searchSpotifySong = function (){
// spotify 
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data); 
  });
}




omdbMovie = function (){
  
   var omdbURL = "http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy";
// Then run a request to the OMDB API with the movie specified
 request(omdbURL, function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("The movie's rating is: " + JSON.parse(body));
  }
});

}


if (arguments2==='my-tweets'){
  displayTweets();
}
else if(arguments2=='spotify-this-song'){
  searchSpotifySong();
}
else if(arguments2 ==='movie-this'){
  omdbMovie();
}