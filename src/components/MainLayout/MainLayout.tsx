import React, {useState} from "react";
import {Button} from "./Button/Button";
import {FaultForm} from "./ModalFaultForm/FaultForm/FaultForm";
import {LoginForm} from "./ModalLoginForm/LoginForm/LoginForm";
import {StatusForm} from "./ModalStatusForm/StatusForm/StatusForm";

import better from "../App/images/better.png";
import call from "../App/images/call.png";
import richard from "../App/images/richard.png";
import "./ModalFaultForm/ModalFaultForm.css"
import "./ModalStatusForm/ModalStatusForm.css"
import "./ModalLoginForm/ModalLoginForm.css"

export const MainLayout = () =>{

    const [modalFaultState, setFaultModalState] = useState(false);
    const [modalLoginState, setLoginModalState] = useState(false);
    const [modalStatusState, setStatusModalState] = useState(false);


    const login = () => {
        setLoginModalState(prev =>!prev);
    }
    const addFault = () => {
        setFaultModalState(prev =>!prev);
    }
    const status = () => {
        setStatusModalState(prev => !prev);
    }

    return (
    <>
        <div className="hero-img">
            <div className="hero-shadow"></div>
            <div className="better-call-richard">
                <img className="title-better" src={better} alt="title" />
                <img className="title-call" src={call} alt="title" />
                <img className="title-richard" src={richard} alt="title" />
            </div>
            {/*Menu*/}
            <div className="menu">
                <Button title={"Status"} handleClick={status} styleCss={"button button-check"}/>
                <Button title={"Login"} handleClick={login} styleCss={"button button-login"}/>
            </div>
            {
                modalStatusState &&
                <div className="modal-status-container">
                    <button className="btn-close" onClick={status}>X</button>
                    <StatusForm/>
                </div>
            }
            {
                modalLoginState &&
                <div className="modal-login-container">
                    <button className="btn-close" onClick={login}>X</button>
                    <LoginForm/>
                </div>
            }
            {/*main-text*/}
            <div className="hero-text">
                <h1>Witaj w Richard Garage</h1>
                <p>Samochody to moja pasja !</p>
                <Button title={"Zgłoś Usterkę!"} handleClick={addFault} styleCss={"button button-report"}/>
                {
                    modalFaultState &&
                    <div className="modal-fault-container">
                        <button className="btn-close" onClick={addFault}>X</button>
                        <FaultForm/>
                    </div>
                }
            </div>
        </div>
    </>
    )
}
