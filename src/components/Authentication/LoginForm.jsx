import React, { useState } from 'react';
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
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })
  const [loginMessage, setLoginMessage] = useState("");
  
  const handleSubmit = (event) => {
    event.preventDefault();
    sendLoginData(loginData);
  };

  function sendLoginData (data) {
    const options = {
      method: "POST",
      url: process.env.REACT_APP_BASEURL + "/api/login",
      params: {loginData: data}
    }
    axios.request(options).then(response => {
      const name = response?.data?.name;
      const email = response?.data?.email;
      const bestScore = response?.data?.bestScore;

      setLoginMessage(response.data.message);
      if(response.data.message === "Success") {
        setLoginData({
          email: "",
          password: ""
        })
        setAuth({
          name: name,
          email: email,
          bestScore: bestScore
        })
        navigate(from, { replace: true });
      }
    })
    .catch(error => {
      console.log(error);
    })
  }

  
  function handleLoginDataChange(event) {
    const {name, value} = event.target;
      setLoginData(prevText => {
          return {
            ...prevText,
            [name]: value
          }
        })
  }

  function signOut() {
    setAuth("");
    setLoginMessage("");
  }

  return (
    <section id="login-section">
      <Container component="main" maxWidth="xs">
        {auth.name
          ? <Box className="login-box">
              <h2>Hello {auth.name}</h2>
              <Button className="log-out-button" variant="contained" onClick={signOut}>Log out</Button>
            </Box>
          : <Box className="login-box">
              <h2>Sign In</h2>
              <Box className="form" component="form" onSubmit={handleSubmit}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email-login"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={loginData.email}
                  onChange={handleLoginDataChange}
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
                  value={loginData.password}
                  onChange={handleLoginDataChange}
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