import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import PersonIcon from '@mui/icons-material/Person';
import { Button } from '@mui/material';
import useAuth from "../hooks/useAuth";
import FormControlLabel from '@mui/material/FormControlLabel';
import useTheme from '../hooks/useTheme';
import MuiSwitch from './MuiSwitch';
import Offcanvas from 'react-bootstrap/Offcanvas';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header() {

    const { auth, setAuth } = useAuth();
    const { theme, setTheme } = useTheme();
    const [checked, setChecked] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const signOut = () => {
        setAuth("");
    }

    const changeTheme = (event) => {
        localStorage.getItem('theme') === "light-mode" 
            ? localStorage.setItem('theme', 'dark-mode')
            : localStorage.setItem('theme', 'light-mode');
        theme === "light-mode" 
            ? setTheme("dark-mode")
            : setTheme("light-mode");
        setChecked(event.target.checked);
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
                    onClick={() => setExpanded(expanded ? false : "expanded")}
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
                            <NavDropdown.Item as={Link} to="/calculator" onClick={() => setExpanded(false)}>Calculator</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/weather-app" onClick={() => setExpanded(false)}>Weather App</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/cosmetics-website" onClick={() => setExpanded(false)}>Website for client</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/to-do-app" onClick={() => setExpanded(false)}>To-Do App</NavDropdown.Item>
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
                                <FormControlLabel
                                    control={<MuiSwitch 
                                        onClick={changeTheme} 
                                        checked={checked}
                                        sx={{ m: 1 }}
                                        />
                                    }
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