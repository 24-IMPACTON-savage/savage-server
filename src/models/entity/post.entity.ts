import { unitEnum } from '../../util/types/writepost.types'
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Senior } from './senior.entity'

@Entity()
export class Post {
    @PrimaryGeneratedColumn({
        type: "int"
    })
    postId!: number

    @Column({
        type: 'varchar'
    })
    contact!: string

    @Column({
        type: 'varchar'
    })
    name!: string

    @Column({
        type: 'varchar'
    })
    todo!: string

    @Column({
        type: 'int'
    })
    payment!: number

    @Column({
        type: 'varchar'
    })
    unit!: unitEnum

    @Column({
        type: 'varchar'
    })
    time!: string

    @Column()
    seniorId!: number

    @ManyToOne(() => Senior, senior => senior.seniorId)
    senior!: Senior
}