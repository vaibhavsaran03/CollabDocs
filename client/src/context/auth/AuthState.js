import React, {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import axios from "axios";
// Create a context for authentication

// AuthProvider component that will wrap your app
const AuthState = ({ children }) => {
  const initialState = {
    isAuthenticated: null,
    user: null,
    loading: true,
    error: null,
  };
  const [state, dispatch] = useReducer(authReducer, initialState);
  // const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(true); // Add loading state

   // Load User
   const loadUser = async () => {
    try {
      const res = await axios.get("http://localhost:9000/auth/login/success", {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch({
          type: "USER_LOADED",
          payload: res.data.user,
        });
      } else {
        dispatch({
          type: "AUTH_ERROR",
        });
      }
    } catch (err) {
      dispatch({
        type: "AUTH_ERROR",
      });
    }
  };

  // Logout User
  const logout = async () => {
    try {
      await axios.get("http://localhost:9000/auth/logout", {
        withCredentials: true,
      });
      dispatch({ type: "LOGOUT" });
      window.location.href = "/login"; // Redirect to login page
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  // On Component Mount, Load User
  useEffect(() => {
    loadUser();
  }, []);

  // Register User

  // Login User

  // Logout

  // Clear Errors

  // Function to log in the user and set user data
  

  // Show a loading spinner or message while fetching user data
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        logout,
        isAuthenticated: state.isAuthenticated,
        // user: state.user,
        loading: state.loading,
        error: state.error,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
