const choices = document.querySelectorAll('.choice');
const score = document.getElementById('score');
const restart = document.getElementById('restart');
const modal = document.querySelector(".modal");
const modalcontent = document.querySelector(".modal-content");
const scoreboard = {
    player: 0,
    computer: 0
};




// Logic Class
class Logic {
    static playGame(e) {
        const computerChoice = Logic.getComputerChoice();
        const playerChoice = e.target.id;
        const winner = Logic.getWinner(playerChoice, computerChoice);

        UI.showWinner(winner, computerChoice);
        restart.style.display = 'inline-block';

        
    }




    static getComputerChoice() {
        const rand = Math.floor((Math.random()*3)+1);
        if(rand === 1) {
            return 'rock';
        } else if(rand === 2) {
            return 'paper';
        } else {
            return 'scissors';
        }
    }



    static getWinner(playerChoice, computerChoice) {
        if(playerChoice === computerChoice) {
            return 'draw';
        } if(playerChoice === 'rock') {
            if(computerChoice === 'scissors') {
                return 'player';
            } else {
                return 'computer';
            }
        } else if (playerChoice === 'paper') {
            if(computerChoice === 'rock') {
                return 'player';
            } else {
                return 'computer';
            }
        } else if (playerChoice === 'scissors') {
            if(computerChoice === 'paper') {
                return 'player';
            } else {
                return 'computer';
            }
        }
    }







}



// UI Class

class UI {
    static showWinner(winner, computerChoice) {
        if(winner === 'player') {
            scoreboard.player++;
            modalcontent.innerHTML = `
                <h1 class="text-win">You Win</h1>
                <i class="fas fa-hand-${computerChoice} fa-10x"></i>
                <p>Computer Chose ${computerChoice}</p>
            `;
        } else if(winner === 'computer') {
            scoreboard.computer++;
            modalcontent.innerHTML = `
                <h1 class="text-lose">You Lose</h1>
                <i class="fas fa-hand-${computerChoice} fa-10x"></i>
                <p>Computer Chose ${computerChoice}</p>
            `;
        } else {
            modalcontent.innerHTML = `
                <h1>It was a draw</h1>
                <i class="fas fa-hand-${computerChoice} fa-10x"></i>
                <p>Computer Chose ${computerChoice}</p>
            `;
        }

        score.innerHTML = `
            <p>Player: ${scoreboard.player}</p>
            <p>Computer: ${scoreboard.computer}</p>
        `;

        modal.style.display = 'block';

    }


    static clearModal(e) {
        if(e.target.classList.contains('modal') === true) {
            modal.style.display = 'none';
        }

    }

    static restartGame() {
        scoreboard.player = 0;
        scoreboard.computer = 0;
        score.innerHTML = `
            <p>Player: 0</p>
            <p>Computer: 0</p>
        `;
    }



}


// Event Listeners



choices.forEach((choice) => choice.addEventListener('click', Logic.playGame));

restart.addEventListener('click', UI.restartGame);

window.addEventListener('click', UI.clearModal);