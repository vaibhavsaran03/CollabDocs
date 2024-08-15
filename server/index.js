import { Server } from "socket.io";
import Connection from "./config/db.js";
import {
  getDocument,
  updateDocument,
} from "./controller/documentController.js";
import cors from "cors";
import express from "express";
import auth from "./routes/auth.js";
import docs from "./routes/docs.js";
import user from "./routes/user.js";
import passport from "passport";
import passportConfig from "./utils/passport.js";
import { configDotenv } from "dotenv";
import { createServer } from "http";

import router from "./routes/auth.js";

configDotenv();
const app = express();
const PORT = process.env.PORT || 9000;

Connection();

// Init middleware
app.use(express.json({ extended: false }));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST","PUT", "DELETE"],
  })
);

//Initialize passport
passportConfig(app);

//Define routes
app.use("/api/docs", docs);
app.use("/api/user", user);
app.use("/auth", auth);

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("get-document", async (documentId) => {
    try {
      const document = await getDocument(documentId);
      socket.join(documentId);
      socket.emit("load-document", document.data);
    } catch (err) {
      console.log("Error in get-document: ", err);
    }

    socket.on("send-changes", (delta) => {
      // console.log("changes: ", delta);
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    socket.on("save-document", async (data) => {
      try {
        await updateDocument(documentId, data);
      } catch (err) {
        console.log("Error in save-document: ", err);
      }
    });
  });
});

// Start server
httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
