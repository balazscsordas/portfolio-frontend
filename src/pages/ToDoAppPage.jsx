import React from 'react';
import BannerPages from "../components/BannerPages"
import ToDoApp from "../components/ToDoApp/ToDoApp";
import ProjectDescription from "../components/ProjectDescription"

function ToDoAppPage() {
    return (
        <>
            <BannerPages title="To Do App"/>
            <ProjectDescription
                description = "To Do list frontend application built with React and Material UI."
                technologiesArray = {["React", "Material UI", "Bootstrap", "Sass"]}
            />
            <ToDoApp />
            
        </>
    );
}

export default ToDoAppPage;