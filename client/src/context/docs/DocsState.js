import { useContext, useReducer } from "react";
import { DocsContext } from "./docsContext";
import docsReducer from "./docsReducer";
import axios from "axios";
import AuthContext from "../auth/authContext";
import {
  GET_DOCS,
  CREATE_DOC,
  DELETE_DOC,
  CLEAR_DOCS,
  UPDATE_DOC,
  FILTER_DOCS,
  DOCS_ERROR,
  SET_CURRENT,
  CLEAR_CURRENT,
  CLEAR_FILTER,
} from "../types";

import { v4 as uuidV4 } from "uuid";

// initial state

const DocsState = (props) => {
  const initialState = {
    docs: null,
    current: null,
    filtered: null,
  };

  const [state, dispatch] = useReducer(docsReducer, initialState);
  const { user } = useContext(AuthContext);
  // Get all docs
  const getDocs = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/docs", {
        withCredentials: true,
      });
      dispatch({ type: GET_DOCS, payload: res.data });
    } catch (err) {
      dispatch({ type: DOCS_ERROR, payload: err.response.msg });
    }
  };

  // Create a doc
  const createDoc = async (doc) => {
    const newDoc = {
      _id: uuidV4(),
      title: doc.title || "Untitled",
      content: doc.content || {},
      user: user._id,
      data: {},
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    try {
      const res = await axios.post(
        "http://localhost:9000/api/docs",
        newDoc,
        config
      );
      dispatch({ type: CREATE_DOC, payload: res.data });
    } catch (err) {
      dispatch({ type: DOCS_ERROR, payload: err.response.msg });
    }
  };

  // Clear docs
  const clearDocs = () => {
    dispatch({ type: CLEAR_DOCS });
  };

  // Delete a doc
  const deleteDoc = async (id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    try {
      await axios.delete(`http://localhost:9000/api/docs/${id}`, config, {
        withCredentials: true,
      });
      dispatch({ type: DELETE_DOC, payload: id });
    } catch (err) {
      // Check if err.response and err.response.data exist before accessing err.response.data.msg
      const errorMsg =
        err.response && err.response.data && err.response.data.msg
          ? err.response.data.msg
          : "An unexpected error occurred";

      dispatch({ type: DOCS_ERROR, payload: errorMsg });
    }
  };

  //set current doc
  const setCurrent = (doc) => {
    dispatch({ type: SET_CURRENT, payload: doc });
  };

  //clear current doc
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter docs
  const filterDocs = (text) => {
    dispatch({ type: FILTER_DOCS, payload: text });
  };

  // clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  // Update a doc

  return (
    <DocsContext.Provider
      value={{
        docs: state.docs,
        current: state.current,
        filtered: state.filtered,
        getDocs,
        filterDocs,
        clearFilter,
        createDoc,
        deleteDoc,
        setCurrent,
        clearCurrent,
        clearDocs,
        // updateDoc,
        // error: state.error,
      }}
    >
      {props.children}
    </DocsContext.Provider>
  );
};

export default DocsState;
