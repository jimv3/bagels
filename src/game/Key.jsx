import React, { useEffect } from 'react'

export const Key = (props) => {
    useEffect(() => {
        document.addEventListener('keypress', keyPressed)

        return () => document.removeEventListener('keypress', keyPressed)
    })

    const keyPressed = (event) => {
        let guess = String.fromCharCode(event.charCode);
        if (isNaN(guess)) { }
        else if (props.number === Number(guess) && !props.guessed) {
            buttonClicked();
        }
    }

    const buttonClicked = () => {
        document.clear();
        if (!props.guessed)
            props.action(String(props.number));
    }

    return (
        <p key={'num' + props.number} onClick={buttonClicked} className={"key " + (props.guessed ? "disabled" : "")}>{props.number}</p>
    )
}
