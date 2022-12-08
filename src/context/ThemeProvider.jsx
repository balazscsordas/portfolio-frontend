import { createContext, useEffect, useState } from "react";

const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("dark-mode");

    useEffect(() => {
        if (!localStorage.getItem('theme')) {
            localStorage.setItem('theme', "dark-mode");
            setTheme("dark-mode")
        }
        else if(localStorage.getItem('theme') === "light-mode") {
            setTheme("light-mode");
        }
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContext;