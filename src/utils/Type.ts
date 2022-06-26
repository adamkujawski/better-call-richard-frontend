type url = boolean

export interface TableData  {
    id: string,
    name: string,
    surname: string,
    email: string,
    telephone: string,
    brand: string,
    model: string,
    year: number,
    capacity: string,
    description: string,
    status : string,
    code: string,
    pricing : number,
    accept: boolean | null | url,
    arrivalDate : string | null,
    finishDate : string | null,
    createdAt : string
    updatedAt: string
}
