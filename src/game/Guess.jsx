import React from 'react'
export const Guess = (props) => {
    return (
        <div>
            <p className="guess">{props.guess.length > 0 ? props.guess : "_"}</p>
        </div>
    )
}
