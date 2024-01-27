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
        address: string,
        contact: string,
        introduce: string,
        country: string,
        expr: Date
    ) {
        this.name = name,
        this.address = address,
        this.contact = contact,
        this.introduce = introduce,
        this.country = country,
        this.expr = expr
    }
    name: string
    address: string
    contact: string
    introduce: string
    country: string
    expr: Date
}