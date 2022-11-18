import React from "react";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";


function ProjectCard (props) {
    
    return (
        <Col md={4} className="project-card">
            <props.icon fontSize="large"/>
            <Link to={props.link}><h3 className="project-title">{props.name}</h3></Link>
            <p>{props.description}</p>
        </Col>
    )
};

export default ProjectCard;