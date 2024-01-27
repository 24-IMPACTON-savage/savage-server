export default class ErrorStatus extends Error {
    status;
    constructor(message: string, status: ErrorCode) {
        super(message);
        this.status = status
    }
}

export type ErrorCode = {
    400: "BAD REQUEST",
    401: "UNAUTHORIZED",
    403: "FORBIDDEN",
    404: "NOT FOUND",
    409: "CONFLICT",
}