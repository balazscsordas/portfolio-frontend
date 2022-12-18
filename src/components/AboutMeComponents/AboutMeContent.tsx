import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AvatarSection from "./AvatarSection";

const technologiesArray = ["React", "TypeScript", "Node.js", "Git", "GitHub", "Rest API", "MongoDB", "Mongoose", "Javascript", "Gatsby", "JQuery", "Sass", "Bootstrap", "Material UI", "EJS", "HTML5", "CSS"]

const AboutMeContent: React.FC = () => {

    return (
        <section id="about-me-section" className="mt">
            <Container>
                <h2 className="mbt">Who am i?</h2>
                <Row className="about-me-row">
                    <Col lg={7}>
                        <h3>My name is Balazs Csordas, and this is my story!</h3>
                        <p>I am a {new Date().getFullYear() - 1996} years old guy from Győr - Hungary, with mechanical engineering degree, who is passionate about coding and decided to transition to software developement.</p>
                        <p>I have been learning web developement since August of 2022. Things started with a course from Udemy, which laid down my fundamental knowledge of frontend and backend technologies.</p>
                        <p>Since I finished the course, I have been constantly improving my skills as a web developer, by creating web based projects on my own, using mainly React, Node.js, MongoDB, Bootstrap and Sass.</p>
                        <p>I am open to new opportunities, interested in remote option as well, so feel free to contact me!</p>
                    </Col>
                    <Col lg={5}>
                        <AvatarSection />
                    </Col>
                </Row>
                <Row className="technologies-row mt">
                    <h2 className="technologies-title mbt">Technologies, I have used:</h2>
                    <div className="technologies">
                        {technologiesArray.map((element, index) => (
                          <span key={index}>{element}</span>  
                          ))}
                    </div>
                </Row>
            </Container>
      </section>
    )
};

export default AboutMeContent;