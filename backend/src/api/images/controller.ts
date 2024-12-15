import { Request, Response } from "express";
import { bucket } from "../../config/firebase.init";
import { getFirestore } from "firebase-admin/firestore";

const db = getFirestore();
const imagesCollections = db.collection("images");

const uploadImageToStorage = async (file: Express.Multer.File): Promise<string> => {
  const uniqueFileName = `${Date.now()}-${file.originalname}`; 
  const blob = bucket.file(uniqueFileName);
  const blobStream = blob.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  });

  return new Promise((resolve, reject) => {
    blobStream.on("finish", async () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      resolve(publicUrl);
    });
    blobStream.on("error", (error) => reject(error));
    blobStream.end(file.buffer);
  });
};

export const uploadImage = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No image file provided" });
      return;
    }

    const imageUrl = await uploadImageToStorage(req.file);
    await imagesCollections.add({ url: imageUrl, uploadedAt: new Date().toISOString() });

    res.status(200).json({ url: imageUrl });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload image" });
  }
};

export const deleteImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fileName } = req.params;
    const file = bucket.file(fileName);
    const [exists] = await file.exists();

    if (!exists) {
      res.status(404).json({ error: "Image not found in storage" });
      return;
    }

    await file.delete();

    const snapshot = await imagesCollections.where("url", "==", fileName).get();
    const deletePromises = snapshot.docs.map((doc) => doc.ref.delete());
    await Promise.all(deletePromises);

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete image" });
  }
};

export const getImages = async (req: Request, res: Response): Promise<void> => {
  try {
    const snapshot = await imagesCollections.get();
    const images = snapshot.docs.map((doc) => doc.data());

    res.status(200).json(images); 
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch images" });
  }
};