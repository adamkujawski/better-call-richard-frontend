import React from "react";
import './Button.css'

interface Props {
    title: string,
    handleClick?: () => void,
    styleCss?: string,
}
export const Button = ({handleClick, title, styleCss}:Props) =>{

    return (
        <>
            <button className={styleCss} onClick={handleClick}>{title}</button>
        </>
    )

}
