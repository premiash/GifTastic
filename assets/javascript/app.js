
      
      var animals = ["Cow", "Cat", "Puppy", "Parrot"];
    
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
            arr = [];
            $("#displayImages").html("");
            displayAnimalImages(0, tagName)
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

      var arr = [];
      var queryURL = "";
      var displayAnimalImages = function(count, tagName) {
        if (count == 11) {
          console.log("runRequests Success", arr);
          var imgTags = "";
          for(i=0; i<10; i++)
          {
             imgTags += "<img data-gifffer='"+ arr[i].data.image_url  +"' data-gifffer-width='250' data-gifffer-height='150'/>"
          }
          $("#displayImages").html(imgTags); //https://media.giphy.com/media/3o8doVAxrMjXbIHaU0/giphy.gif
          Gifffer();
          return;
        }

        queryURL = "http://api.giphy.com/v1/gifs/random?tag=" + tagName + "&api_key=dc6zaTOxFJmzC&limit=10&rating=";
        //var queryURL = "http://api.giphy.com/v1/gifs/random?tag=puppy&api_key=dc6zaTOxFJmzC";
        $.ajax({
          url: queryURL,
          success: function(data) {
            arr.push(data);
          },
          error: function() {
            arr.push({});
            console.error("runRequests Error", "tag", arguments);
          },
          complete: function() {
            displayAnimalImages(++count, tagName);
          }
        });
      };

      renderButtons();
