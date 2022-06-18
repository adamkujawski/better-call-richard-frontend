import React from "react";
import "./Header.css";
import better from "./images/better.png";
import call from "./images/call.png";
import richard from "./images/richard.png";

export const Header = () => {
  return (
    <>
      <div className="hero-img">
        <div className="hero-shadow"></div>
        <div className="better-call-richard">
          <img className="title-better" src={better} alt="title" />
          <img className="title-call" src={call} alt="title" />
          <img className="title-richard" src={richard} alt="title" />
        </div>
        <div className="hero-text">
          <h1>Witaj w Richard Garage</h1>
          <p>Samochody to moja pasja !</p>

          <div className="button button-1">Zgłoś Usterkę!</div>
        </div>
      </div>
    </>
  );
};
