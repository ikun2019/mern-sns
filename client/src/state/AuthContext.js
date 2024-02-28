import { createContext, useReducer } from "react";
import { AuthReducer } from "./AuthReducer";

const initialState = {
  // user: null,
  user: {
    _id: "65db430d23a60be0a77b4c52",
    username: "ikun9999",
    email: "0215.miyatto@gmail.com",
    password: "02151353",
    profilePicture: "",
    coverPicture: "",
    followers: [],
    followings: [],
    isAdmin: false,
  },
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  return (
    <AuthContext.Provider value={{
      user: state.user,
      isFetching: state.isFetching,
      error: state.error,
      dispatch,
    }}>
      {children}
    </AuthContext.Provider>
  )
};