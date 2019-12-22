import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class PlayAgain extends React.Component {
    buttonClicked() {
        window.location.href = '/index.html';
    }
    render() {
        return (
            <p className="button" onClick={this.buttonClicked}>Play Again</p>);
    }
}

class Loser extends React.Component {
    render() {
        return (
            <div>
                <h2>Sorry! The number was {this.props.secretNumber}</h2>
                <PlayAgain />
            </div>
        );
    }
}

class Winner extends React.Component {
    render() {
        return (
            <div>
                <h2>Winner!!</h2>
                <PlayAgain />
            </div>
        );
    }
}

class Key extends React.Component {
    constructor(props) {
        super(props);
        this.keyPressed = this.keyPressed.bind(this);
    }

    componentDidMount() {
        document.addEventListener("keypress", this.keyPressed);
    }

    componentWillUnmount() {
        document.removeEventListener("keypress", this.keyPressed);
    }

    keyPressed(event) {
        let guess = String.fromCharCode(event.charCode);
        if (isNaN(guess)) { }
        else if (this.props.number === Number(guess) && !this.props.guessed) {
            this.buttonClicked();
        }
    }

    buttonClicked() {
        document.clear();
        if (!this.props.guessed)
            this.props.action(String(this.props.number));
    }

    render() {
        return (
            <p key={'num' + this.props.number} onClick={this.buttonClicked.bind(this)} className={"key " + (this.props.guessed ? "disabled" : "")}>{this.props.number}</p>
        )
    }
}

class NumPad extends React.Component {
    render() {
        return (
            <div className="numpad">
                <div className="numpad-row">
                    {[1, 2, 3].map(num => <Key key={'num' + num} guessed={this.props.guess.indexOf(num) > -1} action={this.props.action} number={num} />)}
                </div>
                <div className="numpad-row">
                    {[4, 5, 6].map(num => <Key key={'num' + num} guessed={this.props.guess.indexOf(num) > -1} action={this.props.action} number={num} />)}
                </div>
                <div className="numpad-row">
                    {[7, 8, 9].map(num => <Key key={'num' + num} guessed={this.props.guess.indexOf(num) > -1} action={this.props.action} number={num} />)}
                </div>
                <div className="numpad-row">
                    <Key key="num0" number={0} guessed={this.props.guess.indexOf(0) > -1} action={this.props.action} />
                    <Key key="bksp" number="&larr;" action={this.props.action} />
                </div>
            </div>
        );
    }
}

class Guess extends React.Component {
    render() {
        return (
            <div>
                <p className="guess">{this.props.guess.length > 0 ? this.props.guess : "_"}</p>
            </div>
        );
    }
}

function getSecretNumber() {
    let numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    let num = '';
    for (let i = 0; i < 3; i++) {
        let choice = Math.floor(Math.random() * numbers.length);
        num += numbers[choice];
        numbers.splice(choice, 1);
    }

    return num;
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.guessMade = this.guessMade.bind(this);
        this.playAgain = this.playAgain.bind(this);
        this.keyDown = this.keyDown.bind(this);
        this.state = {
            guess: '',
            guesses: [],
            secretNumber: getSecretNumber(),
            winner: false,
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.keyDown);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.keyDown);
    }

    playAgain() {
        this.setState({
            guess: '',
            guesses: [],
            secretNumber: getSecretNumber(),
            winner: false,
        });
    }

    keyDown(event) {
        if (event.keyCode === 8) {
            this.deleteLast();
        }
    }

    deleteLast() {
        let guess = this.state.guess;
        if (guess.length > 0) {
            this.setState({
                guess: guess.substr(0, guess.length - 1),
                guesses: this.state.guesses,
                secretNumber: this.state.secretNumber,
                winner: this.state.winner,
            })
        }
    }

    guessMade(guess) {
        if (guess === '\u2190') {
            this.deleteLast();
            return
        }
        let guesses = this.state.guesses;
        let currentGuess = this.state.guess + guess;
        if (currentGuess.length === 3) {
            let thisGuess = [];
            for (let i = 0; i < 3; i++) {
                if (currentGuess[i] === this.state.secretNumber[i]) {
                    thisGuess.push('fermi');
                }
                else if (this.state.secretNumber.indexOf(currentGuess[i]) > -1) {
                    thisGuess.push('pico');
                }
            }
            if (thisGuess.length === 0) {
                thisGuess.push('bagels');
            }
            thisGuess.sort();
            this.setState({
                guess: '',
                guesses: guesses.concat(['(' + (currentGuess + ') ' + thisGuess.join(' '))]),
                secretNumber: this.state.secretNumber,
                winner: thisGuess.length === 3 && thisGuess.every(g => g === 'fermi')
            })
        }
        else {
            this.setState({
                guess: currentGuess,
                guesses: this.state.guesses,
                secretNumber: this.state.secretNumber,
                winner: false,
            })
        }
    }

    render() {
        if (this.state.winner) {
            return (
                <div className="wrapper">
                    <Winner />
                </div>
            );
        }
        else if (this.state.guesses.length === 10) {
            return (
                <div className="wrapper">
                    <Loser secretNumber={this.state.secretNumber} />
                </div>
            );
        }
        return (
            <div className="wrapper">
                <aside className="guesses">
                    <div className="guesses">
                        <h4>{10 - this.state.guesses.length} Guesses Left</h4>
                        <ul className="guess-list">
                            {this.state.guesses.map(g => <li>{g}</li>)}
                        </ul>
                    </div>
                </aside>
                <div className="inner-wrapper">
                    <Guess guess={this.state.guess} />
                    <NumPad action={this.guessMade} guess={this.state.guess} />
                </div>
                <section className="rules">
                    <div className="rules">
                        <h2>Rules</h2>
                        <ul>
                            <li>Fermi indicates the correct number in the correct location</li>
                            <li>Pico indicates the number is correct but not the location</li>
                            <li>Bagels indicates that no numbers are correct</li>
                        </ul>
                    </div>
                </section>

            </div>
        );
    }
}
ReactDOM.render(<Game />, document.getElementById('root'));

