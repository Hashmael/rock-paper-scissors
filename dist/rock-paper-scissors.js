function incrementElementNumericValue(element, incrementBy = 1) {
    element.textContent = (parseInt(element.textContent) + incrementBy).toString();
}
function randomChoice() {
    var randomValue = Math.floor(Math.random() * 3);
    console.log(randomValue);
    switch (randomValue) {
        case 0:
            return "rock";
        case 1:
            return "paper";
        case 2:
            return "scissors";
        default:
            throw EvalError(`No value found for ${randomValue.toString()}`);
    }
    ;
}
;
window.onload = init;
function init(ev) {
    const startButton = document.getElementById('start-game');
    const gameInterface = document.getElementById('game-interface');
    const bestOfInput = document.getElementById("rounds");
    const gameWinCounter = document.getElementById("game-win-count");
    const gameLossCounter = document.getElementById("game-loss-count");
    const gameVictoryHeading = document.getElementById("game-victory");
    const roundTrigger = document.getElementById("trigger-round");
    const roundCounter = document.getElementById("current-round");
    const roundWinCounter = document.getElementById("round-win-count");
    const roundLossCounter = document.getElementById("round-loss-count");
    const roundDrawCounter = document.getElementById("round-draw-count");
    const playerChoiceP = document.getElementById("player-choice");
    const computerChoiceP = document.getElementById("computer-choice");
    const roundVictoryHeading = document.getElementById("round-victory");
    function getPlayerChoice() {
        var chosen_radio_button = document.querySelector("input[name='round-selection']:checked");
        return chosen_radio_button.value;
    }
    ;
    function verifyCounter(counter, expectedValue, name) {
        if (parseInt(counter.textContent) != expectedValue) {
            throw Error(`${name} data mismatch`);
        }
        ;
    }
    ;
    function verifyIncrement(oldValue, newValue, name, incrementBy = 1) {
        if (newValue != oldValue + incrementBy) {
            throw Error(`Can only increment ${name} by ${incrementBy}`);
        }
        ;
    }
    ;
    function resetGame() {
        roundCounter.textContent = "0";
        roundWinCounter.textContent = "0";
        roundLossCounter.textContent = "0";
        roundDrawCounter.textContent = "0";
        roundVictoryHeading.textContent = "";
        playerChoiceP.textContent = "";
        computerChoiceP.textContent = "";
        gameVictoryHeading.textContent = "";
        roundVictoryHeading.hidden = true;
        gameVictoryHeading.hidden = true;
        roundTrigger.disabled = false;
    }
    ;
    function newGame() {
        var bestOf = parseInt(bestOfInput.value);
        var gameInProgress;
        class RockPaperScissorsGame {
            constructor() {
                this._currentRound = 0;
                this._wins = 0;
                this._losses = 0;
                this._draws = 0;
            }
            verifyGameNotComplete() {
                if (gameInProgress.gameComplete) {
                    throw Error("Cannot modify values of completed game");
                }
                ;
            }
            static finishGame(counter, status) {
                incrementElementNumericValue(counter);
                gameVictoryHeading.hidden = false;
                gameVictoryHeading.textContent = `You ${status}!`;
                roundTrigger.disabled = true;
            }
            get currentRound() {
                verifyCounter(roundCounter, gameInProgress._currentRound, "current round");
                return gameInProgress._currentRound;
            }
            ;
            set currentRound(newRounds) {
                gameInProgress.verifyGameNotComplete();
                verifyCounter(roundCounter, gameInProgress._currentRound, "current round");
                verifyIncrement(gameInProgress.currentRound, newRounds, "current round");
                incrementElementNumericValue(roundCounter);
                gameInProgress._currentRound += 1;
            }
            ;
            get wins() {
                verifyCounter(roundWinCounter, gameInProgress._wins, "win");
                return gameInProgress._wins;
            }
            ;
            set wins(newWins) {
                gameInProgress.verifyGameNotComplete();
                verifyIncrement(gameInProgress.wins, newWins, "win");
                gameInProgress.currentRound += 1;
                gameInProgress._wins += 1;
                incrementElementNumericValue(roundWinCounter);
                roundVictoryHeading.hidden = false;
                roundVictoryHeading.textContent = `Player wins round ${gameInProgress.currentRound}`;
                if (gameInProgress.gameComplete) {
                    RockPaperScissorsGame.finishGame(gameWinCounter, "win");
                }
            }
            ;
            get losses() {
                verifyCounter(roundLossCounter, gameInProgress._losses, "loss");
                return gameInProgress._losses;
            }
            ;
            set losses(newLosses) {
                gameInProgress.verifyGameNotComplete();
                verifyIncrement(gameInProgress.losses, newLosses, "loss");
                gameInProgress.currentRound += 1;
                gameInProgress._losses += 1;
                incrementElementNumericValue(roundLossCounter);
                roundVictoryHeading.hidden = false;
                roundVictoryHeading.textContent = `Computer wins round ${gameInProgress.currentRound}`;
                if (gameInProgress.gameComplete) {
                    RockPaperScissorsGame.finishGame(gameLossCounter, "lose");
                }
            }
            get draws() {
                verifyCounter(roundDrawCounter, gameInProgress._draws, "draw");
                return gameInProgress._draws;
            }
            ;
            set draws(newDraws) {
                gameInProgress.verifyGameNotComplete();
                verifyIncrement(gameInProgress.draws, newDraws, "draw");
                gameInProgress.currentRound += 1;
                gameInProgress._draws += 1;
                incrementElementNumericValue(roundDrawCounter);
                roundVictoryHeading.hidden = false;
                roundVictoryHeading.textContent = `Round ${gameInProgress.currentRound} is a draw`;
            }
            static getRoundOutcome(playerChoice, opponentChoice) {
                if (playerChoice == opponentChoice) {
                    return 'draw';
                }
                ;
                if (playerChoice == 'rock') {
                    if (opponentChoice == 'scissors') {
                        return 'win';
                    }
                    else {
                        return 'lose';
                    }
                    ;
                }
                ;
                if (playerChoice == 'paper') {
                    if (opponentChoice == 'rock') {
                        return 'win';
                    }
                    else {
                        return 'lose';
                    }
                    ;
                }
                ;
                if (playerChoice == 'scissors') {
                    if (opponentChoice == 'paper') {
                        return 'win';
                    }
                    else {
                        return 'lose';
                    }
                    ;
                }
                ;
                throw EvalError(`Scenario not covered: ${playerChoice} against ${opponentChoice}`);
            }
            ;
            get gameComplete() {
                return (gameInProgress.wins > bestOf / 2 || gameInProgress.losses > bestOf / 2);
            }
            ;
            playRound() {
                var playerChoice = getPlayerChoice();
                var computerChoice = randomChoice();
                playerChoiceP.textContent = playerChoice;
                computerChoiceP.textContent = computerChoice;
                var roundOutcome = RockPaperScissorsGame.getRoundOutcome(playerChoice, computerChoice);
                switch (roundOutcome) {
                    case "win":
                        gameInProgress.wins += 1;
                        break;
                    case "lose":
                        gameInProgress.losses += 1;
                        break;
                    default:
                        gameInProgress.draws += 1;
                }
                ;
            }
            ;
        }
        resetGame();
        gameInProgress = new RockPaperScissorsGame();
        roundTrigger.onclick = gameInProgress.playRound;
        gameInterface.hidden = false;
    }
    ;
    startButton.onclick = newGame;
}
//# sourceMappingURL=rock-paper-scissors.js.map