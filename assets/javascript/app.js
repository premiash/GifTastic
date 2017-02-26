
      
      var animals = ["Cow", "Cat", "Puppy", "Parrot", "Rooster", "Lion", "Panther", "Monkey"];
    
      function renderButtons() {

        $("#animals-view").empty();

        for (var i = 0; i < animals.length; i++) {

          var a = $("<button>");
          // Adding a class
          a.addClass("animal");
          // Added a data-attribute
          a.attr("data-name", animals[i]);
          // Provided the initial button text
          a.text(animals[i]);
          // Added the button to the HTML
          $("#animals-view").append(a);

          a.attr("id", animals[i]);

          $("#"+animals[i]).click(function(event) {

            tagName = $(event.target).attr("id");

            $("#displayImages").html("");
            
            searchGiffy(tagName)
          });
        }
      }
        
      // This function handles events where one button is clicked
      $("#add-animal").on("click", function(event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var animal = $("#animal-input").val().trim();
        $("#animal-input").val("");

        // The movie from the textbox is then added to our array
        animals.push(animal);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

      var queryURL = "";
      var searchGiffy = function(tagName) {

        queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
                    tagName + "&api_key=dc6zaTOxFJmzC&limit=10";
        $.ajax({
          url: queryURL,
          method: "GET",
          success: function(response) {
            displayAnimalGifs(response.data);
          },

        });
      };

      var stillImageUrls = [];
      var gifUrls = [];
      var displayAnimalGifs = function(data)
      {
          var gifSection;
          stillImageUrls = [];
          gifUrls = [];
          for(i=0; i<data.length; i++)
          {
            stillImageUrls.push(data[i].images.downsized_still.url);
            gifUrls.push(data[i].images.fixed_height.url);

             gifSection = $("<div class='search-result-item'><div><p>Rating:"+ data[i].rating +"</p>" + 
                            "<img id='" + i + "' src='"+ stillImageUrls[i]  +"' data-state='still' width='250' height='150'/>" + 
                            "</div></div>");
             $("#displayImages").append(gifSection); 
             $('#'+i).click(function(event) {
                  var state = $(this).attr("data-state");
                  if(state == "still")
                  {
                    $(this).attr('src', gifUrls[this.id]);
                    $(this).attr('data-state', 'animate');
                  }
                  else
                  {
                    $(this).attr('src', stillImageUrls[this.id]);
                    $(this).attr('data-state', 'still');
                  }
             });
          }
          return;
      }

      renderButtons();
