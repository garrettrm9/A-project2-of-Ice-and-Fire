$(document).ready(() => {
  console.log("loading");

  const $characterSearch = $('#characterSearch');

    $characterSearch.submit(e => {
      e.preventDefault();
      const $searchInput = $('#searchInput');
      const str = jQuery.param($searchInput);
      console.log(str);
      $.ajax({
        url: "https://anapioficeandfire.com/api/characters?name" + str,
        method:'GET',
        data: $characterSearch.serialize(),
        dataType: "json",
        success: function(data) {
          console.log(data);
          const $container = $('#characterContainer');
          $container.children().remove();
          const $character = ($('<a>', {class: 'character-name', text: data[0].name, href: `/character/${data[0].name}`}));
          $container.append($character);
        }
      })
    })
  });


// If we were using a search field, we would
// send the search term along to our API here.

        // success: function(data) {
        //   // Now that we've got the data back from the server, 
        //   // we can build out the rest of the page.
        //   const $allTrainsContainer = $("#all-trains-container");
        //   $allTrainsContainer.children().remove();
        //   console.log('data', data);
        //   for (let i = 0; i < data.length; i++) {
        //     const train = data[i];
        //     const $trainElement = $("<div>", {class: "train-data"});
        //     $trainElement.append($("<a>", {text: train.name, href: `/trains/${train.name}`}));            
        //     $trainStatusElement = $("<p>");
        //     $trainStatusElement.append(train.status);
        //     $trainElement.append($trainStatusElement);
        //     $allTrainsContainer.append($trainElement);
        //   }
        // }