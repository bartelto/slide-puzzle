let emotions = [
    "happy",
    "sad",
    "angry",
    "excited",
    "miserable",
    "lonely",
    "suspicious",
    "bored"
];

function addButton(buttonText) {
    let newButton = $("<button>");
    newButton.val(buttonText);
    newButton.text(buttonText);
    newButton.addClass("search");
    
    $("#search-buttons").append(newButton);
}

for (let i=0; i < emotions.length; i++) {
    console.log(emotions[i]);
    addButton(emotions[i]);
}

$("#add").on("click", function() {
    event.preventDefault();
    emotions.push($("#new-button-text").val());
    addButton($("#new-button-text").val());
});

$(".search").on("click", function() {
    console.log("clicked " + $(this).val());
    queryUrl = `https://api.giphy.com/v1/gifs/search?q=${$(this).val()}&api_key=2IlH8p21NJKNOeKm9FEJ5RCQp5jNVnc8`;

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then( function(response) {
        console.log(response);
    });

});
