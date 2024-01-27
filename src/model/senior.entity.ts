import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, JoinTable } from "typeorm";
import { Worker } from "./worker.entity";

@Entity()
export class Senior {
    @PrimaryGeneratedColumn({
        type: "bigint"
    })
    seniorId: number

    @Column({
        unique: true,
        type: 'varchar',
        length: 12
    })
    contact: string

    @Column({
        type: "varchar",
        length: 10
    })
    name: string

    @Column({
        type: "varchar",
    })
    address: string

    @ManyToMany(() => Worker)
    @JoinTable()
    worker: Worker
}