let candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];
let board =[];
let rows= 9;
let columns = 9;
let score =0;

let currTile;
let otherTile;

const boardBox = document.getElementById("board");
let scoreText =document.getElementById("score").innerHTML;

window.onload = ()=>{
    startGame();
    window.setInterval(crushCandy(), 100);

};

const randomCandy =() =>{
    return candies[Math.floor(Math.random()*candies.length)]; //0 -5.99
}


// https://github.com/ImKennyYip/candy-crush/blob/master/candy.js
// https://www.youtube.com/watch?v=8yIKZQMGi0A

const startGame =()=>{
    for(let r=0; r<rows; r++){
        let row=[];
        for(let c=0; c<columns; c++){
            let tile= document.createElement("img");
            tile.id=r.toString() + "-"+ c.toString();
            tile.src="./images/"+randomCandy()+".png";

                //DRAG FUNCTIONALITY
                tile.addEventListener("dragstart", dragStart); //click on a candy, initialize drag process
                tile.addEventListener("dragover", dragOver);  //clicking on candy, moving mouse to drag the candy
                tile.addEventListener("dragenter", dragEnter); //dragging candy onto another candy
                tile.addEventListener("dragleave", dragLeave); //leave candy over another candy
                tile.addEventListener("drop", dragDrop); //dropping a candy over another candy
                tile.addEventListener("dragend", dragEnd); //after drag process completed, we swap candies
            
            boardBox.append(tile);
            row.push(tile);
        }
        board.push(row);
    }
    console.log(board);
}

const dragStart = (event) =>{
    currTile = event.target;
}

const dragOver = (e)=>{
    e.preventDefault();
}

const dragEnter = (e)=>{
    e.preventDefault();
}

const dragLeave = () =>{

}

const dragDrop = (event) =>{
    otherTile = event.target;
}

const dragEnd= (event)=> {
    if(currTile.src.includes("blank")||otherTile.src.includes("blank")){
        return;
    }
   
    let currCords = currTile.id.split("-");
    let r =parseInt(currCords[0]);
    let c =parseInt(currCords[1]);

    let otherCords = otherTile.id.split("-");
    let r2=parseInt(otherCords[0]);
    let c2 =parseInt(otherCords[1]);

    let moveLeft= c2==c-1 && r ==r2;
    let moveRight= c2==c+1 && r ==r2;

    let moveUp= r2==r-1 && c ==c2;
    let moveDown= r2==r+1 && c ==c2;

    let isAdjacent = moveDown||moveLeft||moveRight||moveUp;

    if(isAdjacent){
        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg; 
        let validMove = checkValid();
        if(!validMove){
            let currImg = currTile.src;
            let otherImg = otherTile.src;
            currTile.src = otherImg;
            otherTile.src = currImg; 
        }else{
            crushCandy();
        }

    }
        
}

const crushCandy = ()=>{
    //crushFive();
    //crushFour();
    crushThree();
    console.log(scoreText);
    console.log(score);
    scoreText = String(score);
    console.log(scoreText);
}

const crushThree = ()=>{
    //check rows
    for(let r=0;r<rows;r++){
        for(let c=0; c<columns-2;c++){
            let candy1=board[r][c];
            let candy2=board[r][c+1];
            let candy3=board[r][c+2];
            if(candy1.src==candy2.src && candy2.src==candy3.src&&!candy1.src.includes("blank")){
                candy1.src ="./images/blank.png";
                candy2.src ="./images/blank.png";
                candy3.src ="./images/blank.png";
                score += 30;
            }
        }
    }
    //check columns
    for(let c=0;c<columns;c++){
        for(let r=0; r<rows-2;r++){
            let candy1=board[r][c];
            let candy2=board[r+1][c];
            let candy3=board[r+2][c];
            if(candy1.src==candy2.src && candy2.src==candy3.src&&!candy1.src.includes("blank")){
                candy1.src ="./images/blank.png";
                candy2.src ="./images/blank.png";
                candy3.src ="./images/blank.png";
                score += 30;
            }
        }
    }
}

const checkValid = ()=>{
    //check rows
    for(let r=0;r<rows;r++){
        for(let c=0; c<columns-2;c++){
            let candy1=board[r][c];
            let candy2=board[r][c+1];
            let candy3=board[r][c+2];
            if(candy1.src==candy2.src && candy2.src==candy3.src&&!candy1.src.includes("blank")){
                return true;
            }
        }
    }
    //check columns
    for(let c=0;c<columns;c++){
        for(let r=0; r<rows-2;r++){
            let candy1=board[r][c];
            let candy2=board[r+1][c];
            let candy3=board[r+2][c];
            if(candy1.src==candy2.src && candy2.src==candy3.src&&!candy1.src.includes("blank")){
                return true;
            }
        }
    }
    return false;

}