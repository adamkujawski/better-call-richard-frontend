import React, {useEffect, useState} from "react";
import './ModalLoginForm.css'
import {LoginForm} from "./LoginForm/LoginForm";

interface Props{
    show: boolean;
}

export const ModalLoginForm = ({show}: Props) =>{
    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(prev => !prev);
    }

    useEffect(()=>{
        showModal()
    },[show])

    return (
        <>
            {
                visible &&
                <div className="modal-login-container">
                    <button className="btn-close" onClick={showModal}>X</button>
                    <LoginForm/>
                </div>
            }
        </>
    )

}
