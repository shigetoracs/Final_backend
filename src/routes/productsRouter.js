import { Router } from "express";
import * as productController from "../controllers/productController.js";
const productsRouter = Router();

productsRouter.get("/", productController.getProducts);

productsRouter.get("/:pid", productController.getProduct);
productsRouter.post("/", productController.createProduct);

productsRouter.put("/:pid", productController.updatedProduct);
productsRouter.delete("/:pid", productController.deleteProduct);
export default productsRouter;
