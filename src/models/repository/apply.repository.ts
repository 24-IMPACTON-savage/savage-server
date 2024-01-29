import { ConflictException, NotFoundException } from "@nestjs/common";
import { AppDataSource } from "../../datasource";
import { Apply } from "../entity/apply.entity";
import { Worker } from "../entity/worker.entity";
import { Post } from "../entity/post.entity";
import { SeniorWorker } from "../entity/seniorWorker.entity";
import { findPostById } from "./post.repository";
import { Senior } from "../entity/senior.entity";

const applyRepository = AppDataSource.getRepository(Apply)
const workerRepository = AppDataSource.getRepository(Worker)
const postRepository = AppDataSource.getRepository(Post)
const seniorWorkerRepository = AppDataSource.getRepository(SeniorWorker)
const seniorRepository = AppDataSource.getRepository(Senior)

export const saveApply = async (workerId: number, postId: number) => {
    const thisApply = await applyRepository.findOneBy({workerId})
    if(thisApply) throw new ConflictException()
    await applyRepository.save({workerId, postId, })
}

export const findWorkerListByPostId = async (postId: number) => {
    return await applyRepository.createQueryBuilder('apply')
        .select(['worker.workerId', 'worker.name', 'worker.introduce'])
        .from(Worker, 'worker')
        .addFrom(Post, 'post') 
        .where('worker.workerId = apply.workerId')
        .andWhere('post.postId = :applyPostId', {applyPostId: postId})
        .getRawMany()
}

export const findWorkerById = async (workerId: number, postId: number) => {
    const worker = await workerRepository.findOneBy({ workerId })
    const apply = await postRepository.findOneBy({ postId })
    if(!worker || !apply) throw new NotFoundException()
    return {
        workerId,
        name : worker.name,
        contact: worker.contact,
        introduce: worker.introduce,
        time: apply.time,
        unit: apply.unit,
        payment: apply.payment
    }
}

export const replaceWorker = async (workerId: number, postId: number) => {
    const apply = await applyRepository.findOneBy({workerId, postId})
    if(!apply) throw new NotFoundException()

    const senior = await seniorRepository.findOneBy({seniorId: (await findPostById(postId)).seniorId})
    if(!senior) throw new NotFoundException()

    await seniorWorkerRepository.save({
        seniorId: senior.seniorId,
        workerId,
    })
}