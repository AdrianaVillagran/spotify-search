// wait for DOM to load before running JS


$(document).on('ready', function() {

  // check to make sure JS is loaded
    console.log('JS is loaded!');


    $('form').on("submit", function handleClick(event) {
      event.preventDefault();
      $('#results').empty();
      getSongs();
    });

    var source = $('#tracks-template').html();
    var template = Handlebars.compile(source);

    function onSuccess(data) {
      var trackResults = data.tracks.items;
      console.log(trackResults);

      var trackHtml = template({ tracks: trackResults });
      $('#results').append(trackHtml);
    }

    function onError(xhr, status, errorThrown) {
        alert("Sorry, that's not a song. Try again!");
    }

    function getSongs() {
          $.ajax({
              method: "GET",
              url: "https://api.spotify.com/v1/search?type=track",
              data: $("form").serialize(),
              success: onSuccess,
              error: onError
          });
    }


});
