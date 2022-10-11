let candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];
const scores = [2020, 1930, 1850, 1770, 1600]
let board =[];
let rows= 9;
let columns = 9;
let score =0;
let turns = 10;

let currTile;
let otherTile;

let octSize;

const boardBox = document.getElementById("board");
const players = document.querySelectorAll("h2");
const game = document.querySelector("game");
let playbutton = document.getElementById("play");
let popup = document.getElementById("gameOver");

window.onload = ()=>{

    
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
            
            turns-=1;
            if(turns<=0){
                playAudio("divine");
                endGame();
            }else{
                playAudio("sweet");
            }
        }

    }
        
}

const crushCandy = ()=>{
    crushThree();
    document.getElementById("score").innerHTML = String(score);
    document.getElementById("turn").innerHTML = String(turns);
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
    if(turns<=0){
        return false;
    }
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

const getRandomUserOne=(numUsers)=>{
    for(let i=0; i<numUsers; i++){
        fetch('https://randomuser.me/api/')
        .then((response)=> response.json())
        .then((data)=> document.querySelectorAll('h2')[i].innerHTML =`${data.results[0].name.first} ${data.results[0].name.last} : ${scores[i]}`)
        .catch((error)=>console.log(error));
    }
}

const endGame=()=>{
    /*display final score and close button */
    popup.innerHTML = `Your Scored ${score} !!!`;
    popup.style.visibility = "visible";
    playbutton.innerText =`Play Again`;
    playbutton.style.visibility= "visible";
}

playbutton.addEventListener('click', (event)=>{
    if(playbutton.innerText==='Play Again'){
        location.reload();
    }
    playbutton.style.visibility= "hidden";
    startGame();
    getRandomUserOne(players.length);
    window.setInterval(function(){crushCandy(), slideCandy(), generateCandy()}, 100);
});

const playAudio = (audio)=>{
    console.log(audio);
    document.getElementById(audio).play();
}