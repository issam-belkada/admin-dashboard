import { createContext, useState, useMemo,useContext } from "react";

const StateContext = createContext({
  user: null,
  setUser: () => {},
  token: null,
  setToken: () => {},
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, _setToken] = useState(123);

    const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS-TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS-TOKEN");
    }
    };
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
