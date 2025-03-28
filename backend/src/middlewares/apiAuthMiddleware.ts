import { RequestHandler } from "express";
import { sendResponse } from "../utils/sendResponse";

const API_TOKEN = process.env.API_TOKEN;

export const verifyApiToken: RequestHandler = (req, res, next) => {
  const token = req.get('x-api-key');

  if (token !== API_TOKEN) {
    sendResponse(res, 401, false, "Unauthorized", null);
    return;
  }

  next();
};
