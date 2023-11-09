import React from "react"

export const DeleteBtn = ({ btnText, onClick }) => {
    return(
        <button onClick={onClick}>
            {btnText}
        </button>
    )
}
