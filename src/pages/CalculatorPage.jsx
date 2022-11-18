import React from 'react';
import Calculator from "../components/Calculator";
import BannerPages from "../components/BannerPages"
import ProjectDescription from "../components/ProjectDescription"

function CalculatorPage() {
    return (
        <>
            <BannerPages title="Calculator App"/>
            <ProjectDescription
                description = "Basic, simple calculator, which can be used by clicking the buttons, and with keyboard as well."
                technologiesArray = {["React", "JQuery", "Material UI", "Bootstrap", "Sass"]}
            />
            <Calculator />
        </>
        
    );
}

export default CalculatorPage;