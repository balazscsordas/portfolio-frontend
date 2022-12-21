import BannerPages from "../components/BannerPages";
import ProjectDescription from "../components/ProjectDescription";
import AuthenticationBlock from "../components/Authentication/AuthenticationBlock";

const AuthenticationPage = () => {
    return (
        <>
            <BannerPages title="Authentication system"/>
            <ProjectDescription
                description = "Fully functional authenticational system with bcrypted passwords, Node.js backend and MongoDB database connection."
                technologiesArray = {["React", "TypeScript", "Node.js", "Express.js", "MongoDB", "Mongoose", "Rest API", "Bootstrap", "Material UI", "Sass"]}
            />
            <AuthenticationBlock />
        </>
    );
}

export default AuthenticationPage;