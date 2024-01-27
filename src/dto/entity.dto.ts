import { unitEnum } from "../util/types/writepost.types"

export class SaveSeniorDto {
    constructor(
        name: string, 
        address: string, 
        contact: string
    ) {
        this.name = name
        this.address = address
        this.contact = contact
    }
    name: string
    address: string
    contact: string
}

export class SaveWorkerDto {
    constructor(
        name: string,
        contact: string,
        introduce: string,
        country: string,
        expr: Date,
        hashed: string,
        passport: string,
    ) {
        this.name = name,
        this.contact = contact,
        this.introduce = introduce,
        this.country = country,
        this.expr = expr,
        this.hashed = hashed,
        this.passport = passport
    }
    name: string
    contact: string
    introduce: string
    country: string
    expr: Date
    hashed: string
    passport: string
}

export class SavePostDto {
    constructor(
        location: string,
        contact: string,
        name: string,
        todo: string,
        payment: number,
        time: number,
        unit: unitEnum
    ) {
        this.location = location
        this.contact = contact
        this.name = name
        this.todo = todo
        this.payment = payment
        this.time = time
        this.unit = unit
    }
    location: string
    contact: string
    name: string
    todo: string
    payment: number
    time: number
    unit: unitEnum
}