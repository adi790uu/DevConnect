import express from "express";
const cors = require("cors");
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute";
import sessionRouter from "./routes/sessionRoutes";
import { Server } from "socket.io";
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

const server = app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5174",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(`User connected! ${socket.id}`);
  socket.on("joinRoom", (session) => {
    socket.join(session);
  });

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected!`);
  });

  socket.on("sendMessage", async (data) => {
    //content --> message, name
  });
});
