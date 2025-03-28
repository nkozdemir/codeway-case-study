import { Response } from "express";
import { ApiResponse } from "../types/apiResponse";

export function sendResponse<T>(res: Response, status: number, success: boolean, message: string, data: T | null = null) {
    const response: ApiResponse<T> = { status, success, message, data };
    return res.status(status).json(response);
}
