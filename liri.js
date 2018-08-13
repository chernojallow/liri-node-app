require("dotenv").config();



var fs = require('fs');
var Twitter = require('twitter');
var spotify = require('node-spotify-api');
var request = require('request');
var keys = require("./keys.js");
var client = new Twitter(keys.twitter);
var spotify = new spotify(keys.spotify);




// take in command line arguments
var arguments1 = process.argv;
var arguments2 = process.argv[2];

// A variable to hold our data
var data = "";

// capture all data 
for (var i = 3; i < arguments1.length; i++) {
  data = data + "" + arguments1[i];

}


// function to display last 20 tweets
var displayTweets = function () {

  var params = { screen_name: 'nodejs' };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        var date = tweets[i].created_at;
        console.log(tweets[i].text + "Created At:" + date.substring(0, 19));
        console.log("-------------");

        //fs.appendFile('log.txt', tweets[i].text);
      }

    }
    else {
      console.log(error);
    }
  });

}

var searchSpotifySong = function (song) {
  // spotify 
  spotify.search({ type: 'track', query: song }, function (err, data) {
    if (!err) {
      for (var i = 0; i < data.tracks.items.length; i++) {
        dataSong = data.tracks.items[i];

        console.log("Artist:" + dataSong.artists[0].name);
        console.log("song:" + dataSong.name);
        console.log("Preview URL :" + dataSong.preview_url);
        console.log("--------------------");

      }

    }
    else {
      console.log("Error occured");
    }
  });
}




var omdbMovie = function (movie) {
  var omdbURL = 'http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&tomatoes&apikey=trilogy'
 // var omdbURL = 'http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&tomatoes=trilogy';
  // Then run a request to the OMDB API with the movie specified
  request(omdbURL, function (error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {
      var jsonn = JSON.parse(body);
      console.log("Title of movie: " + jsonn.Title);
      console.log("The year the movie came out: " + jsonn.Year);
      console.log("IMDB Rating of the movie:" + jsonn.imdbRating);
      console.log("Rotten Tomatoes Rating of the movie:" + jsonn.tomatoRating);
      console.log("Country where the movie was produced:" + jsonn.Country);
      console.log("Language of the movie:" + jsonn.Language);
      console.log("Plot of the movie:" + jsonn.Plot);
      console.log("Actors in the movie" + jsonn.Actors);

      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      //console.log("The movie's rating is: " + JSON.parse(body));
    }
      else {
       console.log('Erro occured');
     }
    if (movie === null) {
        movie = "Mr. Nobody";
      console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
      console.log("It's on Netflix!");
    }
  });

}


var doWhatItSays = function (userInput) {
  if (userInput === "") {

  }

}


if (arguments2 === 'my-tweets') {
  displayTweets();
}
else if (arguments2 == 'spotify-this-song') {
  if (data) {
    searchSpotifySong(data);

  } else {
    searchSpotifySong("Movado Forever");
  }
}
else if (arguments2 === 'movie-this') {
  if(data) {
  omdbMovie(data);
} else{
    omdbMovie("Mr. NoBody");
}
}
else if (arguments2 === "do-what-it-says") {
  doWhatItSays();
}
else {
  console.log("{Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says}");
}