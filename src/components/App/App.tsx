import React, {useState} from 'react';

import './App.css';
import {Header} from "../header/Header";
import {Link, Route, Routes} from "react-router-dom";
import {FaultList} from "../FaultList/FaultList";
import better from "./images/better.png";
import call from "./images/call.png";
import richard from "./images/richard.png";
import {ModalFaultForm} from "../ModalFaultForm/ModalFaultForm";


function App() {

  return (
   <>
       <div className="hero-img">
           <div className="hero-shadow"></div>
           <div className="better-call-richard">
               <img className="title-better" src={better} alt="title" />
               <img className="title-call" src={call} alt="title" />
               <img className="title-richard" src={richard} alt="title" />
           </div>
           <Routes>
               <Route path="/" element={<Header/>}/>
               <Route path="/richard" element={<FaultList/>}/>
           </Routes>
       </div>



   </>
  );
}

export default App;
