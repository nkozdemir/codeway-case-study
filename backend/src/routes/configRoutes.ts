import express from "express";
import { fetchConfig, modifyConfig, removeConfig } from "../controllers/configController";
import { verifyApiToken } from "../middlewares/apiAuthMiddleware";
import { verifyFirebaseToken } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/config", verifyApiToken, fetchConfig);
router.patch("/config", verifyFirebaseToken, modifyConfig);
router.delete("/config/:key", verifyFirebaseToken, removeConfig);

export default router;
