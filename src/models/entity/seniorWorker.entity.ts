import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Senior } from "./senior.entity";
import { Worker } from "./worker.entity";

@Unique(['seniorId', 'workerId'])
@Entity()
export class SeniorWorker {
    @PrimaryGeneratedColumn()
    matchId!: number

    @Column()
    seniorId!: number

    @Column()
    workerId!: number

    @ManyToOne(() => Senior, {lazy: true})
    senior!: Senior

    @ManyToOne(() => Worker, {lazy: true})
    worker!: Worker
}