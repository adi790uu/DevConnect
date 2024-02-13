import { Request, Response } from "express";
import prisma from "../config/prisma";

const createSession = async (req: Request, res: Response) => {
  const { sessionPassword, sessionDesc } = req.body;
  //@ts-ignore
  const userId = req.user;
  const session = await prisma.session.create({
    data: {
      description: sessionDesc,
      creatorId: userId,
      password: sessionPassword,
    },
  });

  console.log(session);
};

const joinSession = (req: Request, res: Response) => {};

export = {
  createSession,
  joinSession,
};
