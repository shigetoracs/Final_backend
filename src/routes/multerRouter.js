import { Router } from "express";
import { insertImg } from "../controllers/multerController.js";
import { uploadDocs, uploadPerfs, uploadProd } from "../config/multer.js";
const multerRouter = Router();

multerRouter.post("/profiles", uploadPerfs.single("profile"), insertImg);
multerRouter.post("/docs", uploadDocs.single("doc"), insertImg);
multerRouter.post("/products", uploadProd.single("product"), insertImg);

export default multerRouter;
