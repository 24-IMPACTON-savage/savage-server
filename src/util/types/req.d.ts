import { JwtPayload } from 'jsonwebtoken'

export {};

declare global {
    namespace Express {
        type Abc = string;
        interface Request {
            payload: JwtPayload | string | contact
        }
    }
}

export type contact = string