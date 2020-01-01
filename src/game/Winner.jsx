import React from 'react'
import { PlayAgain } from './PlayAgain'

export const Winner = (props) => {
    return (
        <div>
            <h2>Winner!!</h2>
            <h3>You solved it in {props.numGuesses} guesses.</h3>
            <PlayAgain />
        </div>
    );
}
