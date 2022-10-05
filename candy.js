let candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];
let board =[];
let rows= 9;
let columns = 9;
let score =0;

let currTile;
let otherTile;

let octSize;

const boardBox = document.getElementById("board");

window.onload = ()=>{
    startGame();
    window.setInterval(function(){crushCandy(), slideCandy(), generateCandy()}, 100);
    
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

                tile.addEventListener("dragstart", dragStart);
                tile.addEventListener("dragover", dragOver);  
                tile.addEventListener("dragenter", dragEnter);
                tile.addEventListener("dragleave", dragLeave);
                tile.addEventListener("drop", dragDrop); 
                tile.addEventListener("dragend", dragEnd);
            
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
            slideCandy();
            generateCandy();
        }

    }
        
}

const crushCandy = ()=>{
    //crushFive();
    //crushFour();
    crushThree();
    document.getElementById("score").innerHTML = String(score);
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

const slideCandy =()=>{
    for(let c=0; c<columns; c++){
        let ind=rows-1;
        for(let r=columns-1;r>=0; r--){
            if(!board[r][c].src.includes("blank")){
                board[ind][c].src=board[r][c].src;
                ind -= 1;
            }
        }

        for(let r=ind;r>=0;r--){
            board[r][c].src = "./images/blank.png";
        }
    }
}

const generateCandy =()=>{
    for(let c=0; c<columns; c++){
        if(board[0][c].src.includes("blank")){
            board[0][c].src ="./images/"+randomCandy()+".png";
        }
    }
    
}

