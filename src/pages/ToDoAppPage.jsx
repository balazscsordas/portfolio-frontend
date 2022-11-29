import React from 'react';
import BannerPages from "../components/BannerPages"
import ToDoApp from "../components/ToDoApp/ToDoApp";
import ProjectDescription from "../components/ProjectDescription"

function ToDoAppPage() {
    return (
        <>
            <BannerPages title="To Do App"/>
            <ProjectDescription
                description = "To Do list application, which is connected to the Node.js server, which stores the credentials for the MongoDB database and communicates with it. If the user is logged in, it stores the notes in the database, so they can be viewed later."
                technologiesArray = {["React", "Node.js", "MongoDB", "Rest API", "Material UI", "Bootstrap", "Sass"]}
            />
            <ToDoApp />
        </>
    );
}

export default ToDoAppPage;