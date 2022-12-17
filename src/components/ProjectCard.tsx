import { SvgIconProps } from "@mui/material";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

type Props = {
    name: string,
    description: string,
    link: string,
    icon: (props: SvgIconProps) => JSX.Element
}

const ProjectCard = (props: Props) => {
    return (
        <Col sm ={6} md={4} className="project-card">
            <props.icon fontSize="large"/>
            <Link to={props.link}><h3 className="project-title">{props.name}</h3></Link>
            <p>{props.description}</p>
        </Col>
    )
};

export default ProjectCard;