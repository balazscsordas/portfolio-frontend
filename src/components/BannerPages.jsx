import React from "react";
import Container from "react-bootstrap/Container";

function BannerHome(props) {
    return (
        <section id="banner-pages-section">
            <Container className="banner-pages-container">
                <h1>{props.title}</h1>
            </Container>
        </section>
    )
};

export default BannerHome;