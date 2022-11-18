import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import axios from "axios";

function WeatherAppInput() {

    const [cityName, setCityName] = useState("");

    function changeCityValue(event) {
        setCityName(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        axios.post("/fa", {
            Name: cityName
        })
        .then((response) => {
            console.log(response);
        })
        .catch (error => {
            console.log(error);
        });
        setCityName("");
    }

    return (
        <section id="weather-app-input-section">
            <Container className="weather-app-container">
                <form onSubmit={handleSubmit} action="/weather-app" method="post">
                    <div className="unit-choose-block">
                        <h2 className="unit-choose-title">Choose unit</h2>
                        
                        <div className="unit-input-block">
                            <input type="radio" name="unit-input" value="standard"></input>
                            <label>Kelvin</label>
                        </div>

                        <div className="unit-input-block">
                            <input type="radio" name="unit-input" value="metric" defaultChecked></input>
                            <label>Celsius</label>
                        </div>

                        <div className="unit-input-block">
                            <input type="radio" name="unit-input" value="imperial"></input>
                            <label>Fahrenheit</label>
                        </div>

                    </div>
                    <div className="city-name-input-block">
                        
                    </div>
                </form>
            </Container>
        </section>
    )
};

export default WeatherAppInput;