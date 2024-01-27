import { findWorkerListByPostId } from "../models/repository/apply.repository";
import { findWorkerById } from "../models/repository/apply.repository";
import { Request, Response } from "express";

export const getWorkerList = async (req: Request, res: Response) => {
    const { postId } = req.params;
    const workerList = await findWorkerListByPostId(Number(postId));

    return res.status(200).json({
        data: workerList,
        statusCode: 200,
        statusMsg: "OK"
    })
}

export const getWorker = async (req: Request, res: Response) => {
    const { workerId, applyId } = req.query;
    const worker = await findWorkerById(Number(workerId), Number(applyId))

    return res.status(200).json({
        data: worker,
        statusCode: 200,
        statusMsg: "OK"
    })
}