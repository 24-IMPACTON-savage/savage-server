import { unitEnum } from "../util/types/writepost.types"

export class SaveSeniorDto {
    constructor(
        name: string, 
        hashed: string,
        address: string, 
        contact: string
    ) {
        this.name = name
        this.hashed = hashed
        this.address = address
        this.contact = contact
    }
    name: string
    hashed: string
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
        location: locationDto[],
        contact: string,
        name: string,
        todo: string,
        payment: number,
        time: number,
        unit: unitEnum,
        latitude: number,
        longitude: number,
    ) {
        this.location = location
        this.contact = contact
        this.name = name
        this.todo = todo
        this.payment = payment
        this.time = time
        this.unit = unit
    }
    location: locationDto[]
    contact: string
    name: string
    todo: string
    payment: number
    time: number
    unit: unitEnum
}

export class locationDto {
    constructor (
        location: string,
        latitude: number,
        longitude: number,
    ) {
        this.location = location
        this.latitude = latitude
        this.longitude = longitude
    }
    location: string
    latitude: number
    longitude: number
}

export class FindAllPostDto {
    constructor(
        latitude: number,
        longitude: number
    ) {
        this.latitude = latitude,
        this.longitude = longitude
    }
    latitude: number
    longitude: number
}