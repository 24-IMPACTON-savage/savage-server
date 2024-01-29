import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post.entity";

@Entity()
export class Location {
    @PrimaryGeneratedColumn()
    locationId!: number;

    @Column({
        type: 'varchar',
    })
    location!: string;

    @Column({
        type: "double"
    })
    latitude!: number

    @Column({
        type: "double"
    })
    longitude!: number

    @Column()
    postId!: number;

    @ManyToOne(() => Post, post => post.postId)
    post!: Post
}