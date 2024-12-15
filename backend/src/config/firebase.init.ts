import admin from "firebase-admin";
import { getStorage } from "firebase-admin/storage";
import { ServiceAccount } from "firebase-admin";
import path from "path";
import dotenv from "dotenv";

dotenv.config(); 

const serviceAccountPath = path.resolve(process.env.SERVICE_ACCOUNT_KEY_PATH || "./src/config/serviceAccountKey.json");
const serviceAccount: ServiceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET, 
});

const bucket = getStorage().bucket();

export { admin, bucket };
