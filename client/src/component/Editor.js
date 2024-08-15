import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { Box } from "@mui/material";
import styled from "@emotion/styled";
import io from "socket.io-client";
import { useParams } from "react-router-dom";

const Component = styled.div`
  background: #f5f5f5;
`;
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  ["link", "image", "video", "formula"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];

const Editor = () => {
  const [quill, setQuill] = useState(null);
  const [socket, setSocket] = useState(null);
  const { id } = useParams();

  const currRef = useRef(null);

  // setup Quill
  useEffect(() => {
    if (!currRef.current) {
      const quillServer = new Quill("#container", {
        theme: "snow",
        modules: {
          toolbar: toolbarOptions,
        },
      });
      currRef.current = quillServer;
      quillServer.disable();
      quillServer.setText("Document is Loading...");
      setQuill(quillServer);
      // console.log("Quill is ready to use!");
    }

    //cleanup
    return () => {
      if (currRef.current) {
        currRef.current = null;
      }
    };
  }, []);

  //1. connect to the server
  useEffect(() => {
    const socketServer = io("http://localhost:9000");
    setSocket(socketServer);
    return () => {
      socketServer.disconnect();
    };
  }, []);

  //2. send changes to the server
  useEffect(() => {
    if (socket === null || quill === null) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };

    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  //3. receive changes from the server
  useEffect(() => {
    if (socket === null || quill === null) return;

    const handler = (delta) => {
      quill.updateContents(delta);
    };

    socket.on("receive-changes", handler);

    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket === null || quill === null) return;
    // load the document from the server
    socket.once("load-document", (document) => {
      // console.log("Document loaded: ", document);
      quill.setContents(document);
      quill.enable();
    });
    // gets the document id from the url
    socket.emit("get-document", id);
    // console.log("Requested to get the document with id: ", id);
  }, [socket, quill, id]);

  //4. save the document to the server
  useEffect(() => {
    if (socket === null || quill === null) return;

    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents());
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  return (
    <Component>
      <Box ref={currRef} className="container" id="container"></Box>
    </Component>
  );
};

export default Editor;
