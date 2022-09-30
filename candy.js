let candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];
let board =[];
let rows= 9;
let columns = 9;
let score =0;

let currTile ="";
let otherTile ="";


let boardBox= document.getElementById("board");

window.onload = ()=>{
    startGame();
};

const randomCandy =() =>{
    return candies[Math.floor(Math.random()*candies.length)]; //0 -5.99
}

const startGame =()=>{
    for(let r=0; r<rows; r++){
        let row=[];
        for(let c=0; c<columns; c++){
            let tile= document.createElement("img");
            tile.id=r.toString() + "-"+ c.toString();
            tile.src="./images/"+randomCandy()+".png";
            
            //DRAG FUNCTION
            tile.addEventListener("dragStart", dragStart); //click on Candy, initialize drag process
            tile.addEventListener("dragover", dragOver); //clicking on Candy, moving mouse to drag the candy
            tile.addEventListener("dragenter", dragEnter); //dragging candy onto another candy
            tile.addEventListener("dragleave", dragLeave); // leave candy over another candy
            tile.addEventListener("drop", dragDrop); //dropping a candy over another candy
            tile.addEventListener("dragend", dragEnd); // after drag process completed, we swap candies

            boardBox.append(tile);
            row.push(tile);
        }
        board.push(row);
    }
    console.log(board);
}

const dragStart = () =>{
    currTile = this;
}

const dragOver = (e)=>{
    e.preventDefault();
}

const dragEnter = (e)=>{
    e.preventDefault();
}

const dragLeave = () =>{

}

const dragDrop = () =>{
    otherTile = this;
}

const dragEnd = () =>{
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;    

}