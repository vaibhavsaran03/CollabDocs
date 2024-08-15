import React ,{Fragment} from "react";
import Editor from "./component/Editor";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import Login from "./component/pages/login";
import "./App.css";
import "./component/pages/Login.css";
import Dashboard from "./component/pages/Dashboard";
import Navbar from "./component/layout/Navbar";
import AuthState from "./context/auth/AuthState";
import DocsState from "./context/docs/DocsState";
import Docs from "./component/docs/Docs";
import PrivateRoute from "./component/routing/PrivateRoute";

function App() {
  return (
    <AuthState>
      <DocsState>
        <Router>
          <Fragment>
          <Navbar/>
          <Routes>
            <Route path="/dashboard" element={<PrivateRoute element ={<Dashboard/>} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/document" element={<Navigate to={`/doc/${uuidV4()}`} />} />
            <Route path="/document/:id" element={<Editor />} />
          </Routes>
          </Fragment>
        </Router>
      </DocsState>
    </AuthState>
  );
}

export default App;
