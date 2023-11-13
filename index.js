
const cell= document.querySelectorAll('.cell');
const statusText = document.querySelector('#statusText');
const restartBtn = document.querySelector('#restartBtn');

const winCondition = [[0,1,2],[0,3,6], [0,4,8], [1,4,7], [2,5,8],[3,4,5], [6,7,8], [3,5,7]];

let options= ["","", "", "", "","", "","",""];

let currentPlayer= 'X';
let running = false;

initializeGame();

function initializeGame(){
    running = true;

    cell.forEach((c)=>{
        c.addEventListener('click', cellClicked)
    })

    restartBtn.addEventListener('click', restartGame);

    statusText.textContent = `${currentPlayer}'s Turn`
}

function cellClicked(){
    const cellIndex= this.getAttribute("cellIndex"); 
    if(options[cellIndex]!="" || !running)
        return;

    updateCell(this, cellIndex);
}

function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
    checkWinner();
}

function changePlayer(){
    currentPlayer= currentPlayer=='X'? "O" : 'X';
    statusText.textContent = `${currentPlayer}'s turn`
}

function checkWinner(){

    let roundWon= false;
    winCondition.forEach((ele,index)=>{
        console.log(ele);
        let flag=0;
        ele.forEach((now)=>{
            console.log(now, ele[0]);
            if(options[now]=="" || options[now]!=options[ele[0]]){
                flag=1;
            }
        })
        if(!flag){
            roundWon= true;
        }
    })

    if(roundWon){
        statusText.textContent=`${currentPlayer} wins!!`;
        running = false;
    }else if(!options.includes("")){
        statusText.textContent = `Game Drawn!`
        running = false;
    }else{
        changePlayer();
    }

}

function restartGame(){
    currentPlayer='X';
    options= ["","", "", "", "","", "","",""];
    statusText.textContent= `${currentPlayer}'s turn`;
    cell.forEach(c=>{
        c.textContent= "";
    })
    initializeGame();
}