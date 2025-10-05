import { createContext, useState, useMemo, useContext } from "react";
import { useEffect } from "react";

const StateContext = createContext({
  user: null,
  setUser: () => {},
  token: null,
  setToken: () => { },
  darkMode: false,
  setDarkMode: () => {},
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("USER")) || null);
  const [token, _setToken] = useState(localStorage.getItem("ACCESS-TOKEN"));
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true');

  useEffect(() => {
  document.body.className = darkMode ? 'dark-theme' : 'light-theme';
  localStorage.setItem('darkMode', darkMode);
}, [darkMode]);

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
        setToken,
        darkMode,
        setDarkMode,
      }), [user, token, darkMode]);
    
    return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext =() => useContext(StateContext);
