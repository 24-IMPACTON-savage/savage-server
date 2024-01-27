import { configDotenv } from "dotenv";
import { Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";
import { compare } from "bcrypt";
import { findByContact } from "../models/repository/user.repository";
import {
    BadRequestException,
    NotAcceptableException,
    NotFoundException,
} from "@nestjs/common";

configDotenv();

const signIn = async (req: Request, res: Response): Promise<Response> => {
    const { contact, name } = req.body;

    const thisUser = await findByContact(contact);
    if (thisUser == null) throw new NotFoundException();

    if (!(await compare(name, thisUser.hashed))) throw new BadRequestException();

    const expiresIn = Date.now() + 1000 * 3600 * 24 * 7 * 52;

    const accesstoken = sign(
        {
            contact,
        },
        process.env.SALT!,
        {
            expiresIn,
        }
    );

    return res.status(200).json({
        data: {
            accesstoken,
            expiresIn: new Date(expiresIn).toISOString(),
        },
        statusCode: 200,
        statusMsg: "OK",
    });
};

const validateToken = async (
    req: Request,
    res: Response,
    next: any
): Promise<void> => {
    const auth = req.get("authorization") || req.get("Authorization")
    if (!auth) throw new BadRequestException();

    const hasTokenSpace = auth.includes(" ");
    if (!hasTokenSpace) throw new NotAcceptableException();

    const toBeValidate = auth.split(" ")[1];
    const jwt = verify(toBeValidate, process.env.SALT!);

    req.payload = jwt

    next();
};

export { 
    signIn, 
    validateToken
};
