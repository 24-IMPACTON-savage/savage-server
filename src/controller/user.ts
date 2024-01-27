import { ConflictException } from "@nestjs/common";
import { isExistContact, saveSenior, saveWorker } from "../entity/repository/user.repository";
import { Request, Response } from "express";

const signUpSenior = async (req: Request, res: Response): Promise<Response> => {
    const { contact, name, address } = req.body;

    if(await isExistContact(contact)) throw new ConflictException()

    await saveSenior(contact, name, address);

    return res.status(201).json({
        data: null,
        statusCode: 201,
        statusMsg: "Created"
    })
}

const signUpWorker = async (req: Request, res: Response): Promise<Response> => {
    const { contact, name, address, introduce, country } = req.body;

    if(await isExistContact(contact)) throw new ConflictException()

    await saveWorker(contact, name, address, introduce, country, new Date(Date.now()))

    return res.status(201).json({
        data: null,
        statusCode: 201,
        statusMsg: "Created"
    })
}

export default {
    signUpSenior,
    signUpWorker
}