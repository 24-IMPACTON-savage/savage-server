import { unitEnum } from "@src/util/types/writepost.types";
import { locationDto } from "./entity.dto";

export class ModifyDto {
    constructor(
        location: locationDto[],
        name: string,
        todo: string,
        payment: number,
        unit: unitEnum,
        time: string,
        contact: string
    ) {
        this.location = location
        this.name = name
        this.todo = todo
        this.payment = payment
        this.unit = unit
        this.time = time
        this.contact = contact
    }
    location: locationDto[]
    name: string
    todo: string
    payment: number
    unit: unitEnum
    time: string
    contact: string
}