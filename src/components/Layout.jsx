import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/index.scss';
import useTheme from '../hooks/useTheme';

function Layout() {

    const { theme } = useTheme();
    
    return (
        <div className={`WholeApp ${theme}`}>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    )
};

export default Layout;