import {
    GET_DOCS,
    CREATE_DOC,
    DELETE_DOC,
    CLEAR_DOCS,
    UPDATE_DOC,
    DOCS_ERROR,
    FILTER_DOCS,
    CLEAR_FILTER,
  } from "../types";

  const docsReducer = (state, action) => {
    switch (action.type) {
      case GET_DOCS:
        return {
          ...state,
          docs: action.payload,
          loading: false,
        };
      case CREATE_DOC:
        return {
          ...state,
          docs: [action.payload, ...state.docs,],
          loading: false,
        };
      case DELETE_DOC:
        return {
          ...state,
          docs: state.docs.filter((doc) => doc._id !== action.payload),
        };
      case CLEAR_DOCS:
        return {
          ...state,
          docs: null,
          filtered: null,
          error: null,
          current: null,
        };    
      case FILTER_DOCS:
        return {
          ...state,
          filtered: state.docs.filter((doc) => {
            const regex = new RegExp(`${action.payload}`, "gi");
            return doc.title.match(regex);
          }),
        };
      case CLEAR_FILTER:
        return {
          ...state,
          filtered: null,
        };    
      case DOCS_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };

export default docsReducer;
  