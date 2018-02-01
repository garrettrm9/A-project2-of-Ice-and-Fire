$(document).ready(() => {
  console.log("loading");

  const $characterSearch = $('#characterSearch');

//   if ($trainSearchForm.length) {

    $characterSearch.submit(e => {
      e.preventDefault();
      $.ajax({
        method:'get',
        data: $characterSearch.serialize(),
        dataType: "json",
        url: "https://anapioficeandfire.com/api/characters",
        success: function(data) {
          console.log(data)
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