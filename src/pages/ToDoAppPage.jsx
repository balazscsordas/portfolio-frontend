import React from 'react';
import BannerPages from "../components/BannerPages"
import ToDoApp from "../components/ToDoApp/ToDoApp";
import ProjectDescription from "../components/ProjectDescription"

function ToDoAppPage() {
    return (
        <>
            <BannerPages title="To Do App"/>
            <ProjectDescription
                description = "To Do list application connected to a Nodejs backend and a MongoDB database. If a user is logged in, it stores the notes in the database, so they can be viewed later."
                technologiesArray = {["React", "NodeJS", "MongoDB", "Rest API", "Material UI", "Bootstrap", "Sass"]}
            />
            <ToDoApp />
            
        </>
    );
}

export default ToDoAppPage;