import { Router } from "express";
import * as cartController from "../controllers/cartController.js";

const cartRouter = Router();

cartRouter.post("/", cartController.createCart);
cartRouter.get("/:cid", cartController.getCart);
cartRouter.post("/:cid/:pid", cartController.insertProductCart);
cartRouter.get("/purchase/:cid", cartController.createTicket);
cartRouter.get("/ticket/:tid", cartController.getTicket);

export default cartRouter;
