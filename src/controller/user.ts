import { ConflictException } from "@nestjs/common";
import { isExistContact, saveSenior } from "../entity/repository/user.repository";
import { Request, Response } from "express";

const signUpSenior = async (req: Request, res: Response): Promise<Response> => {
    console.log(req.body)
    const { contact, name, address } = req.body;

    if(await isExistContact(contact)) throw new ConflictException()

    await saveSenior(contact, name, address);

    return res.status(201).json({
        data: null,
        statusCode: 201,
        statusMsg: "Create"
    })
}

export default {
    signUpSenior,
}