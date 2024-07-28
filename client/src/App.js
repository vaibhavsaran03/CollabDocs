import React from "react";
import Editor from "./component/Editor";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { v4 as uuidV4 } from "uuid";

function App() {
  return (
    <>
      <Editor />
    </>
  );
}

export default App;
