import { Column, Entity, Generated, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Senior } from "./senior.entity";

@Entity()
export class Worker {
    @PrimaryGeneratedColumn()
    workerId: number = 0

    @Column({
        unique: true,
        type: "varchar",
        length: 12
    })
    contact!: string

    @Column({
        type: "varchar",
        length: 10
    })
    name!: string

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

    @Column({name: 'seniorId' })
    seniorId!: number

    @ManyToMany(() => Senior)
    @JoinTable()
    senior?: Promise<Senior>
}