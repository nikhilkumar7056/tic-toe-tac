let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#resetButton");
let newButton = document.querySelector("#newButton");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");



let turn0 = true; //playerX,player0;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


const resetGame = () => {
    turn0 = true;
    enableBoxes();
    count = 0;
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click",() =>{
        if(turn0){ //playerO
            box.innerText = "O";
            turn0 = false;
        }else { //playerX
            box.innerText = "X";
            turn0 = true;
            box.style.color = "green";
        }
        box.disabled = true;
        count++;
        let isWinner = checkWinner();
        if(count === 9 && !isWinner){
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = `Game was a Draw`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableBoxes = () => { 
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText; 
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val != "" && pos2val != "" && pos3val != ""){
            if(pos1val === pos2val && pos2val === pos3val){
                showWinner(pos1val);
                return true;
            }
        }
    }
};

newButton.addEventListener("click",resetGame);
resetButton.addEventListener("click",resetGame);