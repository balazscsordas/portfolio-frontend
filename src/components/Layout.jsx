import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/index.scss';
import useTheme from '../hooks/useTheme';

function Layout() {

    const { theme } = useTheme();
    const [localStorageTheme, setLocalStorageTheme] = useState(localStorage.getItem('theme'));

    useEffect(() => {
        if (!localStorage.getItem('theme')) {
            localStorage.setItem('theme', "light-mode");
            setLocalStorageTheme("light-mode");
        }
    }, []);

    useEffect(() => {
        setLocalStorageTheme(window.localStorage.getItem('theme'));
    }, [theme])
    
    return (
        <div className={`WholeApp ${localStorageTheme}`}>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    )
};

export default Layout;