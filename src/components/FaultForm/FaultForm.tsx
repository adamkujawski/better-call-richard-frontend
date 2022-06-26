import React, {SyntheticEvent, useState} from "react";


export const FaultForm = () => {

    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState('');

    const [form, setForm] = useState({
        name: "",
        surname: "",
        telephone: "",
        email: "",
        brand: "",
        model: "",
        registration_no: "",
        year: 0,
        type_fuel: "",
        capacity: 0,
        description: "",
    });

    const updateForm = (key: string, value: any) => {
        setForm((form) => ({
            ...form,
            [key]: value,
        }));
    };

    const saveFault = async (e: SyntheticEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            const res = await fetch("http://localhost:3001/fault", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...form,
                }),
            });

            const data = await res.json();

            setCode(data.code);

            console.log(res)
            console.log(data)

        }
        catch (err) {
            err ?? console.log(err);
        }
        finally {
            setLoading(false);
        }


    };

    if (loading) {
        return <h1>Trwa zgłaszanie usterki...</h1>;
    }

    if (code){
        return <h2>Dziękuje! Twoja usterka została dodana z kodem {code}. Za chwilę powinieneś otrzymać wiadomość e-mail</h2>
    }

    return (
        <>
            <form action="" className="fault-form" onSubmit={saveFault}>
                <h1>Wypełnij Formularz</h1>

                    <label>
                        <p>Imię:</p>
                        <input
                            type="text"
                            name="name"
                            required
                            maxLength={13}
                            value={form.name}
                            onChange={(e) => updateForm("name", e.target.value)}
                        />
                    </label>

                    <label>
                        <p>Nazwisko:</p>
                        <input
                            type="text"
                            name="surname"
                            required
                            maxLength={28}
                            value={form.surname}
                            onChange={(e) => updateForm("surname", e.target.value)}
                        />
                    </label>

                    <label>
                        <p>Nr telefonu:</p>
                        <input
                            type="tel"
                            name="telephone"
                            required
                            maxLength={11}
                            value={form.telephone}
                            onChange={(e) => updateForm("telephone", e.target.value)}
                        />
                    </label>

                    <label>
                        <p>Adres e-mal:</p>
                        <input
                            type="email"
                            name="email"
                            required
                            maxLength={63}
                            value={form.email}
                            onChange={(e) => updateForm("email", e.target.value)}
                        />
                    </label>

                    <label>
                        <p>Marka auta:</p>
                        <input
                            type="text"
                            name="brand"
                            required
                            maxLength={20}
                            value={form.brand}
                            onChange={(e) => updateForm("brand", e.target.value)}
                        />
                    </label>

                    <label>
                        <p>Model auta:</p>
                        <input
                            type="text"
                            name="model"
                            required
                            maxLength={20}
                            value={form.model}
                            onChange={(e) => updateForm("model", e.target.value)}
                        />
                    </label>

                    <label>
                        <p>Numer rejestracyjny:</p>
                        <input
                            type="text"
                            name="registration_no"
                            required
                            maxLength={9}
                            value={form.registration_no}
                            onChange={(e) => updateForm("registration_no", e.target.value)}
                        />
                    </label>

                    <label>
                        <p>Rocznik auta:</p>
                        <input
                            type="number"
                            name="year"
                            min={1960}
                            max={new Date().getFullYear()}
                            required
                            maxLength={30}
                            value={form.year}
                            onChange={(e) => updateForm("year", e.target.value)}
                        />
                    </label>

                    <label>
                        <p>Rodzaj paliwa:</p>
                        <select name="type_fuel" required value={form.type_fuel} onChange={(e) => updateForm("type_fuel", e.target.value)}>
                            <option value="">...</option>
                            <option value="lpg">LPG+Benzyna</option>
                            <option value="diesel">Diesel</option>
                            <option value="benzyna">Benzyna</option>
                        </select>
                    </label>

                    <label>
                        <p>Pojemność silnika cm3:</p>
                        <input
                            type="number"
                            name="capacity"
                            required
                            min={250}
                            max={8000}
                            value={form.capacity}
                            onChange={(e) => updateForm("capacity", e.target.value)}
                        />
                    </label>

                    <label>
                        <p>Opis usterki:</p>
                        <textarea
                            name="description"
                            required
                            maxLength={1024}
                            value={form.description}
                            onChange={(e) => updateForm("description", e.target.value)}
                        />
                    </label>
                <button className="btn-send">Zapisz</button>
            </form>
        </>
    );
};
