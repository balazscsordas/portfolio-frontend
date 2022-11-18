import React from "react";
import Container from 'react-bootstrap/Container';
import SocialLinks from './SocialLinks';

function Footer() {
    return (
        <footer className="mt-auto">
            <Container className="footerInnerContainer">
                <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                    <SocialLinks />
                </ul>
                <p className="text-center text-muted copyright-text">© Balazs Csordas</p>
            </Container>         
        </footer>
    )
};

export default Footer;