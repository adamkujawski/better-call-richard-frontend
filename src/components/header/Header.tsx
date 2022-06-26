import React, {useState} from "react";
import "./Header.css";
import better from "../App/images/better.png";
import call from "../App/images/call.png";
import richard from "../App/images/richard.png";
import {ModalFaultForm} from "../ModalFaultForm/ModalFaultForm";
import {Link} from "react-router-dom";

export const Header = () => {

  const [modalState, setModalState] = useState(false);

  const addFault = () => {
    setModalState(prev => !prev);
  }

  return (
    <>
        <div className="hero-text">
          <h1>Witaj w Richard Garage</h1>
          <p>Samochody to moja pasja !</p>
          <div className="button button-1" onClick={() => addFault()}>Zgłoś Usterkę!</div>
          <ModalFaultForm show={modalState}/>
          <Link to='/richard'>Go to richard</Link>
        </div>
    </>
  );
};
