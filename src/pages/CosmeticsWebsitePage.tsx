import BannerPages from "../components/BannerPages"
import ProjectDescription from "../components/ProjectDescription"
import { Button } from '@mui/material';
import Box from '@mui/material/Box';

const CosmeticsWebsite = () => {
    return (
        <>
            <BannerPages title="Cosmetics website"/>
            <ProjectDescription
                description = "Simple, static, fully responsive website built with the React-based framework: Gatsby, deployed on Netlify. Besides Gatsby, I used Sass and React Bootstrap for this project."
                technologiesArray = {["Gatsby", "React", "Bootstrap", "Sass"]}
            />
            <Box className="box-button mt" textAlign='center'>
                <Button 
                    className="portfolio-button-1 center" 
                    href="https://dorinkozmetika.hu/" 
                    variant="contained">
                    Click here to view the website
                </Button>
            </Box>
        </>
    );
}

export default CosmeticsWebsite;