import React, {useState} from 'react';
import './App.css';
import { MainLayout } from '../MainLayout/MainLayout';
import {Route, Routes} from "react-router-dom";
import {FaultList} from "../FaultList/FaultList";

export const App = () => (
    <>
        <Routes>
            <Route path="/" element={<MainLayout/>}/>
            <Route path="/richard" element={<FaultList/>}/>
        </Routes>
    </>
);

