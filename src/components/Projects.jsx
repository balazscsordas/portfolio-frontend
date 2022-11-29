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

function Projects() {

    const projects = [
        {
            name: "Calculator",
            description: "Basic, simple calculator, which can be used by clicking the buttons, and with keyboard as well. Used technologies: JQuery + HTML5 + CSS",
            icon: CalculateOutlinedIcon,
            link: "/calculator"
        },
        {
            name: "Weather App",
            description: "This application uses an API to get and display the data the user requires. The frontend is connected to a Nodejs backend, which stores the essential keys for the API call.",
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
            name: "To Do App",
            description: "To Do list application connected to a backend and a database. Built with React, Node.js, MongoDB, Mongoose and Material UI.",
            icon: FactCheckOutlinedIcon,
            link: "/to-do-app"
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