export class RockPaperScissorChoice {
    
    private _name : string;
    public get name() : string {
        return this._name;
    }
    private set name(newName: string) {
        var lowerName = newName.toLowerCase();
        if (lowerName != 'rock' && lowerName != 'paper' && lowerName != 'scissors') {
            throw RangeError();
        }
        this._name = lowerName;
    }

    constructor(name: string = '') {
        if (name == '') { name = RockPaperScissorChoice.random_name() };
        this.name = name;
    }

    public static random_name(): string {
        var randomValue = Math.floor(Math.random() * 3);
        if (randomValue <= 1) {
            return 'rock';
        };
        if (randomValue <= 2) {
            return 'paper';
        };
        if (randomValue <= 3) {
            return 'scissors';
        };
        throw EvalError(`No value found for ${randomValue.toString()}`);
    }

    public static random(): RockPaperScissorChoice {
        return new RockPaperScissorChoice(this.random_name());
    }

    public winsAgainst(choice: RockPaperScissorChoice): string {
        if (this.name == choice.name) { return 'draw' };
        if (this.name == 'rock') {
            if (choice.name == 'scissors') { return 'win' }
            else { return 'lose' };
        }
        if (this.name == 'paper') {
            if (choice.name == 'rock') { return 'win' }
            else { return 'lose' };
        }
        if (this.name == 'scissors') {
            if (choice.name == 'paper') { return 'win' }
            else {return 'lose'};
        }
        throw EvalError(`Uncovered scenario: ${this.name} against ${choice.name}`);
    }
}

export class RockPaperScissorGame {
    private _maxRounds: number;
    private _wins: number = 0;
    private _losses: number = 0;
    private _playerWins: boolean;

    public gameComplete() : boolean {
        return (this._wins > this._maxRounds / 2 || this._losses > this._maxRounds / 2)  
    }

    public get playerWins() : boolean {
        if (!this.gameComplete()) {
            throw Error(`Game outcome accessed prematurely. Wins: ${this._wins} Losses: ${this._losses}; Max Rounds: ${this._maxRounds}`)
        }
        this._playerWins = this._wins > this._losses;
        return this._playerWins;
    }

    private _playRound() {
        var playerChoice = this._getChoice();
        var roundOutcome = playerChoice.winsAgainst(RockPaperScissorChoice.random());
        if (roundOutcome == 'win') { this._wins += 1 };
        if (roundOutcome == 'lose') { this._losses += 1};
    }

    protected _getChoice() : RockPaperScissorChoice {
        throw ReferenceError('This behavior should be defined in a derived class');
    }

    protected _onWin() {
        throw ReferenceError('This behavior should be defined in a derived class');
    }

    protected _onLose() {
        throw ReferenceError('This behavior should be defined in a derived class');
    }

    constructor(maxRounds: number = 3) {
        if (maxRounds % 2 != 1 || maxRounds < 0) {
            throw EvalError(`Cannot start a game with ${maxRounds} maximum rounds; please choose an odd positive number`);
        }
        this._maxRounds = maxRounds;
        while (this._wins + this._losses < this._maxRounds){
            this._playRound();
        }
        if (this.playerWins) { this._onWin() }
        else { this._onLose() };
    }
}