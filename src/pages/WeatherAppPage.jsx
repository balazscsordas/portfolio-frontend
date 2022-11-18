import React from 'react';
import BannerPages from "../components/BannerPages"
import WeatherApp from "../components/weather-app/WeatherApp";
import ProjectDescription from "../components/ProjectDescription"

function Projects() {
    return (
        <>
            <BannerPages title="Weather App"/>
            <ProjectDescription
                description = "This application uses an API to get and display the data the user requires. The software requires a city name, and there is an optional unit switcher built in. The frontend is connected to a Nodejs backend, which stores the essential keys for the API call."
                technologiesArray = {["React", "NodeJS", "Rest API", "Material UI", "Bootstrap", "Sass"]}
            />
            <WeatherApp />
            
        </>
    );
}

export default Projects;