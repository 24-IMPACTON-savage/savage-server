import {Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Post {
    @PrimaryGeneratedColumn({
        type: "int"
    })
    postId!: number

    @Column({
        type: 'varchar',
        length: 50
    })
    title!: string

    @Column({
        type: 'text'
    })
    body!: string

    @Column({
        type: 'varchar',
        length: 30
    })
    address!: string
}