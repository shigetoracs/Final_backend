import { Router } from "express";
import {
  getUsers,
  sendDocuments,
  deleteInactiveUsers,
  deleteUser,
} from "../controllers/userController.js";
const userRouter = Router();
userRouter.get("/", async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send("Error al consultar users:", e);
  }
});
userRouter.get("/session", (req, res) => {
  try {
    if (req.session.user) {
      res.status(200).json(req.session.user);
    } else {
      res.status(401).send("Usuario no autenticado");
    }
  } catch (error) {
    res.status(500).send("Error interno del servidor");
  }
});

userRouter.post("/:uid/documents", sendDocuments);

userRouter.delete("/", deleteInactiveUsers);

userRouter.delete("/admin/:uid", deleteUser);
export default userRouter;
