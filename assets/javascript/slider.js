let piecesPerSide = 5;


function initGame() {
    for (let i = 0; i < piecesPerSide; i++) {
        let newRow = $("<tr>").addClass("row");
        for (let j = 0; j < piecesPerSide; j++) {
            let newPiece = $("<td>").addClass("piece");
            newPiece.attr("data-row", i);
            newPiece.attr("data-col", j);
            newPiece.css("background-position", `${-j*100}px ${-i*100}px`);
            newPiece.text()
            if (i === piecesPerSide-1 && j === piecesPerSide-1) {
                newPiece.addClass("empty");
                newPiece.text("");
            } else {
                newPiece.text(piecesPerSide*i + j);
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
                $(this).removeAttr('style'); // reset the animation
                $(".empty").text($(this).text());
                $(".empty").removeClass("empty");
                $(this).text("");
                $(this).addClass("empty");  
            }
        );
        
    } 

});