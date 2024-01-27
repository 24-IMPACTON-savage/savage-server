import { findWorkerListByPostId } from "../models/repository/apply.repository";
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