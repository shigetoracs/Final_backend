import { Router } from "express";
import passport from "passport";
import * as sessionController from "../controllers/sessionController.js";
const sessionRouter = Router();

sessionRouter.post(
  "/login",
  passport.authenticate("login", {
    failureMessage: true,
  }),
  sessionController.login
);
sessionRouter.post(
  "/register",
  passport.authenticate("register"),
  sessionController.register
);
sessionRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);
sessionRouter.get(
  "/githubSession",
  passport.authenticate("github"),
  sessionController.sessionGithub
);
sessionRouter.get("/current", passport.authenticate("jwt"), (req, res) => {
  res.status(200).send("Usuario logueado");
});
sessionRouter.get("/logout", sessionController.logout);
sessionRouter.get(
  "/testJWT",
  passport.authenticate("jwt", { session: false }),
  sessionController.testJWT
);
sessionRouter.post("/reset-password/:token", sessionController.changePassword);

export default sessionRouter;
