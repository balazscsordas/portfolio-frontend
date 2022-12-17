import BannerPages from "../components/BannerPages"
import ProjectDescription from "../components/ProjectDescription"
import TrainerApp from "../components/TrainerApp/TrainerApp";

const TrainerAppPage = () => {
    return (
        <>
            <BannerPages title="Trainer App"/>
            <ProjectDescription
                description = "An application where trainers can store all of the essential informations about their clients, for example their previous injuries, allergies, their starter weight, and other useful informations. I created two separated collections in the MongoDB database, first one is for the users and the second one is for this application only, it is called clients. The relationship between these two collections is created with the Reference method."
                technologiesArray = {["React", "TypeScript", "Node.js", "MongoDB", "Rest API", "Material UI", "Bootstrap", "Sass"]}
            />
            <TrainerApp />
        </>
    );
}

export default TrainerAppPage;