import { ConflictException, ForbiddenException } from "@nestjs/common";
import {
    isExistContact,
    saveSenior,
    saveWorker,
    findByContact
} from "../models/repository/user.repository";
import { Request, Response } from "express";
import { hash, genSalt } from "bcrypt";
import { configDotenv } from "dotenv";
import { SaveSeniorDto, SaveWorkerDto } from "../dto/entity.dto";
import { Worker } from "../models/entity/worker.entity";
import { getDateDiff } from "../util/function/date.set";

configDotenv();

const signUpSenior = async (req: Request, res: Response): Promise<Response> => {
    const { contact, name, address } = req.body;

    if (await isExistContact(contact)) throw new ConflictException();

    const salt = await genSalt(Number(process.env.ROUNDS!));
    const hashed = await hash(name, salt);

    const saveSeniorDto: SaveSeniorDto = {
        name : hashed,
        address,
        contact,
    };
    await saveSenior(saveSeniorDto);

    return res.status(201).json({
        data: null,
        statusCode: 201,
        statusMsg: "Created",
    });
};

const signUpWorker = async (req: Request, res: Response): Promise<Response> => {
    const { contact, name, introduce, country, passport } = req.body;

    if (await isExistContact(contact)) throw new ConflictException();

    const salt = await genSalt(Number(process.env.ROUNDS!));
    const hashed = await hash(name, salt);

    const saveWorkerDto: SaveWorkerDto = {
        contact,
        name,
        hashed,
        introduce,
        country,
        expr: new Date(Date.now()),
        passport
    };
    await saveWorker(saveWorkerDto);

    return res.status(201).json({
        data: null,
        statusCode: 201,
        statusMsg: "Created",
    });
};

const myPage = async (req: Request, res: Response): Promise<Response> => {
    const { contact } = req.payload as any

    const thisUser = await findByContact(contact)
    if(!(thisUser instanceof Worker)) throw new ForbiddenException();

    const dateToExpiresIn = getDateDiff(thisUser.expr, new Date(Date.now()).toDateString())

    const data = {
        dateToExpiresIn,
        country: thisUser.country,
        name: thisUser.name,
        passort: thisUser.passport
    }

    return res.status(200).json({
        data,
        statusCode: 200,
        statusMsg: "OK"
    })
}

export {
    signUpSenior,
    signUpWorker,
    myPage
};