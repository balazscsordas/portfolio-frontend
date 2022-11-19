import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Button } from '@mui/material';
import image from '../images/en.jpg';

function BannerHome() {

    return (
        <section id="banner-home-section">
                
            <Container>
                <Row>
                    <h1 className="main-h1">Welcome to my portfolio website</h1>
                    <div className="avatar-block">
                        <img 
                            className="avatar-image"
                            src={image} 
                            alt="me"
                        />
                        <div className="avatar-description">
                            <h2>Balazs Csordas</h2>
                            <p>Full Stack Web Developer</p>
                            <Button className="portfolio-button-1" href="#projects-section" variant="contained">my projects</Button>
                        </div>
                    </div>
                </Row>
            </Container>
        </section>
    )
};

export default BannerHome;