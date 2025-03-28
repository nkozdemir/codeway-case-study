import { db } from "./firebaseService";
import * as admin from "firebase-admin";

const CONFIG_COLLECTION = process.env.CONFIG_COLLECTION;
const CONFIG_DOCUMENT = process.env.CONFIG_DOCUMENT;
if (!CONFIG_COLLECTION || !CONFIG_DOCUMENT) {
  throw new Error("Configuration collection or document not set in environment variables");
}

// Get configuration
export const getConfig = async () => {
  const configRef = db.collection(CONFIG_COLLECTION).doc(CONFIG_DOCUMENT);
  const doc = await configRef.get();
  if (!doc.exists) {
    throw new Error("Configuration document not found");
  }
  const configData = doc.data();
  if (!configData) {
    throw new Error("Configuration data is empty");
  }
  return configData;
};

// Update configuration (with transaction for conflict prevention)
export const updateConfig = async (updates: any) => {
  const configRef = db.collection(CONFIG_COLLECTION).doc(CONFIG_DOCUMENT);

  return db.runTransaction(async (transaction) => {
    const doc = await transaction.get(configRef);
    if (!doc.exists) {
      throw new Error("Configuration document not found");
    }

    transaction.update(configRef, updates);
    console.log("Configuration updated successfully");
  });
};

// Function to delete a specific configuration key under a transaction
export const deleteConfigKey = async (key: string) => {
  // Check if the key is valid
  if (!key || typeof key !== 'string') throw new Error("Invalid key provided");

  const configRef = db.collection(CONFIG_COLLECTION).doc(CONFIG_DOCUMENT);

  try {
    // Start the transaction
    await db.runTransaction(async (transaction) => {
      // Get the current document snapshot inside the transaction
      const doc = await transaction.get(configRef);

      if (!doc.exists) {
        throw new Error("Configuration document not found");
      }

      // Perform the delete operation inside the transaction
      transaction.update(configRef, {
        [key]: admin.firestore.FieldValue.delete(),
      });

      console.log(`Successfully deleted configuration key: ${key}`);
    });
  } catch (error) {
    console.error("Error deleting configuration key inside transaction:", error);
  }
};
