import express, { Router } from "express";
import SessionController from "../controller/SessionController";
import authenticateUser from "../middleware/Authenticate";

const sessionRouter: Router = express.Router();

sessionRouter.post(
  "/create",
  authenticateUser,
  SessionController.createSession
);
sessionRouter.post("/join", authenticateUser, SessionController.joinSession);

sessionRouter.get(
  "/getmessages",
  authenticateUser,
  SessionController.getmessage
);

export default sessionRouter;
