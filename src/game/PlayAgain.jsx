import React from 'react'

export const PlayAgain = () => {
    const buttonClicked = () => {
        window.location.href = '/index.html';
    }

    return (
        <p className="button" onClick={buttonClicked}>Play Again</p>
    )
}
