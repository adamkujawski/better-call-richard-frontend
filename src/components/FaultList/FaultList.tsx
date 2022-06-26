// import {useTable} from "react-table";
import React, {useEffect, useMemo, useState} from "react";
import './FaultList.css'
import './table.css'
import {TestTable} from "../TestTable/TestTable";


export const FaultList = () => {


    const [loading, setLoading] = useState(false)
    const [faultList, setFaultList] = useState([]);
    const [column, setsColumn] = useState([''])

    useEffect(() => {
        (async () => {
            setLoading(true)
            try {
                const res = await fetch(`http://localhost:3001/fault`);
                const data = await res.json();
                console.log(data)
                setFaultList(data);
                setsColumn(Object.keys(data[0]))

            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }

        })();

    }, []);


    if (loading || faultList.length === 0) {
        return <h1 style={{color: "white"}}>Trwa ładowanie danych...</h1>
    }


    return (

        <>
            <TestTable/>
            {/*<table className="table">*/}
            {/*    <thead>*/}
            {/*    <tr>*/}
            {/*        {*/}
            {/*            column.map((th) => <th key={th}>{th}</th>)*/}
            {/*        }*/}
            {/*    </tr>*/}
            {/*    </thead>*/}
            {/*    <tbody>*/}
            {/*    {*/}
            {/*        faultList.map((data,i) => (*/}
            {/*                <tr key={i} >*/}
            {/*                    {*/}
            {/*                        column.map((v,i) => <td key={i}>{data[v]}</td>)*/}
            {/*                    }*/}
            {/*                    <td><button>Edit</button></td>*/}
            {/*                </tr>*/}
            {/*            )*/}
            {/*        )*/}
            {/*    }*/}
            {/*    </tbody>*/}
            {/*</table>*/}
        </>


    )
}
