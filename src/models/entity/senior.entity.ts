import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Senior {
    @PrimaryGeneratedColumn({
        type: "int"
    })
    seniorId!: number

    @Column({
        unique: true,
        type: 'varchar',
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
        type: "varchar",
    })
    address!: string
}