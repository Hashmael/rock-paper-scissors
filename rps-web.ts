import { RockPaperScissorChoice, RockPaperScissorGame } from './rps-game';

const startButton = document.getElementById('start-game') as HTMLButtonElement;
const gameInterface = document.getElementById('game-interface') as HTMLDivElement;

class RpsWebGame extends RockPaperScissorGame {

    protected override _onWin() {

    }

    protected override _onLose() {

    }

}

function newGame() {
    gameInterface.hidden = false;
}

startButton.onclick = newGame;
