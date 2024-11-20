let buttons = { rock: document.getElementById("rock"), paper: document.getElementById("paper"), scissors: document.getElementById("scissors") };
let computer_choice = document.getElementById("computer");
let player_choice = document.getElementById("player");
let score = document.getElementById("score");
let buttonHover = document.getElementById("buttonHover");
let restart = document.getElementById("restart");
let gameplay = document.getElementById("gameplay");
let points = 0;

const choices = ['rock', 'paper', 'scissors'];

document.addEventListener("DOMContentLoaded", function() {
	// Check if score exists in local storage, if not create with 0 value
    if (localStorage.getItem('score') === null) {
        localStorage.setItem('score', 0);
    } else {
        points = parseInt(localStorage.getItem('score'));
        score.innerHTML = points;
    }
	
	// Hover Effect
    Object.keys(buttons).forEach(choice => {
        buttons[choice].onmouseover = () => buttonHover.innerHTML = choice === 'rock' ? 'حجرة' : (choice === 'paper' ? 'ورقة' : 'مقص');
        buttons[choice].onmouseout = () => buttonHover.innerHTML = "";
    });

    // Click Handlers for Gameplay
    Object.keys(buttons).forEach(choice => {
        buttons[choice].onclick = () => playRound(choice);
    });

    // Restart Game
    restart.onclick = () => {
        gameplay.style.top = "-75%";
        score.style.top = "-10%";
        restart.style.bottom = "-15%";
    };

    function playRound(playerChoice) {
        gameplay.style.top = "50%";
        player_choice.setAttribute("src", `${playerChoice}.png`);
        restart.style.bottom = "0";

        let computerChoice = choices[Math.floor(Math.random() * 3)];
        computer_choice.setAttribute("src", `${computerChoice}.png`);

        // Determine winner
        let result = getResult(playerChoice, computerChoice);
        points = result === 'win' ? points + 1 : result === 'lose' ? points - 1 : points;
		
		localStorage.setItem('score', points);
        score.innerHTML = points;
        score.style.top = "0";
    }

    function getResult(playerChoice, computerChoice) {
        if (playerChoice === computerChoice) return 'draw';
        if (
            (playerChoice === 'rock' && computerChoice === 'scissors') ||
            (playerChoice === 'paper' && computerChoice === 'rock') ||
            (playerChoice === 'scissors' && computerChoice === 'paper')
        ) {
            return 'win';
        }
        return 'lose';
    }
});
