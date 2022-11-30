import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import axios from "axios";
import Zoom from '@mui/material/Zoom';
import Collapse from '@mui/material/Collapse';
import validator from 'validator';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

function RegistrationForm() {

  const [registrationData, setRegistrationData] = useState({
      firstName: "",
      username: "",
      password: ""
  })
  const [registrationMessage, setRegistrationMessage] = useState("");
  const [usernameCheckMessage, setUsernameCheckMessage] = useState("");
  const [passwordLengthError, setPasswordLengthError] = useState(<CloseIcon className="close-icon"/>);
  const [passwordNumberSymbolError, setPasswordNumberSymbolError] = useState(<CloseIcon className="close-icon"/>);
  const [passwordLowerUpperError, setPasswordLowerUpperError] = useState(<CloseIcon className="close-icon"/>);


  const handleSubmit = (event) => {
      event.preventDefault();
      if (usernameValidationCheck(registrationData.username) === true && passwordValidationCheck(registrationData.password) === true) {
        sendRegistrationData(registrationData);
        setRegistrationData({
          firstName: "",
          username: "",
          password: ""
        });
        setUsernameCheckMessage("");
      }
  };
  

  const sendRegistrationData = async (registrationData) => {
      try {
        const url = process.env.REACT_APP_BASEURL + "/api/registration";
        const params = {registrationData: registrationData};
        const response = await axios.post(url, params);
        setRegistrationMessage(response.data.message);
      } catch(err) {
        console.log(err);
      }
    }


  const changeData = (event) => {
    const {name, value} = event.target;
    setRegistrationData(prevText => {
        return {
          ...prevText,
          [name]: value
        }
      })
  }


  const usernameValidationCheck = (username) => {
    if (username.length > 4) {
      setRegistrationMessage("");
      setUsernameCheckMessage("");
      return true;
    }
    else {
      setUsernameCheckMessage('Username has to be at least 5 characters long')
    }
  }


  const passwordValidationCheck = (password) => {
    if(validator.isStrongPassword(password, {minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1})) {
      return true;
      }
  }


  useEffect (() => {
    registrationData.password.length >= 8
      ? setPasswordLengthError(<CheckIcon className="check-icon"/>)
      : setPasswordLengthError(<CloseIcon className="close-icon"/>)
    
    validator.isStrongPassword(registrationData.password, {minLength: 0, minLowercase: 0, minUppercase: 0, minNumbers: 1, minSymbols: 1})
      ? setPasswordNumberSymbolError(<CheckIcon className="check-icon"/>)
      : setPasswordNumberSymbolError(<CloseIcon className="close-icon"/>)

    validator.isStrongPassword(registrationData.password, {minLength: 0, minLowercase: 1, minUppercase: 1, minNumbers: 0, minSymbols: 0})
      ? setPasswordLowerUpperError(<CheckIcon className="check-icon"/>)
      : setPasswordLowerUpperError(<CloseIcon className="close-icon"/>)
    }, [registrationData.password])

  return (
      <section id="registration-section">
        <Container component="main" maxWidth="xs">
          <Box className="login-box">
            <h2>Registration</h2>
            <Box className="form" component="form" onSubmit={handleSubmit}>
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  value={registrationData.firstName}
                  onChange={changeData}
                  autoComplete="first-name"
                  autoFocus
                  />
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  value={registrationData.username}
                  onChange={changeData}
                  autoComplete="username"
                  autoFocus
                  />
              <Collapse in={usernameCheckMessage !== ""}>
                <div className="error-div">
                  <p className="error-text">{usernameCheckMessage}</p>
                </div>
              </Collapse>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password-registration"
                value={registrationData.password}
                onChange={changeData}
                autoComplete="current-password"
              />
              <Collapse in={registrationData.password.length > 0}>
                <ul className="password-requirements-block">
                  <p className="title">Your password needs to:</p>
                  <li>{passwordLowerUpperError} include both lower and upper case characters</li>
                  <li>{passwordNumberSymbolError} include at least one number and one symbol</li>
                  <li>{passwordLengthError} be at least 8 characters long</li>
                </ul>
              </Collapse>
              <Button className="submit-button" type="submit" variant="contained">Registration</Button>
            </Box>
          </Box>
          <Zoom in={registrationMessage !== ""}>
              <div className="message-block">
                  <p>{registrationMessage}</p>
              </div>
          </Zoom>
        </Container>
      </section>
  );
}

export default RegistrationForm;