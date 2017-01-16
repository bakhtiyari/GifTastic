$(document).ready(function() {

	var movies = ["Rushmore", "Midnight Cowboy", "Napoleon Dynamite", "Fight Club"];

	renderButtons();

	function renderButtons(){ 
		$("#moviesButtons").empty();
		for (var i = 0; i < movies.length; i++){
		    var aButton = $("<button>");
		    aButton.addClass("btn btn-info");
		    aButton.attr("data-movie", movies[i]);
		    aButton.text(movies[i]);
		    $("#moviesButtons").append(aButton);
		}   
	}

	$("#addMovie").on("click", function(){
		var movieTitle = $("#movieName").val().trim();
		if(movieTitle !== "") {
		    movies.push(movieTitle);
            $("#movieName").val("");
        }
		renderButtons();
		return false;
	});

    $(document).on("click", ".btn", function() {
    	var movieTitle = $(this).attr("data-movie");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        movieTitle + "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg-13";
        $.ajax({
        	url: queryURL,
        	method: "GET"
        })
        .done(function(response) {
        	var results = response.data;
    	    for (var i = 0; i < results.length; i++) {
                var animalDiv = $("<div>");
                animalDiv.addClass("gifBlock");
                var p = $("<p>").text("Rating: " + results[i].rating);
                var animalImage = $("<img>");
                animalImage.addClass("gif");
                animalImage.attr({
                    "src": results[i].images.original_still.url,
                    "data-still": results[i].images.original_still.url,
                    "data-animate": results[i].images.original.url,
                    "data-state": "still"
                });
                animalDiv.append(animalImage);
                animalDiv.append(p);
                $("#movieGifs").prepend(animalDiv);
        	}
        });
    });

    $(document).on("click", ".gif", function() {          
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr({
                "src": $(this).attr("data-animate"),
                "data-state": "animate"
            });
        }
        else {
            $(this).attr({
                "src": $(this).attr("data-still"),
                "data-state": "still"
            });
        }
    });

});