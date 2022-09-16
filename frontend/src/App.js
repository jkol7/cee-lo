import React, { useEffect, useState } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import "../src/style.css";
import Instructions from "./Instructions";
import { BsArrowDownSquareFill } from "react-icons/bs";
import { IconContext } from "react-icons";

export default function App() {
  const [dice, setDice] = useState([]);
  const [computerDice, setComputerDice] = useState([]);
  const [status, setStatus] = useState("Roll to start");
  const [roundWinner, setRoundWinner] = useState("");
  const [playerScore, setPlayerScore] = useState(0);
  const [cpuScore, setCPUScore] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const allDiceValues = dice.map((element) => element.value).sort();
    const allCPUDiceValues = computerDice
      .map((element) => element.value)
      .sort();
    let returnedIsOver = false;

    // Each turn, this calls functions to determine the different winning/losing logic.
    // If the turn is over, returnedIsOver = true and we return before checking the next conditon.

    if (dice.length < 1) {
      return;
    }

    returnedIsOver = checkFourFiveSix();

    if (returnedIsOver === true) {
      return;
    }

    returnedIsOver = checkTriple();

    if (returnedIsOver === true) {
      return;
    }

    returnedIsOver = checkPairWithSix();

    if (returnedIsOver === true) {
      return;
    }

    returnedIsOver = checkOneTwoThree();

    if (returnedIsOver === true) {
      return;
    }

    returnedIsOver = checkPairWithOne();

    if (returnedIsOver === true) {
      return;
    }

    returnedIsOver = compareRoundPoints();

    if (returnedIsOver === true) {
      return;
    }

    // Check instant win (4,5,6)

    function checkFourFiveSix() {
      if (
        allDiceValues.includes(4) &&
        allDiceValues.includes(5) &&
        allDiceValues.includes(6) &&
        allCPUDiceValues.includes(4) &&
        allCPUDiceValues.includes(5) &&
        allCPUDiceValues.includes(6)
      ) {
        setStatus("Draw. Both rolled 4-5-6.");
        setRoundWinner("Draw");
        return true;
      } else if (
        allDiceValues.includes(4) &&
        allDiceValues.includes(5) &&
        allDiceValues.includes(6)
      ) {
        setRoundWinner("Player");
        setStatus("Player wins 4-5-6.");
        setPlayerScore((prev) => prev + 1);
        return true;
      } else if (
        allCPUDiceValues.includes(4) &&
        allCPUDiceValues.includes(5) &&
        allCPUDiceValues.includes(6)
      ) {
        setRoundWinner("CPU");
        setStatus("CPU wins 4-5-6");
        setCPUScore((prev) => prev + 1);
        return true;
      }

      return false;
    }

    // Check instant win (Triple)

    function checkTriple() {
      if (
        allDiceValues.every((value) => value === allDiceValues[0]) &&
        allCPUDiceValues.every((value) => value === allCPUDiceValues[0])
      ) {
        setStatus("Both rolled triples. Draw.");
        return true;
      } else if (allDiceValues.every((value) => value === allDiceValues[0])) {
        setRoundWinner("Player");
        setStatus(`Player wins. Rolled triples.`);
        setPlayerScore((prev) => prev + 1);
        return true;
      } else if (
        allCPUDiceValues.every((value) => value === allCPUDiceValues[0])
      ) {
        setRoundWinner("CPU");
        setStatus(`CPU wins. Rolled triples.`);
        setCPUScore((prev) => prev + 1);
        return true;
      }
      return false;
    }

    // Check instant win (Pair with a six)

    function checkPairWithSix() {
      if (
        allDiceValues[2] === 6 &&
        allDiceValues[0] === allDiceValues[1] &&
        allCPUDiceValues[2] === 6 &&
        allCPUDiceValues[0] === allCPUDiceValues[1]
      ) {
        setStatus("Both have pair with six. Draw.");
        return true;
      } else if (
        allDiceValues[2] === 6 &&
        allDiceValues[0] === allDiceValues[1]
      ) {
        setRoundWinner("Player");
        setStatus("Player wins. Pair with six.");
        setPlayerScore((prev) => prev + 1);
        return true;
      } else if (
        allCPUDiceValues[2] === 6 &&
        allCPUDiceValues[0] === allCPUDiceValues[1]
      ) {
        setRoundWinner("CPU");
        setStatus("CPU wins. Pair with six.");
        setCPUScore((prev) => prev + 1);
        return true;
      }
      return false;
    }

    // Check instant loss - 1, 2, 3

    function checkOneTwoThree() {
      if (
        allDiceValues.includes(1) &&
        allDiceValues.includes(2) &&
        allDiceValues.includes(3) &&
        allCPUDiceValues.includes(1) &&
        allCPUDiceValues.includes(2) &&
        allCPUDiceValues.includes(3)
      ) {
        setStatus("Draw with 1-2-3");
        return true;
      } else if (
        allDiceValues.includes(1) &&
        allDiceValues.includes(2) &&
        allDiceValues.includes(3)
      ) {
        setRoundWinner("PlayerLoser");
        setStatus("Player loses from 1-2-3");
        setCPUScore((prev) => prev + 1);
        return true;
      } else if (
        allCPUDiceValues.includes(1) &&
        allCPUDiceValues.includes(2) &&
        allCPUDiceValues.includes(3)
      ) {
        setRoundWinner("CPULoser");
        setStatus("CPU loses from 1-2-3");
        setPlayerScore((prev) => prev + 1);
        return true;
      }
      return false;
    }

    // Check instant loss - Pair + 1

    function checkPairWithOne() {
      if (
        allDiceValues[0] === 1 &&
        allDiceValues[1] === allDiceValues[2] &&
        allCPUDiceValues[0] === 1 &&
        allCPUDiceValues[1] === allCPUDiceValues[2]
      ) {
        setStatus("Draw. Pair with one.");
        return true;
      } else if (
        allDiceValues[0] === 1 &&
        allDiceValues[1] === allDiceValues[2]
      ) {
        setRoundWinner("PlayerLoser");
        setStatus(`Player loses. Rolled Pair with 1.`);
        setCPUScore((prev) => prev + 1);
        return true;
      } else if (
        allCPUDiceValues[0] === 1 &&
        allCPUDiceValues[1] === allCPUDiceValues[2]
      ) {
        setRoundWinner("CPULoser");
        setStatus("CPU loses. Rolled pair with 1.");
        setPlayerScore((prev) => prev + 1);
        return true;
      }
      return false;
    }

    // If no instant win or loss, check if there is a pair. If both pairs, compare third die.

    function compareRoundPoints() {
      let playerPairCount = false;
      let computerPairCount = false;
      let playerRoundPoint = 0;
      let computerRoundPoint = 0;

      // Check if there's a pair for the player. If there is, store the third die as the point.

      if (allDiceValues[0] === allDiceValues[1]) {
        playerPairCount = true;
        playerRoundPoint = allDiceValues[2];
      }

      if (allDiceValues[1] === allDiceValues[2]) {
        playerPairCount = true;
        playerRoundPoint = allDiceValues[0];
      }

      // Check if there's a pair for the CPU. If there is, store the third die as the point.

      if (allCPUDiceValues[0] === allCPUDiceValues[1]) {
        computerPairCount = true;
        computerRoundPoint = allCPUDiceValues[2];
      }

      if (allCPUDiceValues[1] === allCPUDiceValues[2]) {
        computerPairCount = true;
        computerRoundPoint = allCPUDiceValues[0];
      }

      // Determine who wins based on pair count. If both have pairs, then we check the round point.

      if (!computerPairCount && !playerPairCount) {
        setStatus("No winner. Must re-roll.");
        return true;
      } else if (playerPairCount && !computerPairCount) {
        setStatus(`Player wins with a pair.`);
        setRoundWinner("Player");
        setPlayerScore((prev) => prev + 1);
        console.log(`This is player round point : ${playerRoundPoint}`);
        return true;
      } else if (!playerPairCount && computerPairCount) {
        setStatus(`CPU wins with a pair.`);
        setCPUScore((prev) => prev + 1);
        setRoundWinner("CPU");
        console.log(`This is CPU round point ${computerRoundPoint}`);
        return true;
      } else if (computerPairCount === playerPairCount) {
        if (playerRoundPoint > computerRoundPoint) {
          setStatus(`Two pairs. Player wins with ${playerRoundPoint}.`);
          setRoundWinner("Player");
          setPlayerScore((prev) => prev + 1);
          return true;
        } else if (computerRoundPoint > playerRoundPoint) {
          setStatus(`Two pairs. CPU wins with ${computerRoundPoint}.`);
          setRoundWinner("CPU");
          setCPUScore((prev) => prev + 1);
          return true;
        } else if (computerRoundPoint === playerRoundPoint) {
          setStatus(`Same value. Roll again.`);
          return true;
        }
      }
    }
  }, [dice]);

  // Sets background color of winning player if win/loss

  useEffect(() => {
    if (roundWinner === "Player") {
      let selected = document.querySelector(".user-dice-container");
      selected.classList.add("winning-color");
    }

    if (roundWinner === "CPU") {
      let selected = document.querySelector(".cpu-dice-container");
      selected.classList.add("winning-color");
    }

    if (roundWinner === "CPULoser") {
      let selected = document.querySelector(".cpu-dice-container");
      selected.classList.add("losing-color");
    }

    if (roundWinner === "PlayerLoser") {
      let selected = document.querySelector(".user-dice-container");
      selected.classList.add("losing-color");
    }

    if (roundWinner === "") {
      let selectedPlayer = document.querySelector(".user-dice-container");
      let selectedCPU = document.querySelector(".cpu-dice-container");
      selectedPlayer.classList.remove("winning-color");
      selectedCPU.classList.remove("winning-color");
      selectedPlayer.classList.remove("losing-color");
      selectedCPU.classList.remove("losing-color");
    }
  }, [roundWinner]);

  // Generates a random die when called
  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      id: nanoid(),
    };
  }

  // Creates the dice array

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 3; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  // Creates new dice and sets round winner back to default

  function rollDice() {
    setDice(allNewDice());
    setComputerDice(allNewDice());
    setRoundWinner("");
    setStatus("No result. Keep rolling!");
  }

  const computerDiceElements = computerDice.map((die) => (
    <Die key={die.id} value={die.value} />
  ));

  const diceElements = dice.map((die) => (
    <Die key={die.id} value={die.value} />
  ));

  function modalOpenClose() {
    setModalOpen((prevModalOpen) => !prevModalOpen);
  }

  return (
    <main>
      <div className="titleInstructions">
        <h1 className="title">🎲 Cee-lo 🎲</h1>
        <p onClick={modalOpenClose}>Instructions</p>
      </div>
      {modalOpen && <Instructions modalOpenClose={modalOpenClose} />}

      <div className="scoreContainer">
        <div className="playerScoreContainer">
          <h5>Player</h5>
          <h4>{playerScore}</h4>
        </div>
        <div className="cpuScoreContainer">
          <h5>CPU</h5> <h4>{cpuScore}</h4>
        </div>
      </div>

      <div className="statusContainer flex-col">
        <h3>{status}</h3>
        {status === "Roll to start" ? (
          <IconContext.Provider
            value={{
              color: "#2f3336",
              size: "2.5em",
              className: "down-arrow",
            }}
          >
            <BsArrowDownSquareFill />
          </IconContext.Provider>
        ) : (
          <></>
        )}
      </div>

      <div
        className={
          status === "Roll to start" ? "hide" : "cpu-display-container"
        }
      >
        <h3>Computer Roll</h3>
        <div className="cpu-dice-container">{computerDiceElements}</div>
      </div>

      <div
        className={
          status === "Roll to start" ? "hide" : "user-display-container"
        }
      >
        <h3>Player Roll</h3>
        <div className="user-dice-container game-start">{diceElements}</div>
      </div>
      <button className="roll-dice" onClick={rollDice}>
        Roll
      </button>
    </main>
  );
}
