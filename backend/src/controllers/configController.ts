import { RequestHandler } from "express";
import { deleteConfigKey, getConfig, updateConfig } from "../services/configService";
import { sendResponse } from "../utils/sendResponse";

// Get configuration (Requires API token)
export const fetchConfig: RequestHandler = async (req, res) => {
  try {
    const config = await getConfig();
    if (!config) {
      sendResponse(res, 404, false, "Configuration not found", null);
      return;
    }

    sendResponse(res, 200, true, "Configuration fetched successfully", config);
    return;
  } catch (error: any) {
    console.error("Error fetching configuration:", error);
    sendResponse(res, 500, false, error.message || "Error fetching configuration", null);
    return;
  }
};

// Update configuration (Requires Firebase auth)
export const modifyConfig: RequestHandler = async (req, res) => {
  try {
    const updates = req.body;

    const response = await updateConfig(updates);
    sendResponse(res, 200, true, "Configuration updated successfully", response);
    return;
  } catch (error: any) {
    console.error("Error updating configuration:", error);
    sendResponse(res, 500, false, error.message || "Error updating configuration", null);
    return;
  }
};

// Delete configuration (Requires Firebase auth)
export const removeConfig: RequestHandler = async (req, res) => {
  try {
    const keyToDelete = req.params.key;
    if (!keyToDelete) {
      sendResponse(res, 400, false, "Key to delete is required", null);
      return;
    }

    await deleteConfigKey(keyToDelete);

    sendResponse(res, 200, true, "Configuration removed successfully", null);
    return;
  } catch (error: any) {
    console.error("Error removing configuration:", error);
    sendResponse(res, 500, false, error.message || "Error removing configuration", null);
    return;
  }
};
