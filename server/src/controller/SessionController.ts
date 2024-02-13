import { Request, Response } from "express";
import prisma from "../config/prisma";

const createSession = async (req: Request, res: Response) => {
  try {
    const { sessionPassword, sessionDesc } = req.body;

    // console.log(se);

    if (!sessionDesc) {
      return res.status(400).json({ message: "Enter Session Description" });
    }
    //@ts-ignore
    const { userId } = req.user;

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const session = await prisma.session.create({
      data: {
        description: sessionDesc,
        creatorId: userId,
        password: sessionPassword,
      },
    });

    console.log(session);
    console.log(userId);
    res
      .status(201)
      .json({ message: "Session Created...", session: session.id });
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const joinSession = async (req: Request, res: Response) => {
  try {
    const { sessionPassword } = req.body;

    if (!sessionPassword) {
      return res.status(400).json({ error: "Session password is required" });
    }

    const sessionExists = await prisma.session.findUnique({
      where: {
        password: sessionPassword,
      },
    });

    if (sessionExists) {
      return res.status(200).json({
        success: true,
        message: "Joining session....",
        session: sessionExists.id,
      });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Session not found..." });
    }
  } catch (error) {
    console.error("Error joining session:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getmessage = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.body;

    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        messages: {
          include: {
            author: true,
          },
        },
      },
    });

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    const sessions = session?.messages;
    res.status(201).json({ sessions });
  } catch (error) {
    console.error("Error retrieving messages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export = {
  createSession,
  joinSession,
  getmessage,
};
