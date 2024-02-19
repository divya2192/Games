let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let gameOver = false;
let turnO = true; // playerX, playerO
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const handlingclick = (box) => {
    box.addEventListener("click", () => {
        if (!gameOver && box.innerText === "") {
            if (turnO) { //player O
                box.innerText = "O";
                turnO = false;
            } else { //playerX
                box.innerText = "X";
                turnO = true;
            }
            box.disabled = true;
            checkWinner();
        }
    });
};

boxes.forEach(handlingclick);

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                gameOver = true;
                displayWinner(pos1Val);
                return;
            }
        }
    }
    // Check if the game is a draw
    if ([...boxes].every(box => box.innerText !== "")) {
        gameOver = true;
        displayWinner("Draw");
    }
};

const displayWinner = (winner) => {
    if (winner === "Draw") {
        msg.textContent = "It's a Draw!";
    } else {
        msg.textContent = `${winner} wins!`;
    }
    msgContainer.classList.remove("hide");
    resetBtn.style.display = "none"; // Hide Reset Game button
    newGameBtn.style.display = "block";
};

resetBtn.addEventListener("click", () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
    msgContainer.classList.add("hide");
    gameOver = false;
    turnO = true;
    resetBtn.style.display = "block";
    newGameBtn.style.display = "none";
});

newGameBtn.addEventListener("click", () => {
    // Reset the board and any other game state
    resetBtn.click();
});
