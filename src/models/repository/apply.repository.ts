import { AppDataSource } from "../../datasource";
import { Apply } from "../entity/apply.entity";

const applyRepository = AppDataSource.getRepository(Apply)

export const saveApply = async (workerId: number, postId: number) => {
    applyRepository.create({workerId, postId})
}