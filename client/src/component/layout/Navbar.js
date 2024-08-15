import React, {Fragment, useContext, Navigate}from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import { DocsContext } from "../../context/docs/docsContext";

const Navbar = ({ icon, title }) => {
  const authContext = useContext(AuthContext);
  const {isAuthenticated, logout, user} = authContext;
  const docsContext = useContext(DocsContext);
  const {clearDocs} = docsContext;
  const onLogout=()=>{
    logout();
    clearDocs();
  }
  const onDashboard=()=>{
    <Navigate to="/dashboard"/>
  }

  const authLinks=(
    <Fragment>
      <li>
        Hello {user && user.name}
      </li>
      <li>
        <a onClick={onLogout}href="#!">
          <i className="fas fa-sign-out-alt"></i>
          <span className="hide-sm">Logout</span>
        </a>
      </li>
      <li>
        <a onClick={onDashboard}href="/dashboard">
          <i className="fas fa-sign-out-alt"></i>
          <span className="hide-sm">Dashboard</span>
        </a>
      </li>
    </Fragment>
  )

  const  guestLinks=(
    <Fragment>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </Fragment>
  )



  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon} />
        {title}
      </h1>
      <ul>
        {isAuthenticated ? authLinks : guestLinks}
      </ul>
    </div>
  );
};
Navbar.propTypes = {
  title: propTypes.string.isRequired,
  icon: propTypes.string,
};
Navbar.defaultProps = {
  title: "CollabDocs",
  icon: "fas fa-id-card-alt",
};

export default Navbar;
