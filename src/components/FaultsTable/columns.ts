import {TableData} from "../../utils/Type";
import {Column} from "react-table";

export const COLUMNS: Column<TableData>[] = [
    {
        Header: 'ID',
        accessor: 'id',
    }, {
        Header: 'Imię',
        accessor: 'name',
    }, {
        Header: 'Nazwisko',
        accessor: 'surname',
    }, {
        Header: 'Numer telefonu',
        accessor: 'email',
    }, {
        Header: 'Adres e-mail',
        accessor: 'telephone',
    }, {
        Header: 'Marka auta',
        accessor: 'brand',
    }, {
        Header: 'Model auta',
        accessor: 'model',
    }, {
        Header: 'Numer rejestracyjny',
        accessor: 'year',
    }, {
        Header: 'Rok produkcji',
        accessor: 'capacity',
    }, {
        Header: 'Rodzaj paliwa',
        accessor: 'description',
    }, {
        Header: 'Pojemność silnika',
        accessor: 'status',
    }, {
        Header: 'Opis usterki',
        accessor: 'code',
    }, {
        Header: 'Status usterki',
        accessor: 'pricing',
    }, {
        Header: 'Wycena',
        accessor: 'accept',
    }, {
        Header: 'Akceptacja Kosztów',
        accessor: 'arrivalDate',
    }, {
        Header: 'Data przyjazdu auta',
        accessor: 'finishDate',
    }, {
        Header: 'Data zakończenia naprawy',
        accessor: 'createdAt',
    }, {
        Header: 'Data utrzenia usterki',
        accessor: 'updatedAt',
    },

]
