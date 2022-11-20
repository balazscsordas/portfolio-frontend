import React from 'react';
import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function AuthenticationBlock() {
    return (
        <section id="authentication-section" className="mt">
            <Container>
                <Row>
                    <Col lg={6}>
                        <RegistrationForm />
                    </Col>
                    <Col lg={6}>
                        <LoginForm />
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default AuthenticationBlock;