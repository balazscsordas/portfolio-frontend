import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import PersonIcon from '@mui/icons-material/Person';
import { Button } from '@mui/material';
import MuiSwitch from './MuiSwitch';
import Offcanvas from 'react-bootstrap/Offcanvas';
import NavDropdown from 'react-bootstrap/NavDropdown';
import AuthContext from "../context/AuthProvider";
import ThemeContext from "../context/ThemeProvider";

const Header = () => {

    const { auth, setAuth } = useContext(AuthContext);
    const { theme, setTheme } = useContext(ThemeContext);
    const [checked, setChecked] = useState(true);
    const [expanded, setExpanded] = useState(false);

    const signOut = () => {
        setAuth({});
    }

    const changeTheme = () => {
        localStorage.getItem('theme') === "light-mode" 
            ? localStorage.setItem('theme', 'dark-mode')
            : localStorage.setItem('theme', 'light-mode');
        theme === "light-mode" 
            ? setTheme("dark-mode")
            : setTheme("light-mode");
        setChecked(!checked);
    }


    // Button default state
    useEffect(() => {
        theme === "light-mode" ? setChecked(false) : setChecked(true);
    }, [theme]);

    return (
        <section id="navbar-section" className="fixed-top">
            <Navbar expand="lg" expanded={expanded}>
            <Container fluid>
                <Navbar.Brand as={Link} to="/" onClick={() => setExpanded(false)}>Home</Navbar.Brand>
                <Navbar.Toggle 
                    aria-controls="offcanvasNavbar-expand-lg" 
                    onClick={() => setExpanded(expanded ? false : true)}
                    className={theme}
                />
                <Navbar.Offcanvas
                    className={theme}
                    aria-labelledby="offcanvasNavbar-expand-lg"
                    placement="end"
                    >
                    <Offcanvas.Header closeButton onClick={() => setExpanded(false)}>
                        <Offcanvas.Title>
                            {auth.firstName ? `Hello ${auth.firstName}` : "Hi"}
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                        <NavDropdown title="Projects">
                            <NavDropdown.Item as={Link} to="/trainer-app" onClick={() => setExpanded(false)}>Trainer App</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/note-collector" onClick={() => setExpanded(false)}>Note Collector</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/weather-app" onClick={() => setExpanded(false)}>Weather App</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/cosmetics-website" onClick={() => setExpanded(false)}>Cosmetics website</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/authentication" onClick={() => setExpanded(false)}>authentication system</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/game" onClick={() => setExpanded(false)}>Simon Game</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} to="/about-me" onClick={() => setExpanded(false)}>about me</Nav.Link>
                        {auth?.firstName
                                ? <Nav.Link>
                                    <Button onClick={signOut} variant="outlined" startIcon={<PersonIcon />}>
                                        Sign out
                                    </Button>
                                </Nav.Link>
                                : <Nav.Link as={Link} to="authentication" onClick={() => setExpanded(false)}>
                                    <Button variant="outlined" startIcon={<PermIdentityIcon />}>
                                        Sign In
                                    </Button>
                                </Nav.Link>
                            }
                            <Nav.Item>
                                <MuiSwitch
                                    checked={checked}
                                    onClick={changeTheme}
                                    sx={{ m: 1 }}
                                />
                            </Nav.Item>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
            </Navbar>
      </section>
    )
};

export default Header;