import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import Zoom from '@mui/material/Zoom';
import Collapse from '@mui/material/Collapse';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';

const WeatherApp = () => {

    type Result = {
        cityName: string;
        weatherDescription: string;
        temperature: string;
        windSpeed: string;
        resultImage: string;
        cod: number | string;
        country: string;
        pressure: string;
    }

    const [cityName, setCityName] = useState("");
    const [radioInput, setRadioInput] = useState("metric");
    const [unitSystem, setUnitSystem] = useState({
        speedUnit: "",
        tempUnit: "",
        pressureUnit: ""
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [result, setResult] = useState<Result>({
        cityName: "",
        weatherDescription: "",
        temperature: "",
        windSpeed: "",
        resultImage: "",
        cod: 2,
        country: "",
        pressure: ""
    });

    const changeCityValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCityName(e.target.value);
    }

    const changeRadioInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRadioInput(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        getWeatherData();
        setCityName("");
    }

    const getWeatherData = async () => {
        try {
            const url = process.env.REACT_APP_BASEURL + "/api/get-weather-data";
            const params = {cityNameInput: cityName, radioInput: radioInput};
            const response = await axios.post(url, params);
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
        }
        catch (err) {
            err instanceof Error && console.log(err.message);
        }
    }

const unitChanger = (unit: string) => {
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
                                <input
                                    type="radio"
                                    name="unit-input"
                                    onChange={changeRadioInput}
                                    value="standard">
                                </input>
                                <label>Kelvin</label>
                            </div>

                            <div className="unit-input-block">
                                <input
                                    type="radio"
                                    name="unit-input"
                                    value="metric"
                                    onChange={changeRadioInput}
                                    defaultChecked>
                                </input>
                                <label>Celsius</label>
                            </div>

                            <div className="unit-input-block">
                                <input
                                    type="radio"
                                    name="unit-input"
                                    value="imperial"
                                    onChange={changeRadioInput}>
                                </input>
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
                            <Button className="global-button" type="submit" variant="contained" name="weatherAppButton">click me</Button>
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