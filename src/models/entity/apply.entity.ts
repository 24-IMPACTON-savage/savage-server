import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post.entity";
import { Worker } from "./worker.entity";

@Entity()
export class Apply {
    @PrimaryGeneratedColumn()
    applyId!: number

    @Column()
    postId!: number

    @Column()
    workerId!: number

    @ManyToOne(() => Post, post => post.postId)
    post!: Post

    @ManyToOne(() => Worker, worker => worker.workerId)
    worker!: Worker
}