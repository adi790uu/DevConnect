import express from "express";
const cors = require("cors");
import dotenv from "dotenv";
import userRouter from "./routes/userRoute";
import sessionRouter from "./routes/sessionRoutes";
import { compileC, compileCpp, compileJava, compilePy } from "./Compile";
import { Server } from "socket.io";
dotenv.config();
import prisma from "./config/prisma";
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(express.json());
const connectToDBcheck = async () => {
  try {
    await prisma.$connect();
    console.log("DataBase is connected");
  } catch (error) {
    console.log("Error in connceting DB: ", error);
  }
};

app.post("/api/compile", async (req, res) => {
  const { lang, userCode, userInput } = req.body;

  try {
    switch (lang) {
      case "python":
        const pyResult = compilePy(userCode, userInput);
        res.status(200).json({ output: pyResult });
        break;
      case "cpp":
        const cppResult = compileCpp(userCode, userInput);
        res.status(200).json({ output: cppResult });
        break;
      case "java":
        const javaResult = compileJava(userCode, userInput);
        res.status(200).json({ output: javaResult });
        break;
      case "c":
        const cResult = compileC(userCode, userInput);
        res.status(200).json({ output: cResult });
        break;
      default:
        return res.status(400).json({ error: "Unsupported language." });
    }
  } catch {
    res.status(500).json({ error: "An error occurred during compilation." });
  }
});

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
  socket.on("joinRoom", async (session) => {
    socket.join(session);
  });

  socket.on("changeCode", (data) => {
    socket.broadcast.emit("changedCode", data);
  });

  socket.on("sendMessage", async (data) => {
    const username = await prisma.user.findUnique({
      where: {
        id: data.userId,
      },
    });

    console.log(username);
    const message = await prisma.message.create({
      data: {
        content: data.content.text,
        authorId: data.userId,
        sessionId: data.sessionId,
      },
    });

    const data2 = {
      message: message.content,
      time: message.timestamp,
      sender: username?.username,
    };

    console.log(data2);

    socket.broadcast.emit("message", data2);
  });

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected!`);
  });
});
