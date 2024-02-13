import express from "express";
const cors = require("cors");
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute";
import sessionRouter from "./routes/sessionRoutes";
dotenv.config();
const prisma: PrismaClient = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());
const connectToDBcheck = async () => {
  try {
    await prisma.$connect();
    console.log("DataBase is connected");
  } catch (error) {
    console.log("Error in connceting DB: ", error);
  }
};

connectToDBcheck();

app.use("/api/user", userRouter.userRouter);
app.use("/api/session", sessionRouter);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
