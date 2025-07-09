import { createContext, useState, useMemo, useContext } from "react";
import { useEffect } from "react";

const StateContext = createContext({
  user: null,
  setUser: () => {},
  token: null,
  setToken: () => {},
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("USER")) || null);
  const [token, _setToken] = useState(localStorage.getItem("ACCESS-TOKEN"));

    const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS-TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS-TOKEN");
    }
  };
  useEffect(() => {
      if (user) {
        localStorage.setItem("USER", JSON.stringify(user));
      } else {
        localStorage.removeItem("USER");
      }
    }, [user]);
    const contextValue = useMemo(() => ({
        user,
        setUser,
        token,
        setToken
      }), [user, token]);
    
    return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext =() => useContext(StateContext);
