import { Column, Entity, Generated, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Senior } from "./senior.entity";

@Entity()
export class Worker {
    @PrimaryGeneratedColumn({
        "type" : "int"
    })
    workerId!: number

    @Column({
        unique: true,
        type: "varchar",
        length: 25
    })
    contact!: string

    @Column({
        type: "varchar"
    })
    name!: string

    @Column({
        type: "varchar"
    })
    hashed!: string

    @Column({
        type: "text"
    })
    introduce!: string

    @Column({
        type: "varchar",
        length: 10
    })
    country!: string

    @Column({
        type: "date",
    })
    expr!: Date

    @Column({
        type: "varchar"
    })
    passport!: string
}