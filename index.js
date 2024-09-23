const playscreen = document.querySelector(".main-body");
const compscore = document.querySelector("#comp-score");
const playerscore = document.querySelector("#player-score");
const mainscreen = document.querySelector(".user-rps");
const resultscreen = document.querySelector(".play-screen");
const userrock = document.querySelector("#user-rock");
const pcrock = document.querySelector("#pc-rock");
const userpaper = document.querySelector("#user-paper");
const pcpaper = document.querySelector("#pc-paper");
const userscissor = document.querySelector("#user-scissor");
const pcscissor = document.querySelector("#pc-scissor");
const userGreen=document.querySelector("#user-picked");
const pcGreen=document.querySelector("#pc-picked");
const play_againbtn = document.querySelector(".play-again-btn");
const replaybtn = document.querySelector(".replay-button");
const wintext = document.querySelector("#you-win");
const losttext = document.querySelector("#you-lost");
const tietext = document.querySelector("#tie-up");
const subtext = document.querySelector(".text");
const rules = document.querySelector(".rules-section");
const crossbtn = document.querySelector(".cross");
const rulebtn = document.querySelector(".rule-button");
const nextbtn = document.querySelector(".next-button");
const winnerscreen = document.querySelector(".winner");
const play_again_winnerbtn = document.querySelector(".play-again");
const elements = document.querySelectorAll(".element");
const elementsarray = Array.from(elements);

// Variables to keep track of the scores
let playerScore = parseInt(localStorage.getItem("playerScore")) || 0;
let compScore = parseInt(localStorage.getItem("compScore")) || 0;

// Update the score display
playerscore.textContent = playerScore;
compscore.textContent = compScore;

// event listner for rule and cross button
rulebtn.addEventListener("click", () => {
    rules.style.display = "block";
    crossbtn.style.display = "flex";
});

crossbtn.addEventListener("click", () => {
    rules.style.display = "none";
    crossbtn.style.display = "none";
});

// event listener for play again button on the winner screen
play_again_winnerbtn.addEventListener("click", () => {
    winnerscreen.style.display = "none";
    playscreen.style.display = "block";
    resultscreen.style.display="none";
    mainscreen.style.display="block";
});

// update scores in local storage
function updateLocalStorage() {
    localStorage.setItem("playerScore", playerScore);
    localStorage.setItem("compScore", compScore);
}

//  update scores on screen
function updateScores() {
    playerscore.textContent = playerScore;
    compscore.textContent = compScore;
}

//  event listeners for player moves
elementsarray.forEach((element) => {
    element.addEventListener("click", () => {
        const playerChoice = element.id;
        const compChoice = computerTurn();

        mainscreen.style.display = "none";
        resultscreen.style.display = "flex";
        showChoices(playerChoice, compChoice);

        // Determine winner and update scores
        const result = determineWinner(playerChoice, compChoice);
        showResult(result);
        updateScores();
        checkNextButton();
        if (result === "win") showCelebration();
    });
});

// choice for computer
function computerTurn() {
    const choices = ["rock", "paper", "scissor"];
    return choices[Math.floor(Math.random() * choices.length)];
}

//  display player and computer choices
function showChoices(playerChoice, compChoice) {
    resetIcons(); 
    if (playerChoice === "rock") userrock.style.display = "block";
    else if (playerChoice === "paper") userpaper.style.display = "block";
    else if (playerChoice === "scissor") userscissor.style.display = "block";

    if (compChoice === "rock") pcrock.style.display = "block";
    else if (compChoice === "paper") pcpaper.style.display = "block";
    else if(compChoice ==="scissor") pcscissor.style.display = "block";
}

// Hide previous icons
function resetIcons() {
    userrock.style.display = "none";
    userscissor.style.display = "none";
    userpaper.style.display = "none";
    pcrock.style.display = "none";
    pcpaper.style.display = "none";
    pcscissor.style.display = "none";
    userGreen.classList.remove("green");
    pcGreen.classList.remove("green");
}
//  determine the winner
function determineWinner(player, computer) {
    if (player === computer) return "tie";
    if (
        (player === "rock" && computer === "scissor") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissor" && computer === "paper")
    ) {
        userGreen.classList.add("green");
        playerScore++; // Increment player score when the player wins
        updateLocalStorage();
        return "win";
    } else {
        pcGreen.classList.add("green");
        compScore++; // Increment computer score when the computer wins
        updateLocalStorage();
        return "lost";
    }
}

// displays the result
function showResult(result) {
    wintext.style.display = "none";
    losttext.style.display = "none";
    tietext.style.display = "none";
    play_againbtn.style.display = "none";
    replaybtn.style.display = "none";
    if (result === "win") {
        wintext.style.display = "block";
        subtext.textContent = "against pc";
        play_againbtn.style.display = "block"; 
    } else if (result === "lost") {
        losttext.style.display = "block";
        subtext.textContent = "against pc";
        play_againbtn.style.display = "block"; 
    } else {
        tietext.style.display = "block";
        subtext.textContent = " ";
        replaybtn.style.display = "block"; 
    }
}

// reset game after a round
function resetGame() {
    mainscreen.style.display = "flex";
    resultscreen.style.display = "none";
    winnerscreen.style.display="none";
    nextbtn.style.display="none";
}

//  winner screen visible if the player wins
function showCelebration() {
    if (playerScore > compScore) {
        nextbtn.style.display = "block";
        playscreen.style.display = "block";
    }
}
function checkNextButton() {
    rulebtn.style.display = "block"; 
    if (playerScore > compScore) {
        nextbtn.style.display = "block"; 
    } else {
        nextbtn.style.display = "none"; 
    }
}

// event listener for next button
nextbtn.addEventListener("click", () => {
    winnerscreen.style.display = "flex";
    playscreen.style.display = "none";
    nextbtn.style.display="none";
});
play_againbtn.addEventListener("click", resetGame);
replaybtn.addEventListener("click", resetGame);
