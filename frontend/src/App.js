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
    const [playerRoundPoint, setPlayerRoundPoint] = React.useState(0)
    const [computerRoundPoint, setComputerRoundPoint] = React.useState(0)
    const [playerScore, setPlayerScore] = React.useState(0)
    const [cpuScore, setCPUScore] = React.useState(0)



    React.useEffect(() => {
        const allDiceValues = dice.map(element => element.value)
        const allCPUDiceValues = computerDice.map(element => element.value)
       

        //Have to set new turn outside in case of draw
        //Or have state where button needs to be pressed


        //Disable button if computer turn

      /*  if (currentTurn === 'cpu'){
        document.querySelector(".roll-dice").setAttribute("disabled", true)
        }
*/
        // Check instant win (4,5,6)

        if (currentTurn === 'player'){
            if (allDiceValues.includes(4) && allDiceValues.includes(5) && allDiceValues.includes(6)){
                setWinRoll(true)
                setPlayerScore(prev => prev + 1)
                setCurrentTurn('cpu') 
                setStatus(`Player wins. Rolled 4, 5, 6. CPU's turn.`)

            }
        }

        if (currentTurn === 'cpu'){
            if (allCPUDiceValues.includes(4) && allCPUDiceValues.includes(5) && allCPUDiceValues.includes(6) ){
                setWinRoll(true)
                setCPUScore(prev => prev + 1)    
                setCurrentTurn('player')  
                setStatus(`CPU wins. Rolled 4, 5, 6. Player's turn.`)
            }
    }

        // Check instant triple win

        if (currentTurn === 'player'){
            if (allDiceValues.every(value => value === allDiceValues[0])){
                setWinRoll(true)
                setPlayerScore(prev => prev + 1)
                setCurrentTurn('cpu') 
                setStatus(`Player wins. Rolled triples. CPU's turn.`)

            }
        }


        if (currentTurn === 'cpu'){
            if (allCPUDiceValues.every(value => value === allCPUDiceValues[0])){
                setWinRoll(true)
                setCPUScore(prev => prev + 1)
                setCurrentTurn('player') 
                setStatus(`CPU wins. Rolled triples. Player's turn.`)

            }
        }

        //Check instant pair + 6 win

        if (currentTurn === 'player' && allDiceValues.includes(6)){
           
            allDiceValues.sort()

            if (allDiceValues[2] === 6 && allDiceValues[0] === allDiceValues[1]){
                setWinRoll(true)
                setPlayerScore(prev => prev + 1)
                setCurrentTurn('cpu') 
                setStatus(`Player wins. Pair + 6. CPU's turn.`)

            }
        }


        if (currentTurn === 'cpu' && allCPUDiceValues.includes(6)){
           
            allCPUDiceValues.sort()
       
             if (allCPUDiceValues[2] === 6 && allCPUDiceValues[0] === allCPUDiceValues[1]){
                 setWinRoll(true)
                 setCPUScore(prev => prev + 1)
                 setCurrentTurn('player') 
                 setStatus(`CPU wins. Pair + 6. Player's turn.`)
             }
         }

            // Check instant loss - 1, 2, 3

         

            if (currentTurn === 'player'){
                if (allDiceValues.includes(1) && allDiceValues.includes(2) && allDiceValues.includes(3)){
                    setWinRoll(true)
                    setCPUScore(prev => prev + 1)
                    setCurrentTurn('cpu') 
                    setStatus(`Player loses. Rolled 1, 2, 3. CPU's turn`)
    
    
                }
            }
    
            if (currentTurn === 'cpu'){
                if (allCPUDiceValues.includes(1) && allCPUDiceValues.includes(2) && allCPUDiceValues.includes(3) ){
                    setWinRoll(true)
                    setPlayerScore(prev => prev + 1)    
                    setCurrentTurn('player')  
                    setStatus(`CPU loses. Rolled 1, 2, 3. Player's turn`)
                
                }
        }


                    // Check instant loss - Pair + 1


                    if (currentTurn === 'player' && allDiceValues.includes(1)){
           
                        allDiceValues.sort()
            
                        if (allDiceValues[0] === 1 && allDiceValues[1] === allDiceValues[2]){
                            setWinRoll(true)
                            setCPUScore(prev => prev + 1)
                            setCurrentTurn('cpu') 
                            setStatus(`Player loses. Pair + 1. CPU's turn.`)
            
                        }
                    }
            
            
                    if (currentTurn === 'cpu' && allCPUDiceValues.includes(1)){
           
                        allCPUDiceValues.sort()
            
                        if (allCPUDiceValues[0] === 1 && allCPUDiceValues[1] === allCPUDiceValues[2]){
                            setWinRoll(true)
                            setCPUScore(prev => prev + 1)
                            setCurrentTurn('player') 
                            setStatus(`CPU loses. Pair + 1. Player's turn.`)
            
                        }
                    }


                    // Check round point

                    if (currentTurn === 'player'){
                    let pairCount = 0
                    let pairDice = []
                    for (let i = 0; i < allDiceValues.length; i++){
                        if (allDiceValues[i] === allDiceValues[i+1]){
                            pairCount++
                            pairDice.push(allDiceValues[i])
                            pairDice.push(allDiceValues[i + 1])
                        }
                    
                    if (pairCount === 1){
                        let filtered = allDiceValues.filter(value => value !== pairDice[0])
                        setPlayerRoundPoint(filtered)
                        setStatus(`Player rolled pair + ${playerRoundPoint}`)
                    }
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
            <p className="instructions">Win order: Triple, 4-5-6, Pair and 6. Instant lose: 1-2-3, Pair and 1.</p>
            <h3>{status}</h3>
            <span>Score</span> <h4>CPU: {cpuScore}  Player: {playerScore}</h4>
            
            
            <div className='cpu-display-container'>
                <h3>Computer Roll</h3>
                <div className="cpu-dice-container">
                {computerDiceElements}
                </div>
                </div>
            
            <div className='user-display-container'>
                <h3>Player Roll</h3>
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