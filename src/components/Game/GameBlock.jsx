import React from "react";
import Game from './Game';
import GameResults from './GameResults';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function GameBlock () {

    return (
        <section id="game-section">
            <Container>
                <Row>
                    <Col lg={7}>
                        <Game />
                    </Col>
                    <Col lg={5}>
                        <GameResults />
                    </Col>
                </Row>
            </Container>
        </section>
    )   
}

export default GameBlock;