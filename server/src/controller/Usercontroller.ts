import { Request, Response } from "express";
import prisma from "../config/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const jwtsecret = process.env.JWT_SECRET;

const createuser = async (req: Request, res: Response) => {
  let success = true;
  let alreadyExist = false;
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      success = false;
      return res.status(400).json({ message: "Creds not entered" });
    }
    const user = await prisma.user.findFirst({
      where: { username },
    });

    if (user) {
      alreadyExist = true;
      return res.status(500).json({
        message: "User name already exist",
        alreadyExist: alreadyExist,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    if (!jwtsecret) {
      throw new Error("JWT secret not defined");
    }

    const token = jwt.sign({ userId: newUser.id }, jwtsecret, {
      expiresIn: "1d",
    });
    res.json({
      message: "user created succesfully",
      token: token,
      success: success,
      alreadyExist: alreadyExist,
      userid: newUser.id,
      username: newUser.username,
    });
  } catch (error) {
    success = false;
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error", success: success });
  } finally {
    await prisma.$disconnect();
  }
};

const login = async (req: Request, res: Response) => {
  let success = true;
  let notExist = false;
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      success = false;
      return res.status(400).json({ message: "Creds not entered" });
    }

    const user = await prisma.user.findFirst({
      where: { username },
    });

    if (!user) {
      notExist = true;
      return res.status(500).json({ message: "User does not exist" });
    }

    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      success = false;
      return res.status(500).json({ message: "invalid creds" });
    }

    if (!jwtsecret) {
      throw new Error("JWT secret not defined");
    }

    const token = jwt.sign({ userId: user.id }, jwtsecret, { expiresIn: "1d" });

    console.log(token);
    res.status(200).json({
      message: "login successfull",
      token: token,
      success: success,
      notExist: notExist,
      userid: user.id,
      username: user.username,
    });
  } catch (error) {
    success = false;
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
};

export = {
  createuser,
  login,
};
