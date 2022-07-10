import React, {SyntheticEvent, useState} from "react";
import './StatusForm.css'
import {apiUrl} from "../../../../config/api";

export const StatusForm = () => {

    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState('');
    const [form, setForm] = useState({
        code: "",
    })

    const updateForm = (key: string, value: string | number) => {
        setForm((form) => ({
            ...form,
            [key]: value,
        }));
    };

    const getStatus = async (e:SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`${apiUrl}/fault/status/${form.code}`);
            console.log(res)
            const code = await res.json();

            switch(code){
                case 'wating': setCode('Oczekująca') ;
                break;
                case 'new': setCode('Oczekuje na wstępną wycenę') ;
                break;
                case 'finished': setCode('Twoja usterka jest naprawiona');
                break;
            }

        }

        catch (err) {
            err ?? console.log(err);
        }
        finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <h1>Czekaj...</h1>;
    }

    if (code) {
        return <h2>Twój aktualny status usterki to: {code}</h2>
    }

    return <>

        <form action="src/components/MainLayout/ModalLoginForm/LoginForm/LoginForm" className="login-form" onSubmit={getStatus}>
            <h2>Podaj Kod Usterki:</h2>
            <label>
                <p>Kod:</p>
                <input
                    type="text"
                    name="code"
                    required
                    maxLength={30}
                    value={form.code}
                    onChange={(e) => updateForm("code", e.target.value)}
                />
            </label>
            <button className="btn-send">Sprawdż</button>
        </form>
    </>
}
