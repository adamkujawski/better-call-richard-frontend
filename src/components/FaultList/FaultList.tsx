import React, {useEffect, useMemo, useState} from "react";
import './FaultList.css'
import {FaultTable} from "../FaultsTable/FaultTable";
import better from "../App/images/better.png";
import call from "../App/images/call.png";
import richard from "../App/images/richard.png";
import {apiUrl} from "../../config/api";

export const FaultList = () => {

    const [loading, setLoading] = useState(false)
    const [faultList, setFaultList] = useState([]);

    useEffect(() => {
        (async () => {
            setLoading(true)
            try {
                const res = await fetch(`${apiUrl}/fault`);
                const data = await res.json();
                console.log(data)
                setFaultList(data);

            } catch (err) {
                console.log(err)

            } finally {
                setLoading(false)
            }
        })();

    }, []);

    if (loading ) {
        return <h1 style={{color: "white"}}>Trwa ładowanie danych...</h1>
    }

    return (
        <>
            <div className="hero-img">
                <div className="hero-shadow"></div>
                <div className="better-call-richard">
                    <img className="title-better" src={better} alt="title"/>
                    <img className="title-call" src={call} alt="title"/>
                    <img className="title-richard" src={richard} alt="title"/>
                </div>
                <FaultTable/>
            </div>
        </>
    )
}
