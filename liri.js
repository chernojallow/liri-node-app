require("dotenv").config();



var fs = require('fs');
var Twitter = require('twitter');
var spotify = require('node-spotify-api');
var request = require('request');
var keys = require("./keys.js");
var client = new Twitter(keys.twitter);
//var spotify = new spotify(Keys.spotify);




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

      fs.appendFile('log.txt', tweets[i].text);
      }
   
  }
  else {
    console.log(error);
  }
});

}

searchSpotifySong = function (song){
// spotify 
spotify.search({ type: 'track', query: song }, function(err, data) {
    if (!err) {
      for (var i = 0; i <data.tracks.items.length; i++){
        dataSong = data.tracks.items[i];

        console.log("Artist:" + dataSong.artists[0].name);
        console.log("song:" + dataSong.name);
        console.log("Preview URL :"  + dataSong.preview_url);
        console.log("--------------------");

      }
  
    }
      else {
  console.log("Error occured"); 
      }
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

else if (arguments2 ==="do-what-it-says"){
   doWhatItSays();
}
else {
  console.log("{Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says}");
}