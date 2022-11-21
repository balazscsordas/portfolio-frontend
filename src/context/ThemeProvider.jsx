import { createContext, useState, useEffect } from "react";

const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light-mode");

    useEffect(() => {
        !localStorage.getItem('theme') && localStorage.setItem('theme', "light-mode");
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContext;