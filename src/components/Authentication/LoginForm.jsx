import React, { useState, useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import axios from "axios";
import Zoom from '@mui/material/Zoom';
import useAuth from '../../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';

function LoginForm() {

  const { auth, setAuth } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/authentication";
  const navigate = useNavigate();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [loginMessage, setLoginMessage] = useState("");
  
  
  const handleSubmit = (event) => {
    event.preventDefault();
    sendLoginData({username: usernameRef.current.value, password: passwordRef.current.value});
  };


  const sendLoginData = async (data) => {
    try {
      const url = process.env.REACT_APP_BASEURL + "/api/login";
      const params = {loginData: data};
      const response = await axios.post(url, params);
      const id = response?.data?.id;
      const firstName = response?.data?.firstName;
      const username = response?.data?.username;
      const bestScore = response?.data?.bestScore;
      setLoginMessage(response.data.message);
      if(response.data.message === "Success") {
        setAuth({
          id: id,
          firstName: firstName,
          username: username,
          bestScore: bestScore
        })
        navigate(from, { replace: true });
      }
    } 
    catch(err) {
      console.log(err);
    }
  }
  

  const signOut = () => {
    setAuth("");
    setLoginMessage("");
  }

  return (
    <section id="login-section">
      <Container component="main" maxWidth="xs">
        {auth.firstName
          ? <Box className="login-box">
              <h2>Hello {auth.firstName}</h2>
              <Button className="log-out-button" variant="contained" onClick={signOut}>Log out</Button>
            </Box>
          : <Box className="login-box">
              <h2>Sign In</h2>
              <Box className="form" component="form" onSubmit={handleSubmit}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  inputRef={usernameRef}
                  id="username-login"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password-login"
                  inputRef={passwordRef}
                  autoComplete="current-password"
                />
                <Button className="submit-button" type="submit" variant="contained">Sign In</Button>
              </Box>
              <Zoom in={loginMessage !== ""}>
                <div className="error-div">
                  <p className="error-text">{loginMessage}</p>
                </div>
              </Zoom>
          </Box>
        }
      </Container>
      
    </section>
  );
}

export default LoginForm;