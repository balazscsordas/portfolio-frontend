import BannerPages from "../components/BannerPages"
import NoteCollector from "../components/NoteCollector/NoteCollector";
import ProjectDescription from "../components/ProjectDescription"

const NoteCollectorPage = () => {
    return (
        <>
            <BannerPages title="Note Collector"/>
            <ProjectDescription
                description = "If the user is logged in, the application will store the added notes in MongoDB database, so they can be viewed or deleted later. For the frontend i used React components, Material UI and Sass. The client side is communicating with the Node.js server via API, which stores the credentials for the database connection. For the database relationship between users and notes i used the embedded method."
                technologiesArray = {["React", "TypeScript", "Node.js", "MongoDB", "Rest API", "Material UI", "Bootstrap", "Sass"]}
            />
            <NoteCollector />
        </>
    );
}

export default NoteCollectorPage;