import React from 'react';
import BannerPages from "../components/BannerPages"
import GameBlock from "../components/Game/GameBlock";
import ProjectDescription from "../components/ProjectDescription";

function GamePage() {
    return (
        <>
            <BannerPages title="Game"/>
            <ProjectDescription
                description = "This game is only available after authentication, it is connected to a backend server and a database, so the application can record the best score for each player and it can display the 10 best scores also."
                technologiesArray = {["React", "NodeJS", "MongoDB", "Mongoose", "Rest API", "JQuery", "Bootstrap", "Sass", "Material UI"]}
            />
            <GameBlock />
        </>
    );
}

export default GamePage;