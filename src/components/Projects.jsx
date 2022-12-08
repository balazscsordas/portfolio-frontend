import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ProjectCard from "./ProjectCard";
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import DesktopMacOutlinedIcon from '@mui/icons-material/DesktopMacOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

function Projects() {

    const projects = [
        {
            name: "Trainer App",
            description: "An application where trainers can store all of the essential informations about their clients, for example their previous injuries, allergies, their starter weight. Node.js backend and MongoDB database, with reference method relationship.",
            icon: FitnessCenterIcon,
            link: "/trainer-app"
        },
        {
            name: "Note Collector",
            description: "Application where the authenticated user can add, store and delete notes, which are stored in a MongoDB database. Components built with React, Material UI.",
            icon: FactCheckOutlinedIcon,
            link: "/note-collector"
        },
        {
            name: "Weather App",
            description: "This application uses an API to get and display the data the user requires. The frontend is connected to a Node.js backend, which stores the essential keys for the API call.",
            icon: WbSunnyOutlinedIcon,
            link: "/weather-app"
        },
        {
            name: "Website for client",
            description: "Simple, static, fully responsive website built with the React-based framework: Gatsby, deployed on Netlify. Besides Gatsby, i used Sass and React Bootstrap for this project.",
            icon: DesktopMacOutlinedIcon,
            link: "/cosmetics-website"
        },
        {
            name: "Authentication system",
            description: "Fully functional registration and login system with checks, bcrypted passwords. Built with React, MongoDB, Mongoose, Node.js, React Bootstrap and Material UI",
            icon: HowToRegIcon,
            link: "/authentication"
        },
        {
            name: "Simon Game",
            description: "This game is only available after authentication. It is connected to a MongoDB database and there is an all time ranklist",
            icon: SportsEsportsIcon,
            link: "/game"
        },
        {
            name: "Calculator",
            description: "Basic, simple calculator, which can be used by clicking the buttons, and with keyboard as well. Used technologies: JQuery + HTML5 + CSS",
            icon: CalculateOutlinedIcon,
            link: "/calculator"
        }
    ];

    return (
        <section id="projects-section" className="mt">
            <Container>
                <Row>
                    <div>
                        <h2 className="section-title">My projects</h2>
                    </div>
                </Row>
                <Row>
                    {projects.map((project, index) => (
                        <ProjectCard 
                            key = {index}
                            name = {project.name}
                            description = {project.description}
                            icon = {project.icon}
                            link = {project.link}
                        />
                    ))}
                </Row>
                
            </Container>
        </section>
    )
};

export default Projects;