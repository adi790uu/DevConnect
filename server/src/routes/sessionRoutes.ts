import express, { Router } from "express";
import SessionController from "../controller/SessionController";
import authenticateUser from "../middleware/Authenticate";

const sessionRouter: Router = express.Router();

sessionRouter.post("/create", SessionController.createSession);
sessionRouter.post("/join", SessionController.joinSession);

export default sessionRouter;
