import React, {Fragment, useContext} from "react";
import Docs from "../docs/Docs";
import DocsForm from "../docs/DocsForm";
import DocFilter from "../docs/DocFilter";
import { DocsContext } from "../../context/docs/docsContext";
import AuthContext from "../../context/auth/authContext";

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const {isAuthenticated, user, logout, login} = authContext;
  
  return (
    // console.log("User data: ", user),
    <div>
      {/* {user !== null ? <h1>Welcome {user.name}</h1> : null} */}
      <div>
        <DocsForm />
      </div>
      <div>
        <DocFilter />
        <Docs />
      </div>
      <div>

      </div>
    </div>
  );
};

export default Dashboard;
