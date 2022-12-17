import { createContext, ReactNode, useEffect, useState } from "react";

type Props = {
    children: ReactNode
}
interface ThemeContextInterface {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
}
const ThemeContext = createContext<ThemeContextInterface>({} as ThemeContextInterface);

export const ThemeProvider = ({ children }: Props) => {
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