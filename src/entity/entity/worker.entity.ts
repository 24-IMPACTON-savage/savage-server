import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Senior } from "./senior.entity";

@Entity()
export class Worker {
    @PrimaryGeneratedColumn({
        type: "bigint"
    })
    workerId!: number

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
        type: "date",
    })
    expr!: Date

    @Column({name: 'seniorId' })
    seniorId!: number

    @ManyToMany(() => Senior)
    @JoinTable()
    senior?: Promise<Senior>
}