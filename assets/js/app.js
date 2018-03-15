
//add search buttons

var searchTerms = ["cats", "dogs", "tom cruise"];


function displayGif() {

    var gifphy = $(this).attr("data-term");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifphy + "&api_key=F8DRJ0vZs1qwFnH1l0lxbNIPRE0ZI7gN&limit=10";

    // Creates AJAX call for the specific search term button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        //store the gif data points
        var results = response.data;

        var bootstrapDiv = $("<div class= 'card-group'>");
          for (var i = 0; i < results.length; i++) {
            
            var gifDiv = $("<div class='item card'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var gifImage = $("<img class='giphy card-img-top'>");
            gifImage.attr("src", results[i].images.fixed_height.url);
            
            //adds a data-state attribute set to animate
            gifImage.attr("data-state", "animate");
            //add a data-still attribute with the fixed_height_still url
            gifImage.attr("data-still", results[i].images.fixed_height_still.url);
            //add the animated url as data-animate attribute
            gifImage.attr("data-animate", results[i].images.fixed_height.url);

            gifDiv.prepend(p);
            gifDiv.prepend(gifImage);

           // $("#giphyDump").prepend(gifDiv);

           
          bootstrapDiv.prepend(gifDiv);
          $("#giphyDump").prepend(bootstrapDiv);
          };

          
      })
    }

  // Function for displaying giphy data
  function renderButtons() {

    // Deletes the search prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#searchButtons").empty();

    // Loops through the array of movies
    for (var i = 0; i < searchTerms.length; i++) {

      // Then dynamicaly generates buttons for each search term in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adds bootstrap classes and class gif to buttons
      a.addClass("btn btn-secondary gif");
      // Added a data-attribute
      a.attr("data-term", searchTerms[i]);
      // Provided the initial button text
      a.text(searchTerms[i]);
      // Added the button to the searchButtons div
      $("#searchButtons").append(a);
    }
  }

  // This function handles events where the submit button is clicked
  $("#gifSubmit").on("click", function(event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var search = $("#gif-input").val().trim();

    // The search term from the textbox is then added to our array
    searchTerms.push(search);

    // Calling renderButtons which handles the processing of our searchTerms array
    renderButtons();

  });


//PAUSE&ANIMATE FUNCTIONALITY
  $(document).on("click", ".giphy", function(){
    
    console.log(this);
    //store the first data state value
    var state = $(this).attr("data-state");
    console.log(state);
    if(state === "animate"){
        //change the data state to still
        console.log("im in the if statement");
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
    if(state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }

  });

  // Adding click event listeners to all elements with a class of "gif"
  $(document).on("click", ".gif", displayGif);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();


