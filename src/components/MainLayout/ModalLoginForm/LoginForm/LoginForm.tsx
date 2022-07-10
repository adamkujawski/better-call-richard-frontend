import React, {SyntheticEvent, useState} from "react";
import './LoginForm.css';
import {useNavigate} from "react-router-dom";
import {apiUrl} from "../../../../config/api";

export const LoginForm = () => {

    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
    })
    const navigate = useNavigate();

    const updateForm = (key: string, value: string | number) => {
        setForm((form) => ({
            ...form,
            [key]: value,
        }));
    };

    const login = async (e:SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`${apiUrl}/login/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({...form})
            });

            const data = await res.json();

            if(res.status === 200) {
                navigate('/richard')
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

    return <>

        <form action="src/components/MainLayout/ModalLoginForm/LoginForm/LoginForm" className="login-form" onSubmit={login}>
            <h2>Witaj Richard</h2>

            <label>
                <p>email:</p>
                <input
                    type="text"
                    name="email"
                    required
                    maxLength={30}
                    value={form.email}
                    onChange={(e) => updateForm("email", e.target.value)}
                />
            </label>

            <label>
                <p>hasło:</p>
                <input
                    type="text"
                    name="password"
                    required
                    maxLength={13}
                    value={form.password}
                    onChange={(e) => updateForm("password", e.target.value)}
                />
            </label>
            <button className="btn-send">Zaloguj</button>
        </form>
    </>
}
