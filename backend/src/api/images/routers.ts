import express from "express";
import multer from "multer";
import * as imagesController from "./controller"

export const imagesRouter =  express.Router();
const upload = multer({ storage: multer.memoryStorage() });

imagesRouter.post("/upload", upload.single("image"), imagesController.uploadImage);
imagesRouter.delete("/delete/:fileName", imagesController.deleteImage);
imagesRouter.get("/images", imagesController.getImages);