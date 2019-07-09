let piecesPerSide = 5;
let puzzleWidth = 500;
let pieceSize = Math.round(puzzleWidth/piecesPerSide);


function initGame() {
    for (let r = 0; r < piecesPerSide; r++) {
        let newRow = $("<tr>").addClass("row");
        for (let c = 0; c < piecesPerSide; c++) {
            let newPiece = $("<td>").addClass("piece");
            newPiece.attr("data-row", r);
            newPiece.attr("data-col", c);
            newPiece.css("height", `${pieceSize}px`);
            newPiece.css("width", `${pieceSize}px`);
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
    
    console.log("clicked: " + $(this).text());
    let rowClicked = parseInt($(this).attr("data-row"));
    let colClicked = parseInt($(this).attr("data-col"));
    let rowEmpty = parseInt($(".empty").attr("data-row"));
    let colEmpty = parseInt($(".empty").attr("data-col"));

    if ((rowClicked === rowEmpty) || (colClicked === colEmpty)) {
        
        // classify all pieces to be moved
        let rowMax = rowClicked;
        let rowMin = rowClicked;
        let colMax = colClicked;
        let colMin = colClicked;
        if      (rowClicked > rowEmpty) rowMin = rowEmpty + 1;
        else if (rowClicked < rowEmpty) rowMax = rowEmpty - 1;
        else if (colClicked > colEmpty) colMin = colEmpty + 1;
        else if (colClicked < colEmpty) colMax = colEmpty - 1;
    
        let increment = 0;
        if (rowClicked > rowEmpty || colClicked > colEmpty) {
            increment = 1;
        } else {
            increment = -1;
        }
        // data-move = 0 --> empty spot
        
        let moveIndex = 0; // will contain the number of pieces moving
        for (let r = rowEmpty; r != rowClicked + increment; r+=increment) {
            for (let c = colEmpty; c != colClicked + increment; c+=increment) {
                //console.log(`row: ${r} col: ${c}`);
                $(`.piece[data-row='${r}'][data-col='${c}']`)
                    .addClass("moving")
                    .attr("data-move", moveIndex);
                    moveIndex++;
            }
        }

        // set animation direction
        let move = "";
        if (rowClicked > rowEmpty) {
            move = {top: `-=${pieceSize}`};
        } else if (rowClicked < rowEmpty){
            move = {top: `+=${pieceSize}`};
        } else if (colClicked > colEmpty){
            move = {left: `-=${pieceSize}`};
        } else if (colClicked < colEmpty){
            move = {left: `+=${pieceSize}`};
        }

        $(".moving").animate( move, 300,
            function () { 
                $(".piece").css("top","").css("left", "");// reset the sliding animation
                // actually move piece data

                for (let i = 0; i < moveIndex; i++) {
                    let toSpot = $(`[data-move='${i}']`);
                    let fromSpot = $(`[data-move='${i+1}']`);
                    if (i < moveIndex-1) {
                        toSpot.removeClass("empty");
                        toSpot.css("background-image", fromSpot.css("background-image"));
                        toSpot.css("background-position", fromSpot.css("background-position"));
                        toSpot.css("background-size", fromSpot.css("background-size"));
                        toSpot.text(fromSpot.text());
                    } else { // new empty spot
                        toSpot.text("");
                        toSpot.addClass("empty");
                        toSpot
                            .css("background-image","")
                            .css("background-position","")
                            .css("background-size","");
                    }
                }
                // remove move data
                $(".piece").attr("data-move", "");
                $(".piece").removeClass("moving");
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
        console.log(this.width + 'x' + this.height);
        $(".piece").not(".empty").css("background-image", `url(${puzzleImage.src})`);

        let imageScale = "";
        let offsetX = 0;
        let offsetY = 0; 
        if (this.height > this.width) {
            imageScale = `${100*piecesPerSide}%`;
            offsetY = -(100*piecesPerSide/this.width)*(this.height-this.width)/2;
        } else {
            imageScale = `${100*piecesPerSide*this.width/this.height}%`;
            offsetX = -(100*piecesPerSide/this.height)*(this.width-this.height)/2;
        }
        console.log(offsetX, offsetY);

        $(".piece").not(".empty").css("background-size", imageScale);
        for (let r = 0; r < piecesPerSide; r++) {
            for (let c = 0; c < piecesPerSide; c++) {
                $(`.piece[data-row='${r}'][data-col='${c}']`)
                    .css("background-position", `${offsetX-c*pieceSize}px ${offsetY-r*pieceSize}px`);
            }
        }
    }

});