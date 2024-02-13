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

const joinSession = async (req: Request, res: Response) => {
  const sessionPassword = req.body;
  const sessionExists = await prisma.session.findUnique({
    where: {
      password: sessionPassword,
    },
  });

  if (sessionExists) {
    return res
      .status(200)
      .json({ success: true, message: "Joining session...." });
  }
};

export = {
  createSession,
  joinSession,
};
