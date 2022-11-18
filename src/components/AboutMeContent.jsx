import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SocialLinks from './SocialLinks';

const technologiesArray = ["React.js", "Node.js", "Git", "GitHub", "Rest API", "MongoDB", "Mongoose", "Javascript", "Gatsby", "JQuery", "Sass", "Bootstrap", "Material UI", "EJS", "HTML5", "CSS"]

function AboutMeContent() {

    return (
        <section id="about-me-section" className="mt">
            <Container>
                <h2 className="mbt">Who am i?</h2>
                <Row className="about-me-row">
                    <Col lg={6}>
                        <h3>My name is Balazs Csordas, and this is my story!</h3>
                        <p>I am a {new Date().getFullYear() - 1996} years old guy from Hungary with mechanical engineering degree, who is passionate about coding and decided to transition from engineering to software developement.</p>
                        <p>I have been learning web developement since 2022.08.25. Things started with a course from Udemy, which laid down my fundamental knowledge of frontend and backend technologies.</p>
                        <p>Since i finished the course, i have been constantly improving my skills as a Full Stack Web Developer by creating web based projects on my own.</p>
                        <p>I am open to new opportunities, so feel free to contact me!</p>
                        <div className="links-block">
                            <SocialLinks />
                        </div>
                    </Col>
                </Row>

                <Row className="technologies-row mt">
                    <h2 className="technologies-title mbt">Technologies, i have used:</h2>
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