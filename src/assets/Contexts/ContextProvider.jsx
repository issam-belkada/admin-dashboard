import { createContext } from "react";




const StateContect = createContext({
    user: null,
    setUser: () => {},
    token: null,
    setToken: () => {}
});


export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, _setToken] = useState(null);

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("token", token);
        }
        else {
            localStorage.removeItem("token");
        }
}