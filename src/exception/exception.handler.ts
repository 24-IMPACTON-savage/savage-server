import { Request, Response } from "express";

export default function exceptionHandler(callback: any) {
    return (req: Request, res: Response, next: any) => {
        callback(req, res, next).catch(next);
    }
}