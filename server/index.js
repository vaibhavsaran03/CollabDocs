import { Server } from "socket.io";
import Connection from "./database/db.js";
import {
  getDocument,
  updateDocument,
} from "./controller/documentController.js";

const PORT = process.env.PORT || 9000;

Connection();
const io = new Server(PORT, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
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
