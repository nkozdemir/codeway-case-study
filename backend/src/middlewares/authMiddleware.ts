import { RequestHandler } from "express";
import { admin } from "../services/firebaseService";
import { sendResponse } from "../utils/sendResponse";

export const verifyFirebaseToken: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];

    if (!token) {
      sendResponse(res, 401, false, "Unauthorized: No token provided");
      return;
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    (req as any).user = decodedToken; // Attach user to request
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    sendResponse(res, 403, false, "Forbidden: Invalid or expired token");
    return;
  }
};
