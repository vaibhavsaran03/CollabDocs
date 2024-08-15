const authReducer = (state, action) => {
    switch (action.type) {
      case "USER_LOADED":
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: action.payload,
        };
      case "REGISTER_SUCCESS":
      case "LOGIN_SUCCESS":
        return {
          ...state,
          ...action.payload,
          isAuthenticated: true,
          loading: false,
        };
      case "AUTH_ERROR":
      case "LOGOUT":
        return {
          ...state,
          isAuthenticated: false,
          loading: false,
          user: null,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  