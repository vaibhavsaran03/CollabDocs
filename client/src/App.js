import React from "react";
import Editor from "./component/Editor";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={`/document/${uuidV4()}`} />} />
        <Route path="/document/:id" element={<Editor />} />
      </Routes>
    </Router>
  );
}

export default App;
