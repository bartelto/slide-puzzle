let piecesPerSide = 5;


function initGame() {
    for (let r = 0; r < piecesPerSide; r++) {
        let newRow = $("<tr>").addClass("row");
        for (let c = 0; c < piecesPerSide; c++) {
            let newPiece = $("<td>").addClass("piece");
            newPiece.attr("data-row", r);
            newPiece.attr("data-col", c);
            //newPiece.css("background-position", `${-c*100}px ${-r*100}px`);
            newPiece.text()
            if (r === piecesPerSide-1 && c === piecesPerSide-1) {
                newPiece.addClass("empty");
                newPiece.text("");
            } else {
                newPiece.text(piecesPerSide*r + c);
            }   
            newRow.append(newPiece);
        }   
        $("#puzzle").append(newRow);    
    }

}


if ($(document).ready()) {
    initGame();
}

$(".piece").on("click", function(event) {
    //console.log("clicked: " + $(this).text());
    let rowClicked = $(this).attr("data-row");
    let colClicked = $(this).attr("data-col");
    let rowEmpty = $(".empty").attr("data-row");
    let colEmpty = $(".empty").attr("data-col");

    if ((rowClicked === rowEmpty && Math.abs(colClicked - colEmpty) === 1) ||
        (colClicked === colEmpty && Math.abs(rowClicked - rowEmpty) === 1)) {
        
        let move = "";
        if (rowClicked > rowEmpty) {
            move = {top: "-=102"};
        } else if (rowClicked < rowEmpty){
            move = {top: "+=102"};
        } else if (colClicked > colEmpty){
            move = {left: "-=102"};
        } else if (colClicked < colEmpty){
            move = {left: "+=102"};
        }

        $(this).animate( move, 300,
            function () { 
                $(this).css("top","").css("left", "");// reset the sliding animation
                $(".empty").css("background-image", $(this).css("background-image"));
                $(".empty").css("background-position", $(this).css("background-position"));
                $(".empty").css("background-size", $(this).css("background-size"));
                $(".empty").text($(this).text());
                $(".empty").removeClass("empty");
                $(this).text("");
                $(this).addClass("empty");
                $(this)
                    .css("background-image","")
                    .css("background-position","")
                    .css("background-size","");

            }
        );
        
    } 

});

$("#choose-image").click( function(event) {
    event.preventDefault();
    console.log("choosing image");
    let puzzleImage = new Image();
    puzzleImage.src = $("#image-url").val();
    console.log(puzzleImage.naturalWidth, puzzleImage.naturalHeight);

    puzzleImage.onload = function() {
        //alert(this.width + 'x' + this.height);
        $(".piece").not(".empty").css("background-image", `url(${puzzleImage.src})`);
        let imageScale =  (this.height > this.width) ? "500%" : `${500*this.width/this.height}%`;
        $(".piece").not(".empty").css("background-size", imageScale);
        for (let r = 0; r < piecesPerSide; r++) {
            for (let c = 0; c < piecesPerSide; c++) {
                $(`.piece[data-row='${r}'][data-col='${c}']`)
                    .css("background-position", `${-c*100}px ${-r*100}px`);
            }
        }
    }

});