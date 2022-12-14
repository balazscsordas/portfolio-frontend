import BannerPages from "../components/BannerPages"
import WeatherApp from "../components/weather-app/WeatherApp";
import ProjectDescription from "../components/ProjectDescription"

const Projects = () => {
    return (
        <>
            <BannerPages title="Weather App"/>
            <ProjectDescription
                description = "This application uses an API to get and display the data the user requires. The software requires a city name, and there is an optional unit switcher built in. The frontend is communicating with the Node.js (Express.js) backend, which stores the essential keys for the API call. After submitting the form, the client side sends the essential data to the server with Axios, then it makes the API call and sends the response back to the frontend."
                technologiesArray = {["React", "TypeScript", "Node.js", "Express.js", "Rest API", "Material UI", "Bootstrap", "Sass"]}
            />
            <WeatherApp />
        </>
    );
}

export default Projects;