import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import $ from 'jquery'
import Button from '@mui/material/Button';
import blueSound from "./sounds/blue.mp3";
import yellowSound from "./sounds/yellow.mp3";
import redSound from "./sounds/red.mp3";
import greenSound from "./sounds/green.mp3";
import wrongSound from "./sounds/wrong.mp3";
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

function Game() {

  const { auth, setAuth } = useAuth();

  const [currentScore, setCurrentScore] = useState(0);
  const [text, setText] = useState("start");
  const [gamePattern, setGamePattern] = useState([]);
  const [started, setStarted] = useState(false);
  var userClickedPattern = [];
  const buttonColors = ["red", "blue", "green", "yellow"];

    
  function startGame() {
    if(!started) {
      nextSequence();
      setStarted(true);
    }
  }
  

  function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    userClickedPattern = [];
    setGamePattern(current => [...current, randomChosenColor]);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
  }

  
  function handleButtonClick (event) {
    if(started) {
      let userChosenColor = (event.target.value);
      userClickedPattern.push(userChosenColor);
      playSound(userChosenColor);
      checkAnswer(userClickedPattern.length - 1);
    }
  }
  
    
  function checkAnswer(value) {
    if (gamePattern[value] === userClickedPattern[value]) {
      if (gamePattern.length === userClickedPattern.length) {
        setCurrentScore(currentScore + 10);
        setTimeout(() => {
          nextSequence();
        }, 1000);
      }
  
    } else {
      startOver();
    }
  }
      
  
  function playSound(name) {
    switch (name) {
      case "wrong":
        new Audio(wrongSound).play();
        break;

      case "green":
        new Audio(greenSound).play();
        break;
  
      case "blue":
        new Audio(blueSound).play();
        break;
  
      case "red":
        new Audio(redSound).play();
        break;
  
      case "yellow":
        new Audio(yellowSound).play();
        break;
  
      default:
    }
  }

      
  function startOver() {
    recordChecker();
    playSound("wrong");
    userClickedPattern = [];
    setGamePattern([]);
    setCurrentScore(0);
    setStarted(false);
    setText("Restart")
  }


  function recordChecker() { // Összehasonlítja a jelenleg elért szintet a legjobb szintjével, ha rekord van akkor módosítja az adatot
    if (currentScore > auth.bestScore) {
      console.log("Rekorddöntés");
      setAuth(prevValues => {
        return {
          ...prevValues,
          bestScore: currentScore
        }
      });
      sendNewRecord()
    }
  }

  function sendNewRecord() {
    const options = {
      method: "PATCH",
      url: "/api/setNewRecord",
      params: {email: auth.email, record: currentScore}
    }
    axios.request(options).catch(err => {
      console.log(err);
    })
  }

  return (
    <Container id="game-container" className=" mt">
        <Row className="buttons-block">
          {currentScore > 0
            ? <Button className="game-center-button" variant="contained">Score: {currentScore}</Button>
            : <Button onClick={startGame} className="game-center-button" variant="contained">{text}</Button>
          }
          <Button onClick={handleButtonClick} value="green" id="green" className="btn green"></Button>
          <Button onClick={handleButtonClick} value="red" id="red" className="btn red"></Button>
          <Button onClick={handleButtonClick} value="yellow" id="yellow" className="btn yellow"></Button>
          <Button onClick={handleButtonClick} value="blue" id="blue" className="btn blue"></Button>
        </Row>
    </Container>
  )
};

export default Game;