import BannerPages from "../components/BannerPages"
import GameBlock from "../components/Game/GameBlock";
import ProjectDescription from "../components/ProjectDescription";
import Rules from '../components/Game/Rules';

const GamePage = () => {
    return (
        <>
            <BannerPages title="Game"/>
            <ProjectDescription
                description = "This game is only available after authentication, it is connected to a Node.js server, and a MongoDB database, so the application can record the best score for each player and it can display the 10 best scores also."
                technologiesArray = {["React", "TypeScript", "Node.js", "MongoDB", "Mongoose", "Rest API", "JQuery", "Bootstrap", "Sass", "Material UI"]}
            />
            <Rules />
            <GameBlock />
        </>
    );
}

export default GamePage;