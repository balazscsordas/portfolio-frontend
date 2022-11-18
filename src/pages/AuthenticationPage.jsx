import React from 'react';
import BannerPages from "../components/BannerPages";
import ProjectDescription from "../components/ProjectDescription";
import AuthenticationBlock from "../components/Authentication/AuthenticationBlock";

function AuthenticationPage() {
    return (
        <>
            <BannerPages title="Authentication system"/>
            <ProjectDescription
                description = "Fully functional authenticational system with bcrypted passwords, Nodejs backend and MongoDB database connection."
                technologiesArray = {["React", "Nodejs", "MongoDB", "Mongoose", "Rest API", "Bootstrap", "Material UI", "Sass"]}
            />
            <AuthenticationBlock />
        </>
    );
}

export default AuthenticationPage;