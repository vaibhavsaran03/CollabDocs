import React, { useContext } from "react";
import PropTypes from "prop-types";
import { DocsContext } from "../../context/docs/docsContext";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";


const DocItem = ({ docs }) => {
  const navigate = useNavigate();
  const docsContext = useContext(DocsContext);
  const authContext = useContext(AuthContext);
  const { deleteDoc, clearDocs, getDocs } = docsContext;
  const { user } = authContext;
  
  if (!docs) {
    console.log("Document is missing an ID");
    return null; // Or return a loading spinner or some placeholder content
  }

  const { _id, title, content, createdBy } = docs;
  
  const onDelete = () => {
    deleteDoc(_id);
    clearDocs();
    getDocs();
  }

  const onEdit = () => {
    navigate(`/document/${_id}`);
  }
  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">{title}</h3>
      <ul className="list">
        {createdBy && (
          <li>
            <i className="fas fa-envelope-open"></i> {user.name}
          </li>
        )}
      </ul>
      <p>
        <button className="btn btn-dark btn-sm" onClick={onEdit}>Edit</button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
      </p>
    </div>
  );
};

DocItem.propTypes = {
  docs: PropTypes.object.isRequired,
};

export default DocItem;
