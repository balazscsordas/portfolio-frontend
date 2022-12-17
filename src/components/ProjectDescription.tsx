import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

type Props = {
    description: string,
    technologiesArray: string[]
}

const ProjectDescription = ({ description, technologiesArray }: Props) => {
    
    return (
        <section id="project-description-section" className="mt">
            <Container className="project-description-block">
                <Row>
                    <h2 className="project-description-title mbt">Project Description</h2>
                    <p>{description}</p>
                </Row>
                <Row className="technologies-row">
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

export default ProjectDescription;