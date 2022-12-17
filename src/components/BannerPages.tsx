import Container from "react-bootstrap/Container";

type Props = {
    title: string
};

const BannerPages = ({ title }: Props) => {
    return (
        <section id="banner-pages-section">
            <Container className="banner-pages-container">
                <h1>{title}</h1>
            </Container>
        </section>
    )
};

export default BannerPages;