import { responseData } from "./response.dto";

export interface basicResponse {
    data: responseData,
    statusCode: number,
    statusMsg: string
}