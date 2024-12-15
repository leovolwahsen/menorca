import { bucket } from "../config/firebase.init";

/**
 * Upload an image to Firebase Storage
 * @param file - Multer's file object
 * @returns Public URL of the uploaded image
 */
export const uploadImage = async (file: Express.Multer.File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uniqueFileName = `${Date.now()}-${file.originalname}`;
    const fileRef = bucket.file(uniqueFileName);
    const stream = fileRef.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    stream.on("error", (error) => reject(error));
    stream.on("finish", async () => {
      try {
        await fileRef.makePublic(); 
        resolve(`https://storage.googleapis.com/${bucket.name}/${fileRef.name}`);
      } catch (error) {
        reject(error);
      }
    });

    stream.end(file.buffer);
  });
};

/**
 * Delete an image from Firebase Storage
 * @param fileName - Name of the file to delete
 */
export const deleteImage = async (fileName: string): Promise<void> => {
  try {
    await bucket.file(fileName).delete();
  } catch (error) {
    const err = error as Error;
    throw new Error(`Failed to delete file: ${err.message}`);
  }
};
