function incrementElementNumericValue(element: HTMLElement, incrementBy: number = 1) : void {
    element.textContent = (parseInt(element.textContent) + incrementBy).toString();
}

function randomChoice(): string {
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
    };
};

window.onload = init;

function init(this: GlobalEventHandlers, ev: Event): any {
    const startButton = document.getElementById('start-game') as HTMLButtonElement;
    const gameInterface = document.getElementById('game-interface') as HTMLDivElement;
    const bestOfInput = document.getElementById("rounds") as HTMLInputElement;
    const gameWinCounter = document.getElementById("game-win-count") as HTMLParagraphElement;
    const gameLossCounter = document.getElementById("game-loss-count") as HTMLParagraphElement;
    const gameVictoryHeading = document.getElementById("game-victory") as HTMLHeadingElement;
    const roundTrigger = document.getElementById("trigger-round") as HTMLButtonElement;
    const roundCounter = document.getElementById("current-round") as HTMLParagraphElement;
    const roundWinCounter = document.getElementById("round-win-count") as HTMLParagraphElement;
    const roundLossCounter = document.getElementById("round-loss-count") as HTMLParagraphElement;
    const roundDrawCounter = document.getElementById("round-draw-count") as HTMLParagraphElement;
    const playerChoiceP = document.getElementById("player-choice") as HTMLParagraphElement;
    const computerChoiceP = document.getElementById("computer-choice") as HTMLParagraphElement;
    const roundVictoryHeading = document.getElementById("round-victory") as HTMLHeadingElement;

    function getPlayerChoice() : string {
        var chosen_radio_button = document.querySelector("input[name='round-selection']:checked") as HTMLInputElement;
        return chosen_radio_button.value;
    };

    function verifyCounter(counter: HTMLParagraphElement, expectedValue: number, name: string) : void {
        if (parseInt(counter.textContent) != expectedValue) { throw Error(`${name} data mismatch`); };
    };

    function verifyIncrement(oldValue: number, newValue: number, name: string, incrementBy: number = 1) : void {
        if (newValue != oldValue + incrementBy) { throw Error(`Can only increment ${name} by ${incrementBy}`); };
    };

    function resetGame() : void {
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
    };

    function newGame() {
        var bestOf: number = parseInt(bestOfInput.value);
        var gameInProgress: RockPaperScissorsGame;

        class RockPaperScissorsGame {
            private verifyGameNotComplete() : void {
                if (gameInProgress.gameComplete) { throw Error("Cannot modify values of completed game"); };
            }

            private static finishGame(counter: HTMLParagraphElement, status: string) : void {
                incrementElementNumericValue(counter);
                gameVictoryHeading.hidden = false;
                gameVictoryHeading.textContent = `You ${status}!`;
                roundTrigger.disabled = true;
            }

            private _currentRound: number = 0;
            public get currentRound() : number {
                verifyCounter(roundCounter, gameInProgress._currentRound, "current round");
                return gameInProgress._currentRound;
            };
            private set currentRound(newRounds: number) {
                gameInProgress.verifyGameNotComplete();
                verifyCounter(roundCounter, gameInProgress._currentRound, "current round");
                verifyIncrement(gameInProgress.currentRound, newRounds, "current round");
                incrementElementNumericValue(roundCounter);
                gameInProgress._currentRound += 1;
            };

            private _wins: number = 0;
            public get wins(): number {
                verifyCounter(roundWinCounter, gameInProgress._wins, "win");
                return gameInProgress._wins;
            };
            private set wins(newWins: number) {
                gameInProgress.verifyGameNotComplete();
                verifyIncrement(gameInProgress.wins, newWins, "win");
                gameInProgress.currentRound += 1;
                gameInProgress._wins += 1;
                incrementElementNumericValue(roundWinCounter);
                roundVictoryHeading.hidden = false;
                roundVictoryHeading.textContent = `Player wins round ${gameInProgress.currentRound}`;
                if (gameInProgress.gameComplete) { RockPaperScissorsGame.finishGame(gameWinCounter, "win"); }
            };

            private _losses: number = 0;
            public get losses(): number {
                verifyCounter(roundLossCounter, gameInProgress._losses, "loss");
                return gameInProgress._losses;
            };
            private set losses(newLosses: number) {
                gameInProgress.verifyGameNotComplete();
                verifyIncrement(gameInProgress.losses, newLosses, "loss");
                gameInProgress.currentRound += 1;
                gameInProgress._losses += 1;
                incrementElementNumericValue(roundLossCounter);
                roundVictoryHeading.hidden = false;
                roundVictoryHeading.textContent = `Computer wins round ${gameInProgress.currentRound}`;
                if (gameInProgress.gameComplete) { RockPaperScissorsGame.finishGame(gameLossCounter, "lose"); }
            }

            private _draws: number = 0;
            public get draws(): number {
                verifyCounter(roundDrawCounter, gameInProgress._draws, "draw");
                return gameInProgress._draws;
            };
            private set draws(newDraws: number) {
                gameInProgress.verifyGameNotComplete();
                verifyIncrement(gameInProgress.draws, newDraws, "draw");
                gameInProgress.currentRound += 1;
                gameInProgress._draws += 1;
                incrementElementNumericValue(roundDrawCounter);
                roundVictoryHeading.hidden = false;
                roundVictoryHeading.textContent = `Round ${gameInProgress.currentRound} is a draw`;
            }
    
            public static getRoundOutcome(playerChoice: string, opponentChoice: string): string {
                if (playerChoice == opponentChoice) { return 'draw' };
                if (playerChoice == 'rock') {
                    if (opponentChoice == 'scissors') { return 'win'; }
                    else { return 'lose'; };
                };
                if (playerChoice == 'paper') {
                    if (opponentChoice == 'rock') { return 'win'; }
                    else { return 'lose'; };
                };
                if (playerChoice == 'scissors') {
                    if (opponentChoice == 'paper') { return 'win'; }
                    else { return 'lose'; };
                };
                throw EvalError(`Scenario not covered: ${playerChoice} against ${opponentChoice}`);
            };

            public get gameComplete() : boolean {
                return (gameInProgress.wins > bestOf / 2 || gameInProgress.losses > bestOf / 2);
            };
        
            public playRound() : void {
                var playerChoice : string = getPlayerChoice();
                var computerChoice = randomChoice();
                playerChoiceP.textContent = playerChoice;
                computerChoiceP.textContent = computerChoice;
                var roundOutcome = RockPaperScissorsGame.getRoundOutcome(playerChoice, computerChoice);
                switch(roundOutcome) {
                    case "win":
                        gameInProgress.wins += 1;
                        break;
                    case "lose":
                        gameInProgress.losses += 1;
                        break;
                    default:
                        gameInProgress.draws += 1;
                };
            };
        }
        resetGame();
        gameInProgress = new RockPaperScissorsGame();
        roundTrigger.onclick = gameInProgress.playRound;
        gameInterface.hidden = false;
    };

    startButton.onclick = newGame;
}
