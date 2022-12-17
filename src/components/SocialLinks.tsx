import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import GitHubIcon from '@mui/icons-material/GitHub';
import { IconButton } from '@mui/material';

const SocialLinks = () => {
    return (
        <section id="social-icons">
            <IconButton href="https://www.linkedin.com/in/balazscsordas/" aria-label="linkedin"><LinkedInIcon /></IconButton>
            <IconButton href="https://github.com/balazscsordas" aria-label="github"><GitHubIcon /></IconButton>
            <IconButton href="mailto:csordasbalu96@gmail.com" aria-label="email"><EmailIcon /></IconButton>
            <IconButton onClick={() => window.open("tel:+36307349460")} aria-label="mobile"><PhoneIphoneIcon /></IconButton>
        </section>
    )
};

export default SocialLinks;