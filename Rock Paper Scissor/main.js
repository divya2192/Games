let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const msg = document.querySelector("#msg");

const genCompChoice =()=>{ //ranIdx
    //rock paper scissor
    const options= ["rock","paper","scissor"];
    let ranIdx = Math.floor(Math.random()*3);  
    //let ranIdx = Math.round(Math.random()*3);   
    //let ranIdx = Math.floor(Math.random() * options.length);
    return options[ranIdx];
};

const drawGame = ()=>{
    msg.innerText = "Game was draw. Play again";
    msg.style.backgroundColor = "grey";
};
const showWinner = (userWin,userChoice,compChoice)=>{
    if(userWin){
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    }
    else{
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `You lose. ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red";
    }
};


const playGame = (userChoice)=>{
    //generate computer choice
    let compChoice = genCompChoice();

    if(userChoice === compChoice){
        //Draw game
        drawGame();
    }
    else{
        let userWin = true;
        if(userChoice==="rock"){
            //scissor,paper
           userWin = compChoice==="paper" ? false: true;
        }
        else if(userChoice==="paper"){
            //rock,scissor
            userWin = compChoice==="scissor" ? false : true;
        }
        else{
            //rock,paper
            userWin = compChoice==="rock" ? false : true;
        }
        showWinner(userWin,userChoice,compChoice);
    }
};

choices.forEach((choice) =>{
    choice.addEventListener("click",()=>{
        const userChoice=choice.getAttribute("id");
        playGame(userChoice);
    });
});

