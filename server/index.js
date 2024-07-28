import { Server } from "socket.io";

const PORT = 9000;
const io = new Server(PORT, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("get-document", (documentId) => {
    const data = "";
    socket.join(documentId);
    socket.emit("load-document", data);
    socket.on("send-changes", (delta) => {
      // console.log("changes: ", delta);
      socket.broadcast.to(documentId).emit("receive-changes", delta);
      socket;
    });
  });
});
