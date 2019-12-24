import React from 'react'
import { PlayAgain } from './PlayAgain'

export const Loser = (props) => {
    return (
        <div>
            <h2>Sorry! The number was {props.secretNumber}</h2>
            <PlayAgain />
        </div>
    )
}
