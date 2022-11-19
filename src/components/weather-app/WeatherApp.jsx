import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import Zoom from '@mui/material/Zoom';
import Collapse from '@mui/material/Collapse';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';


function WeatherApp() {

    const [cityName, setCityName] = useState("");
    const [radioInput, setRadioInput] = useState("metric");
    const [unitSystem, setUnitSystem] = useState({
        speedUnit: "",
        tempUnit: ""
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [result, setResult] = useState({
        cityName: "",
        weatherDescription: "",
        temperature: "",
        windSpeed: "",
        resultImage: "",
        cod: "",
        country: "",
        pressure: ""
    });

    function changeCityValue(event) {
        setCityName(event.target.value);
    }

    function changeRadioInput(event) {
        setRadioInput(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        getWeatherData();
        setCityName("");
    }


    function getWeatherData() {
        const options = {
            method: "GET",
            url: process.env.REACT_APP_BASEURL + "/api/get-weather-data",
            params: {cityNameInput: cityName, radioInput: radioInput},
        }

        axios.request(options).then(response => {
            if (response.data.cod === "404") {
                setErrorMessage("Invalid city name, please add another!");
            } else {
                setResult({
                    cityName: response.data.name,
                    weatherDescription: response.data.weather[0].description,
                    temperature: response.data.main.temp,
                    windSpeed: response.data.wind.speed,
                    country: response.data.sys.country,
                    resultImage: "https://openweathermap.org/img/wn/" + response.data.weather[0].icon + "@2x.png",
                    cod: response.data.cod,
                    pressure: response.data.main.pressure
                })
                unitChanger(radioInput);
                setErrorMessage("");
            }
            
        })
        .catch (error => {
            console.log(error);
        });
    }

function unitChanger (unit) {
    switch (unit) {
        case "standard":
          return (setUnitSystem({
            speedUnit: "m/s",
            tempUnit: "Kelvin",
            pressureUnit: "hPa"
          }))
    
        case "metric":
            return (setUnitSystem({
                speedUnit: "m/s",
                tempUnit: "°C",
                pressureUnit: "hPa"
              }))
    
        case "imperial":
            return (setUnitSystem({
                speedUnit: "miles/h",
                tempUnit: "Fahrenheit",
                pressureUnit: "hPa"
              }))
        default:
          console.log("Valami nem jó a mértékegységeknél");
      }
}


    return (
        <section id="weather-app-section" className="mt">
            <section id="weather-app-input-section">
                <Container className="weather-app-container">
                    <form onSubmit={handleSubmit}>
                        <div className="unit-choose-block">
                            <h2 className="unit-choose-title">Choose unit</h2>
                            
                            <div className="unit-input-block">
                                <input type="radio" name="unit-input" onChange={changeRadioInput} value="standard"></input>
                                <label>Kelvin</label>
                            </div>

                            <div className="unit-input-block">
                                <input type="radio" name="unit-input" value="metric" onChange={changeRadioInput} defaultChecked></input>
                                <label>Celsius</label>
                            </div>

                            <div className="unit-input-block">
                                <input type="radio" name="unit-input" value="imperial" onChange={changeRadioInput}></input>
                                <label>Fahrenheit</label>
                            </div>

                        </div>
                        <div className="city-name-input-block">
                            <TextField
                                className="form-control city-input"
                                id="outlined-basic" 
                                label="Give me a city name!" 
                                variant="outlined"
                                value={cityName}
                                name="city-name"
                                required
                                onChange={changeCityValue}
                            />
                            <Button type="submit" variant="contained" name="weatherAppButton">click me</Button>
                        </div>
                    </form>
                    <Zoom in={errorMessage !== ""}>
                        <div className="error-div">
                            <p className="error-text">{errorMessage}</p>
                        </div>
                    </Zoom>
                </Container>
            </section>

            <Collapse in={result.cod === 200}>
                <section id="weather-app-result-section" className="mt">
                    <Container>
                        <Container className="data-container">
                            <h2 className="data-title">Latest search</h2>
                            
                            <Row className="weather-for">
                                <h3>Weather for {result.cityName} ({result.country})</h3>
                            </Row>

                            <Row>
                                <Col className="img-col">
                                    <img src={result.resultImage} alt="weather"></img>
                                    <p>{result.weatherDescription}</p>
                                </Col>
                                <Col className="temperature">
                                    {result.temperature + " " + unitSystem.tempUnit}
                                </Col>
                            </Row>

                            <Row className="wind-row">
                                <Col md={6}>
                                    <p>Wind: {result.windSpeed + " " + unitSystem.speedUnit}</p>
                                </Col>
                                <Col md={6}>
                                    <p>Pressure: {result.pressure + " " + unitSystem.pressureUnit}</p>
                                </Col>
                            </Row>
                        </Container>
                    </Container>
                </section>
            </Collapse>
        </section>
        
    )
};

export default WeatherApp;