import { useState, useContext } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Button from '@mui/material/Button';
import axios from 'axios';
import AuthContext from "../../context/AuthProvider";
const blueSound = require("./sounds/blue.mp3");
const yellowSound = require("./sounds/yellow.mp3");
const redSound = require("./sounds/red.mp3");
const greenSound = require("./sounds/green.mp3");
const wrongSound = require("./sounds/wrong.mp3");
const $ = require('jquery');

const Game = () => {

  const { auth, setAuth } = useContext(AuthContext);
  const [currentScore, setCurrentScore] = useState(0);
  const [text, setText] = useState("start");
  const [gamePattern, setGamePattern] = useState<string[]>([]);
  const [started, setStarted] = useState(false);
  var userClickedPattern: string[] = [];
  const buttonColors = ["red", "blue", "green", "yellow"];

  const startGame = () => {
    if(!started) {
      nextSequence();
      setStarted(true);
    }
  }
  
  const nextSequence = () => {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    userClickedPattern = [];
    setGamePattern(current => [...current, randomChosenColor]);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
  }
  
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(started) {
      const target = e.target as HTMLInputElement;
      let userChosenColor = target.value;
      userClickedPattern.push(userChosenColor);
      playSound(userChosenColor);
      checkAnswer(userClickedPattern.length - 1);
    }
  }
    
  const checkAnswer = (value: number) => {
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
  
  const playSound = (name: string) => {
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
      
  const startOver = () => {
    recordChecker();
    playSound("wrong");
    userClickedPattern = [];
    setGamePattern([]);
    setCurrentScore(0);
    setStarted(false);
    setText("Restart")
  }

// Összehasonlítja a jelenleg elért szintet a legjobb szintjével, ha rekord van akkor módosítja az adatot
  const recordChecker = () => { 
    if (auth.bestScore !== undefined && currentScore > auth.bestScore) {
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

  const sendNewRecord = async () => {
    try {
      const url = process.env.REACT_APP_BASEURL + "/api/setNewRecord";
      const params = {id: auth.id, record: currentScore};
      const response = await axios.patch(url, params);
      console.log(response.data.message);
    }
    catch(err) {
      console.log(err);
    }
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