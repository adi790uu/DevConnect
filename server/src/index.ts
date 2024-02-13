import express from "express";
const cors = require("cors");
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute";
import sessionRouter from "./routes/sessionRoutes";
import { Server } from "socket.io";
dotenv.config();
import prisma from "./config/prisma";
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

const server = app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(`User connected! ${socket.id}`);
  socket.on("joinRoom", async (session) => {
    socket.join(session);
  });

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected!`);
  });

  socket.on("sendMessage", async (data) => {
    //content --> message, userId, sessionId
    const username = await prisma.user.findUnique({
      where: {
        id: data.userId,
      },
    });
    const message = await prisma.message.create({
      data: {
        content: data.content,
        authorId: data.userId,
        sessionId: data.sessionId,
      },
    });

    socket.to(data.sessionId).emit("message", {
      message: message.content,
      time: message.timestamp,
      sender: username,
    });
  });
});
