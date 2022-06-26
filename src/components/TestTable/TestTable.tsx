import React, {useEffect, useState} from 'react';

export const TestTable = () =>{

    const [data, setData] = useState([]);
    const [pricing, setPricing] = useState<any | null>(null);
    const [date, setDate] = useState<any | null>(null);
    const [inEditMode, setInEditMode] = useState({
        status: false,
        rowKey: null
    });

    useEffect(() => {
        (async ()=>{
            await fetchInventory();
        })();
    }, []);

    const fetchInventory = async () => {
        const res = await fetch(`http://localhost:3001/fault`);
        const data = await res.json();
        setData(data);
    }

    const onEdit = ({id, currentUnitPrice, currentDate}:any) => {

        setInEditMode({
            status: true,
            rowKey: id
        })
        console.log(id, currentUnitPrice,currentDate)
        setPricing(currentUnitPrice);
        setDate(currentDate)
    }

    const updateInventory = async (id:any, pricing:any,date:any) => {

        const res = await fetch(`http://localhost:3001/fault/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                pricing,
                arrivalDate: date,
            }),
        });

        const data = await res.json();
        console.log(data)

        await onCancel();
        await fetchInventory();
    }

    const onSave = async (id:any, newUnitPrice:any,date:any) => {
        console.log(id,newUnitPrice,date)
        await updateInventory(id, newUnitPrice, date);
    }

    const onCancel = async () => {
        // reset the inEditMode state value
       await  setInEditMode({
            status: false,
            rowKey: null
        })
        // reset the unit price state value
        await setPricing(null);
    }

    return (
        <div className="container">
            <table>
                <thead>
                <tr>
                    <th>Imię</th>
                    <th>Nazwisko</th>
                    <th>Nr Telefonu</th>
                    <th>Email</th>
                    <th>Marka</th>
                    <th>Model</th>
                    <th>Nr Rej.</th>
                    <th>Rocznik</th>
                    <th>Rodzaj Paliwa</th>
                    <th>Pojemność cm3</th>
                    <th>Opis usterki</th>
                    <th>Status</th>
                    <th>Kod</th>
                    <th>Wycena</th>
                    <th>Akceptcja</th>
                    <th>Data Przyjazdu</th>
                    <th>Data Zakończenia</th>
                    <th>Utworzony:</th>
                    <th>Ostatnia mod.:</th>
                    <th>ZMIANA:</th>
                </tr>
                </thead>
                <tbody>
                {
                    data.map((item:any) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.surname}</td>
                            <td>{item.telephone}</td>
                            <td>{item.email}</td>
                            <td>{item.brand}</td>
                            <td>{item.model}</td>
                            <td>{item.registration_no}</td>
                            <td>{item.year}</td>
                            <td>{item.typeFuel}</td>
                            <td>{item.capacity}</td>
                            <td>{item.description}</td>
                            <td>{item.status}</td>
                            <td>{item.code}</td>
                            <td>
                                {
                                    inEditMode.status && inEditMode.rowKey === item.id ? (
                                        <input value={pricing}
                                               onChange={(event) => setPricing(event.target.value)}
                                        />
                                    ) : (
                                        item.pricing
                                    )
                                }
                            </td>
                            <td>{item.accept}</td>
                            <td>
                                {/*{item.arrivalDate}*/}
                                {
                                    inEditMode.status && inEditMode.rowKey === item.id ? (
                                        <input
                                            type="date"
                                            value={date}
                                               onChange={(event) => setDate(event.target.value)}
                                        />
                                    ) : (
                                        item.arrivalDate
                                    )
                                }
                            </td>
                            <td>{item.finishDate}</td>
                            <td>{(item.createdAt).slice(0,10)}</td>
                            <td>{(item.updatedAt).slice(0,10)}</td>
                            <td>
                                {
                                    inEditMode.status && inEditMode.rowKey === item.id ? (
                                        <>
                                            <button
                                                className={"btn-success"}
                                                onClick={() => onSave(item.id, pricing, date)}
                                            >
                                                Save
                                            </button>

                                            <button
                                                className={"btn-secondary"}
                                                style={{marginLeft: 8}}
                                                onClick={() => onCancel()}
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            className={"btn-primary"}
                                            onClick={() => onEdit({id: item.id, currentUnitPrice: item.pricing, currentDate: item.arrivalDate})}
                                        >
                                            Edit
                                        </button>
                                    )
                                }
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}


