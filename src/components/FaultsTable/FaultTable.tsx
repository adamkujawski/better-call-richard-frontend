import React, {useEffect, useRef, useState} from 'react';
import './FaultTable.css'
import {Button} from "../MainLayout/Button/Button";
import {apiUrl} from "../../config/api";

import {Fault} from 'types'




interface OnEditInterface {
    status: boolean,
    rowKey: null | string,
    statusFault: null | string | boolean
}

export const FaultTable = () => {

    const [data, setData] = useState([]);
    const [pricing, setPricing] = useState<number>(0);
    const [date, setDate] = useState<string | Date>('');
    const [inEditMode, setInEditMode] = useState<OnEditInterface>({
        status: false,
        rowKey: null,
        statusFault: null
    });

    useEffect(() => {
        (async () => {
            await allFaults();
        })();
    }, []);

    const allFaults = async () => {
        const res = await fetch(`${apiUrl}/fault`);
        const data = await res.json();
        data ? setData(data) : setData([]) ;
    }

    const sortByNew = async () =>{
        const data = await fetch(`${apiUrl}/fault/new`);
        const newFaults = await data.json();
        newFaults ? setData(newFaults) : setData([]) ;
    }

    const sortByWaiting = async () =>{
        const data = await fetch(`${apiUrl}/fault/waiting`);
        const newFaults = await data.json();
        newFaults ? setData(newFaults) : setData([]) ;
    }
    const sortByWFinished = async () =>{
        const data = await fetch(`${apiUrl}/fault/finished`);
        const newFaults = await data.json();
        newFaults ? setData(newFaults) : setData([]) ;
    }
    const sortByAccepted = async () =>{
        const data = await fetch(`${apiUrl}/fault/accepted`);
        const newFaults = await data.json();
        newFaults ? setData(newFaults) : setData([]) ;
    }

    const updateInventory = async (id: string, pricing: number, date: Date | string) => {

        await fetch(`${apiUrl}/fault/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                pricing,
                arrivalDate: date,
            }),
        });
        await onCancel();
        await allFaults();
    }

    const finishFault = async (id: string) => {
        await fetch(`${apiUrl}/fault/finish/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
            }),
        });

        await onCancel();
        await allFaults();
    }

    const onEdit = ({id, currentUnitPrice, currentDate, statusFault} : {id: string, currentUnitPrice: number, currentDate: string | Date, statusFault: string | boolean | null}) => {
        setInEditMode({
            status: true,
            rowKey: id,
            statusFault: statusFault,
        })
        console.log(statusFault)
        setPricing(currentUnitPrice);
        setDate(currentDate)
    }

    const onSave = async (id: string, newUnitPrice: number, date: Date | string ) => {
        console.log(date)
        await updateInventory(id, newUnitPrice, date);
    }

    const onCancel = async () => {
        // reset the inEditMode state value
        await setInEditMode({
            status: false,
            rowKey: null,
            statusFault: null
        })
        // reset the unit price state value
        await setPricing(pricing);
    }

    if(data.length === 0){
        return <>
            <div className="sort-buttons">
                <Button title="Wszytskie" styleCss={"button"} handleClick={allFaults}/>
                <Button title="Nowe" styleCss={"button"} handleClick={sortByNew}/>
                <Button title="Oczekujące" styleCss={"button"} handleClick={sortByWaiting}/>
                <Button title="Zaakceptowane" styleCss={"button"} handleClick={sortByAccepted}/>
                <Button title="Zakończone" styleCss={"button"} handleClick={sortByWFinished}/>
            </div>

           <h1 style={
               {
                   "minHeight":"100vh",
                   "textAlign":"center",
                   "position":"relative",
                   "color":"white",
                   "padding":"20rem 0"
               }}
           >
               BRAK DANYCH
           </h1>
        </>
    }

    return (
        <>

            <div className="sort-buttons">
                <Button title="Wszytskie" styleCss={"button"} handleClick={allFaults}/>
                <Button title="Nowe" styleCss={"button"} handleClick={sortByNew}/>
                <Button title="Oczekujące" styleCss={"button"} handleClick={sortByWaiting}/>
                <Button title="Zaakceptowane" styleCss={"button"} handleClick={sortByAccepted}/>
                <Button title="Zakończone" styleCss={"button"} handleClick={sortByWFinished}/>
            </div>

            {data.map((fault : Fault ) => {
                return (

                    <div className="table-container">
                        <h2>{fault.brand} {fault.model} {fault.year}</h2>
                        <table className="fault-table" key={fault.id}>
                            <tbody>
                            <tr>
                                <th>Imie</th>
                                <td>{fault.name}</td>
                            </tr>
                            <tr>
                                <th>Nazwisko</th>
                                <td>{fault.surname}</td>
                            </tr>
                            <tr>
                                <th>Nr Telefonu</th>
                                <td>{fault.telephone}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{fault.email}</td>
                            </tr>
                            <tr>
                                <th>Marka</th>
                                <td>{fault.brand}</td>
                            </tr>
                            <tr>
                                <th>Model</th>
                                <td>{fault.model}</td>
                            </tr>
                            <tr>
                                <th>Nr Rej.</th>
                                <td>{fault.registrationNo}</td>
                            </tr>
                            <tr>
                                <th>Rocznik</th>
                                <td>{fault.year}</td>
                            </tr>
                            <tr>
                                <th>Rodzaj Paliwa</th>
                                <td>{fault.typeFuel}</td>
                            </tr>
                            <tr>
                                <th>Pojemność cm3</th>
                                <td>{fault.capacity}</td>
                            </tr>
                            <tr>
                                <th>Opis usterki</th>
                                <td>{fault.description}</td>
                            </tr>
                            <tr>
                                <th>Status</th>
                                <td className="status">{fault.status}</td>
                            </tr>
                            <tr>
                                <th>Kod</th>
                                <td>{fault.code}</td>
                            </tr>
                            <tr>
                                <th>Wycena</th>
                                <td >
                                    {
                                        inEditMode.status && inEditMode.rowKey === fault.id ? (
                                            <input
                                                value={pricing}
                                                   onChange={(event) => setPricing(Number(event.target.value))}
                                            />
                                        ) : (
                                            fault.pricing
                                        )
                                    }
                                </td>
                            </tr>
                            <tr>
                                <th>Akceptacja</th>
                                <td>{fault.accept}</td>
                            </tr>
                            <tr>
                                <th>Data Przyjazdu</th>
                                <td style={{"padding":"10px"}}>
                                    {
                                        inEditMode.status && inEditMode.rowKey === fault.id ? (
                                            <input
                                                type="date"
                                                value={date ? String(date).slice(0,10) : new Date().getDate()}
                                                onChange={(event) => setDate(event.target.value)}
                                            />
                                        ) : (
                                            fault.arrivalDate ? String(fault.arrivalDate)?.slice(0,10) : fault.arrivalDate
                                        )
                                    }
                                </td>
                            </tr>
                            <tr>
                                <th>Data Zakończenia</th>
                                <td>{fault.finishDate ? String(fault.finishDate)?.slice(0,10) : ''}</td>
                            </tr>
                            <tr>
                                <th>Utworzony</th>
                                <td>{String(fault.createdAt)?.slice(0,10)}</td>
                            </tr>
                            <tr>
                                <th>Ostania mod.:</th>
                                <td>{String(fault.updatedAt)?.slice(0,10)}</td>
                            </tr>
                            <tr>
                                <th>Zmiana</th>
                                <td style={{"padding": "2rem"}}>
                                    {
                                        inEditMode.status && inEditMode.rowKey === fault.id ? (
                                            <>
                                                <button
                                                    className={"btn-success"}
                                                    disabled={!pricing || !date}
                                                    onClick={() => onSave(fault.id, pricing, date)}
                                                >
                                                    Zapisz
                                                </button>

                                                <button
                                                    className={"btn-secondary"}
                                                    style={{marginLeft: 8}}
                                                    onClick={() => onCancel()}
                                                >
                                                    Wyjdź
                                                </button>

                                                <button
                                                    className={"btn-secondary"}
                                                    style={{marginLeft: 8}}
                                                    disabled={!inEditMode.statusFault}
                                                    onClick={() => finishFault(fault.id)}
                                                >
                                                    Zakończ
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                className={"btn-primary"}
                                                onClick={() => onEdit({
                                                    id: fault.id,
                                                    currentUnitPrice: fault.pricing,
                                                    currentDate: fault.arrivalDate,
                                                    statusFault: (fault.status === "accepted" ? true : null)
                                                })}
                                            >
                                                EDYCJA
                                            </button>
                                        )
                                    }
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                )
            })}
        </>
    );
}


