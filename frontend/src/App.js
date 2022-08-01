import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import '../src/style.css'

export default function App() {


    //Need to figure out how to deal with cpu dice. Use the same dice as other player? 
    
    
    const [currentTurn, setCurrentTurn] = React.useState(Math.random() < 0.5 ? 'player' : 'cpu')
    const [dice, setDice] = React.useState(allNewDice("player"))
    const [winRoll, setWinRoll] = React.useState(false)
    const [computerDice, setComputerDice] = React.useState(allNewDice("cpu"))
    const [status, setStatus] = React.useState(`It is the ${currentTurn}'s turn`)
    const [playerScore, setPlayerScore] = React.useState(0)
    const [cpuScore, setCPUScore] = React.useState(0)

    const playerWinsMessage = `Player wins! It is the CPU's turn`
    const computerWinsMessage = `CPU wins! It is the player's turn`



    React.useEffect(() => {
        const allDiceValues = dice.map(element => element.value)
        const allCPUDiceValues = computerDice.map(element => element.value)
       



        console.log(currentTurn)
        //Disable button if computer turn

      /*  if (currentTurn === 'cpu'){
        document.querySelector(".roll-dice").setAttribute("disabled", true)
        }
*/
        //Check instant win (4,5,6)

        if (currentTurn === 'player'){
            if (allDiceValues.includes(4) && allDiceValues.includes(5) && allDiceValues.includes(6)){
                setWinRoll(true)
                setPlayerScore(prev => prev + 1)
                setCurrentTurn('cpu') 
                setStatus(playerWinsMessage)

            }
        }

        if (currentTurn === 'cpu'){
            if (allCPUDiceValues.includes(4) && allCPUDiceValues.includes(5) && allCPUDiceValues.includes(6) ){
                setWinRoll(true)
                setCPUScore(prev => prev + 1)    
                setCurrentTurn('player')  
                setStatus(computerWinsMessage)
            }
    }

        //Check triple win

        if (currentTurn === 'player'){
            if (allDiceValues.every(value => value === allDiceValues[0])){
                setWinRoll(true)
                setPlayerScore(prev => prev + 1)
                setCurrentTurn('cpu') 
                setStatus(playerWinsMessage)

            }
        }


        if (currentTurn === 'cpu'){
            if (allCPUDiceValues.every(value => value === allDiceValues[0])){
                setWinRoll(true)
                setCPUScore(prev => prev + 1)
                setCurrentTurn('player') 
                setStatus(computerWinsMessage)

            }
        }

        //Check pair + 6 win

        if (currentTurn === 'player' && allDiceValues.includes(6)){
           allDiceValues.sort()
           console.log(allDiceValues)
            if (allDiceValues[2] === 6 && allDiceValues[0] === allDiceValues[1]){
                setWinRoll(true)
                setPlayerScore(prev => prev + 1)
                setCurrentTurn('cpu') 
                setStatus(playerWinsMessage)

            }
        }


        if (currentTurn === 'cpu' && allCPUDiceValues.includes(6)){
            allCPUDiceValues.sort()
            console.log(allCPUDiceValues)
             if (allCPUDiceValues[2] === '6' && allCPUDiceValues[0] === allCPUDiceValues[1]){
                 setWinRoll(true)
                 setCPUScore(prev => prev + 1)
                 setCurrentTurn('player') 
                 setStatus(computerWinsMessage)
             }
         }




    }, [dice, currentTurn])

    function generateNewDie(diceHolder) {
        return {
            value: Math.ceil(Math.random() * 6),
            id: nanoid(),
            heldBy: diceHolder
        }
    }


    
    function allNewDice(diceHolder) {
        const newDice = []
        for (let i = 0; i < 3; i++) {
            newDice.push(generateNewDie(diceHolder))
            
        }
        return newDice
    }
    
    function rollDice() {
        
        setDice(allNewDice("player"))
        setComputerDice(allNewDice("cpu"))

      
        //  setDice(oldDice => oldDice.map(die => generateNewDie("player")))
    }



   
    const computerDiceElements = computerDice.map(die => (
        <Die 
            key={die.id} 
            value={die.value}  
            heldBy="cpu"
        />))

    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value}  
            heldBy="player"
        />
    ))






    
    return (
        <main>
            <h1 className="title">Cee-lo</h1>
            <p className="instructions">Win order: Triple, 4-5-6, Pair plus odd value. Instant lose: 1-2-3.</p>
            <h3>{status}</h3>
            <span>Score</span> <h4>CPU: {cpuScore}  Player: {playerScore}</h4>
            
            
            <div className='cpu-display-container'>
                <h3>Computer Roll</h3>
                <div className="cpu-dice-container">
                {computerDiceElements}
                </div>
                </div>
            
            <div className='user-display-container'>
                <h3>User Roll</h3>
                <div className="user-dice-container">
                 {diceElements }
                </div>
                </div>

                <button 
                className="roll-dice" 
                onClick={rollDice}>
                 Roll
            </button>
            
        </main>
    )
}