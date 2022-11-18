import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from '@mui/material';

function BannerHome() {

    return (
        <section id="banner-home-section">
            <Container>
                <Row>
                    <Col lg={6} className="banner-home-col-1 h-100">
                        <div>
                            <h1>Balazs Csordas</h1>
                            <p>Full Stack Web Developer</p>
                            <Button className="portfolio-button-1" href="#projects-section" variant="contained">my projects</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
};

export default BannerHome;