import React from 'react'
import { Key } from './Key'

export const NumPad = (props) => {
    return (
        <div className="numpad">
            <div className="numpad-row">
                {[1, 2, 3].map(num => <Key key={'num' + num} guessed={props.guess.indexOf(num) > -1} action={props.action} number={num} />)}
            </div>
            <div className="numpad-row">
                {[4, 5, 6].map(num => <Key key={'num' + num} guessed={props.guess.indexOf(num) > -1} action={props.action} number={num} />)}
            </div>
            <div className="numpad-row">
                {[7, 8, 9].map(num => <Key key={'num' + num} guessed={props.guess.indexOf(num) > -1} action={props.action} number={num} />)}
            </div>
            <div className="numpad-row">
                <Key key="num0" number={0} guessed={props.guess.indexOf(0) > -1} action={props.action} />
                <Key key="bksp" number="&larr;" action={props.action} />
            </div>
        </div>
    )
}
