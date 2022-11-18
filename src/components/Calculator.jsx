import React from "react";
import $ from 'jquery'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function Calculator() {

  var previousNumber = "";
  var currentNumber = "";
  var operand = "";
  const operandsArray = ["+", "-", "*", "÷", "/"];
  var result = "";
  const characters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "*", "Enter", ".", "8", "9", "/", "Backspace", "Delete"]
  
  function clear() {
    previousNumber = "";
    currentNumber = "";
    result = "";
    operand = "";
  }
  
  function del() {
    currentNumber = currentNumber.toString().slice(0, -1);
  }
  
  
  function calculate() {
    switch (operand) {
      case "":
        break;
  
      case "+":
        result = Number(previousNumber) + Number(currentNumber);
        break;
  
      case "-":
        result = Number(previousNumber) - Number(currentNumber);
        break;
  
      case "*":
        result = Number(previousNumber) * Number(currentNumber);
        break;
  
      case "÷":
        result = Number(previousNumber) / Number(currentNumber);
        break;
  
      default:
        console.log("valami nem stimmel");
    }
  
    operand = "";
    currentNumber = result
    previousNumber = "";
  
    display();
  }
  
  function display() {
    $(".currentValueTextElement").text(currentNumber);
    $(".previousValueTextElement").text(previousNumber + operand)
  }
  
  
  function handleClick (event) {
    let clickedButton = event.target.innerText;
  
    if (operand === "" && currentNumber !== "" && operandsArray.includes(clickedButton) === true) {
      operand = clickedButton;
      previousNumber = currentNumber;
      currentNumber = "";
      display();
    }
  
    if (isNaN(clickedButton) === false && operand === "") {
      currentNumber = currentNumber.toString() + clickedButton.toString();
      display();
    }
  
  
    if (isNaN(clickedButton) === false && operand !== "") {
      currentNumber = currentNumber.toString() + clickedButton.toString();
      display();
    }
  
  
    if (clickedButton === "AC") {
      clear();
      display();
    }
  
    if (clickedButton === "DEL") {
      del();
      display();
    }
  
    if (clickedButton === "=") {
      calculate();
    }
  
    if (clickedButton === "." && currentNumber !== "") {
      if (currentNumber.includes(".") === false) {
        currentNumber = currentNumber.toString() + clickedButton.toString();
        display();
      }
    }
  }
    
    
  $(document).on("keydown", event => {
  
    if (characters.includes(event.key)) {
      let pressedCharacter = event.key;
  
      if (operand === "" && currentNumber !== "" && operandsArray.includes(pressedCharacter) === true) {
        if (pressedCharacter === "/") {
          operand = "÷";
        } else {
          operand = pressedCharacter;
        }
        previousNumber = currentNumber;
        currentNumber = "";
        display();
      }
  
      if (isNaN(pressedCharacter) === false && operand === "") {
        currentNumber = currentNumber.toString() + pressedCharacter.toString();
        display();
      }
  
  
      if (isNaN(pressedCharacter) === false && operand !== "") {
        currentNumber = currentNumber.toString() + pressedCharacter.toString();
        display();
      }
  
      if (pressedCharacter === "Delete") {
        clear();
        display();
      }
  
      if (pressedCharacter === "Backspace") {
        del();
        display();
      }
  
  
      if (pressedCharacter === "Enter") {
        calculate();
      }
  
      if (pressedCharacter === "." && currentNumber !== "") {
        if (currentNumber.includes(".") === false) {
          currentNumber = currentNumber.toString() + pressedCharacter.toString();
          display();
        }
      }
    }
  });
    
  return (
    <section id="calculator-section" className="mt">
      <Container>
          <Row className="calculatorBlock">
            <div className="output">
              <div className="previousValueTextElement">
              </div>
              <div className="currentValueTextElement">
              </div>
            </div>
            <div className="buttons">
                <button onClick={handleClick} className="calculatorBtn btnClearAll button2">AC</button>
                <button onClick={handleClick} className="calculatorBtn btnDelete button1">DEL</button>
                <button onClick={handleClick} className="calculatorBtn btnOperation button1">÷</button>
                <button onClick={handleClick} className="calculatorBtn btnNumber button1">1</button>
                <button onClick={handleClick} className="calculatorBtn btnNumber button1">2</button>
                <button onClick={handleClick} className="calculatorBtn btnNumber button1">3</button>
                <button onClick={handleClick} className="calculatorBtn btnOperation button1">*</button>
                <button onClick={handleClick} className="calculatorBtn btnNumber button1">4</button>
                <button onClick={handleClick} className="calculatorBtn btnNumber button1">5</button>
                <button onClick={handleClick} className="calculatorBtn btnNumber button1">6</button>
                <button onClick={handleClick} className="calculatorBtn btnOperation button1">+</button>
                <button onClick={handleClick} className="calculatorBtn btnNumber button1">7</button>
                <button onClick={handleClick} className="calculatorBtn btnNumber button1">8</button>
                <button onClick={handleClick} className="calculatorBtn btnNumber button1">9</button>
                <button onClick={handleClick} className="calculatorBtn btnOperation button1">-</button>
                <button onClick={handleClick} className="calculatorBtn btnDot button1">.</button>
                <button onClick={handleClick} className="calculatorBtn btnNumber button1">0</button>
                <button onClick={handleClick} className="calculatorBtn btnEquals button2">=</button>
            </div>
          </Row>
      </Container>
    </section>
  )
};

export default Calculator;