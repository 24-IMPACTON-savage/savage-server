import { ConflictException } from "@nestjs/common";
import {
    isExistContact,
    saveSenior,
    saveWorker,
} from "../repository/user.repository";
import { Request, Response } from "express";
import { hash, genSalt } from "bcrypt";
import { configDotenv } from "dotenv";
import { SaveSeniorDto, SaveWorkerDto } from "@src/dto/entity.dto";

configDotenv();

const signUpSenior = async (req: Request, res: Response): Promise<Response> => {
    const { contact, name, address } = req.body;

    if (await isExistContact(contact)) throw new ConflictException();

    const salt = await genSalt(Number(process.env.ROUNDS!));
    const hashed = await hash(name, salt);

    const saveSeniorDto: SaveSeniorDto = {
        name,
        address,
        contact
    }
    await saveSenior(saveSeniorDto);

    return res.status(201).json({
        data: null,
        statusCode: 201,
        statusMsg: "Created",
    });
};

const signUpWorker = async (req: Request, res: Response): Promise<Response> => {
    const { contact, name, address, introduce, country } = req.body;

    if (await isExistContact(contact)) throw new ConflictException();

    const salt = await genSalt(Number(process.env.ROUNDS!));
    const hashed = await hash(name, salt);

    const saveWorkerDto: SaveWorkerDto = {
        contact,
        name: hashed,
        address,
        introduce,
        country,
        expr: new Date(Date.now())
    }
    await saveWorker(saveWorkerDto)

    return res.status(201).json({
        data: null,
        statusCode: 201,
        statusMsg: "Created",
    });
};

export default {
    signUpSenior,
    signUpWorker,
};
