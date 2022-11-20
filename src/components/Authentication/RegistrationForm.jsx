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

  // Hooks

  const [registrationData, setRegistrationData] = useState({
      name: "",
      email: "",
      password: ""
  })
  const [registrationMessage, setRegistrationMessage] = useState("");
  const [emailCheckMessage, setEmailCheckMessage] = useState("");
  const [passwordLengthError, setPasswordLengthError] = useState(<CloseIcon className="close-icon"/>);
  const [passwordNumberSymbolError, setPasswordNumberSymbolError] = useState(<CloseIcon className="close-icon"/>);
  const [passwordLowerUpperError, setPasswordLowerUpperError] = useState(<CloseIcon className="close-icon"/>);

  // Submit handling

  const handleSubmit = (event) => {
      event.preventDefault();
      if (emailValidationCheck(registrationData.email) === true && passwordValidationCheck(registrationData.password) === true) {
        sendRegistrationData(registrationData);
        setRegistrationData({
          name: "",
          email: "",
          password: ""
        });
        setEmailCheckMessage("");
      }
  };
  
  // API connection with backend

  async function sendRegistrationData (registrationData) {

      const url = process.env.REACT_APP_BASEURL + "/api/registration";
      const params = {registrationData: registrationData};
      
      await axios.post(url, params).then(response => {
        setRegistrationMessage(response.data.message);
      })
      .catch(error => {
        console.log(error);
      })
  }

  // OnChange function

  function changeData(event) {
    const {name, value} = event.target;
    setRegistrationData(prevText => {
        return {
          ...prevText,
          [name]: value
        }
      })
  }

  // Email requirements check

  function emailValidationCheck(email) {
    if (validator.isEmail(email)) {
      setRegistrationMessage("");
      setEmailCheckMessage("");
      return true;
    } else {
      setEmailCheckMessage('Enter a valid Email');
    }
  }

  // Password requirements check

  function passwordValidationCheck(password) {
    if(validator.isStrongPassword(password, {minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1})) {
      return true;
      }
  }


  // Password requirements error text check

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
                  id="name"
                  label="Name"
                  name="name"
                  value={registrationData.name}
                  onChange={changeData}
                  autoComplete="name"
                  autoFocus
                  />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email-registration"
                label="Email Address"
                name="email"
                value={registrationData.email}
                onChange={changeData}
                autoComplete="email"
                autoFocus
              />
              <Collapse in={emailCheckMessage === "Enter a valid Email"}>
                <div className="error-div">
                  <p className="error-text">{emailCheckMessage}</p>
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