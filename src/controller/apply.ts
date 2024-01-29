import { findByContactFromWorker } from "../models/repository/user.repository";
import { replaceWorker, saveApply } from "../models/repository/apply.repository";
import { findPostById } from "../models/repository/post.repository";
import { Request, Response } from "express";

export const apply = async (req: Request, res: Response) => {
    const { postId } = req.params;
    const  { contact } = req.payload as any;

    const thisUser = await findByContactFromWorker(contact)
    const thisPost = await findPostById(Number(postId))

    await saveApply(thisUser.workerId, thisPost.postId)

    return res.status(201).json({
        data: null,
        statusCode: 201,
        statusMsg: "Created"
    })
}

export const hire = async (req: Request, res: Response) => {
    const { postId, workerId } = req.body

    await replaceWorker(workerId, postId)

    return res.status(201).json({
        data: null,
        statusCode: 201,
        statusMsg: "Created"
    })
}