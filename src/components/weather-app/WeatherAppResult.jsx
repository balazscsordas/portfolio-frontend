import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";

function WeatherAppResult() {

    const [result, setResult] = useState({
        cityName: "",
        weatherDescription: "",
        temperature: "",
        windSpeed: "",
        resultImage: ""
    });

    function getWeatherData() {
        axios.get("http://localhost:8000/weather-app/api/get-weather-data")
        .then((response) => {
            setResult({
                cityName: response.data.name,
                weatherDescription: response.data.weather[0].description,
                temperature: response.data.main.temp,
                windSpeed: response.data.wind.speed,
                resultImage: "http://openweathermap.org/img/wn/" + response.data.weather[0].icon + "@2x.png"
            })
        })
        .catch (error => {
            console.log(error);
        });
    }

    

    return (
        <section id="weather-app-result-section">
            <div className="error-div">
                <p className="error-text">asd</p>
            </div>

            <Container className="data-container">
                <h2 className="data-title">Latest search</h2>
                
                <Row className="weather-for">
                    <h3>Weather for {result.cityName}</h3>
                </Row>

                <Row>
                    <Col className="img-col">
                        <img src={result.resultImage} alt="weather"></img>
                        <p>{result.weatherDescription}</p>
                    </Col>
                    <Col className="temperature">
                        {result.temperature}
                    </Col>
                </Row>

                <Row className="wind-row">
                    <p>Wind: {result.windSpeed}</p>
                </Row>
            </Container>
        </section>
    )
};

export default WeatherAppResult;