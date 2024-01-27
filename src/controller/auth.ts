import { configDotenv } from "dotenv";
import { Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";
import { compare, genSalt } from "bcrypt";
import { findByContact } from "../repository/user.repository";
import { BadRequestException, NotFoundException } from "@nestjs/common";

configDotenv();

const signIn = async (req: Request, res: Response): Promise<Response> => {
    const { contact, name } = req.body;

    const thisUser = await findByContact(contact);
    if (thisUser == null) throw new NotFoundException();

    if (!(await compare(name, thisUser.name))) throw new BadRequestException();

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

export { signIn };
