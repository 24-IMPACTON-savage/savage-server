import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}