import React, { useState, useEffect } from 'react'
import { getSecretNumber } from './getSecretNumber'
import { Guess } from './Guess'
import { NumPad } from './NumPad'
import { Winner } from './Winner'
import { Loser } from './Loser'

export const Game = () => {
    const [guess, setGuess] = useState('')
    const [guesses, setGuesses] = useState([])
    const [secretNumber] = useState(getSecretNumber())
    const [winner, setWinner] = useState(false)

    useEffect(() => {
        document.addEventListener('keydown', keyDown)

        return () => document.removeEventListener('keydown', keyDown)
    })

    const keyDown = (event) => {
        if (event.keyCode === 8) {
            deleteLast();
        }
    }

    const deleteLast = () => {
        if (guess.length > 0) {
            setGuess(guess.substr(0, guess.length - 1))
        }
    }

    const guessMade = (guessed) => {
        if (guessed === '\u2190') {
            deleteLast();
            return
        }
        let currentGuess = guess + guessed;
        if (currentGuess.length === 3) {
            const thisGuess = [];
            for (let i = 0; i < 3; i++) {
                if (currentGuess[i] === secretNumber[i]) {
                    thisGuess.push('fem')
                }
                else if (secretNumber.indexOf(currentGuess[i]) > -1) {
                    thisGuess.push('pic')
                }
            }
            if (thisGuess.length === 0) {
                thisGuess.push('bagels')
            }
            thisGuess.sort()
            setGuess('')
            setGuesses(guesses.concat(['(' + (currentGuess + ') ' + thisGuess.join(' '))]))
            setWinner(thisGuess.length === 3 && thisGuess.every(g => g === 'fem'))
        }
        else {
            setGuess(currentGuess)
        }
    }

    if (winner) {
        return (
            <div className="wrapper">
                <Winner />
            </div>
        );
    }
    else if (guesses.length === 10) {
        return (
            <div className="wrapper">
                <Loser secretNumber={secretNumber} />
            </div>
        );
    }
    return (
        <div className="wrapper">
            <aside className="guesses">
                <div className="guesses">
                    <h4>{10 - guesses.length} Guesses Left</h4>
                    <ul className="guess-list">
                        {guesses.map(g => <li>{g}</li>)}
                    </ul>
                </div>
            </aside>
            <div className="inner-wrapper">
                <Guess guess={guess} />
                <NumPad action={guessMade} guess={guess} />
            </div>
            <section className="rules">
                <div className="rules">
                    <h2>Rules</h2>
                    <ul>
                        <li>fem indicates the correct number in the correct location</li>
                        <li>pic indicates the number is correct but not the location</li>
                        <li>bagels indicates that no numbers are correct</li>
                    </ul>
                </div>
            </section>
        </div>
    )
}
