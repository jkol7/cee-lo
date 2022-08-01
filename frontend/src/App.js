import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import '../src/style.css'

export default function App() {


    //Need to figure out how to deal with cpu dice. Use the same dice as other player? 
    
    
    const [playerTurn, setPlayerTurn] = React.useState(Math.random() < 0.5 ? true : false)
    const [dice, setDice] = React.useState(allNewDice("player"))
    const [winRoll, setWinRoll] = React.useState(false)
    const [computerDice, setComputerDice] = React.useState(allNewDice("cpu"))
    const [status, setStatus] = React.useState(playerTurn ? `It is the player's turn` : `It is the cpu's turn` )
    const [playerRoundPoint, setPlayerRoundPoint] = React.useState(0)
    const [computerRoundPoint, setComputerRoundPoint] = React.useState(0)
    const [playerScore, setPlayerScore] = React.useState(0)
    const [cpuScore, setCPUScore] = React.useState(0)



    React.useEffect(() => {
        let diceToCheck
        const allDiceValues = dice.map(element => element.value)
        const allCPUDiceValues = computerDice.map(element => element.value)
       
        checkFourFiveSix()
        checkTriple()
        checkPairWithSix()
        checkOneTwoThree()
        checkPairWithOne()

        if (winRoll !== true){
            compareRoundPoints()
            /*
           if (playerRoundPoint > computerRoundPoint) {
                console.log(`Player wins. Congrats you're here. Current player point ${playerRoundPoint} and cpu: ${computerRoundPoint}`)
               setPlayerScore(prev => prev + 1)
                setPlayerTurn(prev => !prev)
            }

           if (computerRoundPoint > playerRoundPoint) {
            
            console.log(`CPU wins. Congrats you're here. Current player point ${playerRoundPoint} and cpu: ${computerRoundPoint}`)
           setCPUScore(prev => prev + 1)
            setPlayerTurn(prev => !prev)

         }

       if (computerRoundPoint === playerRoundPoint) {
        console.log(`Draws. Congrats you're here. Current player point ${playerRoundPoint} and cpu: ${computerRoundPoint}`)
        setPlayerTurn(prev => !prev)
    
    }
*/
    }

      /*  if (currentTurn === 'cpu'){
        document.querySelector(".roll-dice").setAttribute("disabled", true)
        }
*/


        // Check instant win (4,5,6)

        function checkFourFiveSix(){
            playerTurn ? diceToCheck = allDiceValues : diceToCheck = allCPUDiceValues
            if (diceToCheck.includes(4) && diceToCheck.includes(5) && diceToCheck.includes(6)){
                playerTurn? setStatus(`Player wins. Rolled 4, 5, 6. CPU turn.`) : setStatus(`CPU wins. Rolled 4, 5, 6. Player turn.`)
                setWinRoll(true)
                playerTurn ? setPlayerScore(prev => prev + 1) : setCPUScore(prev => prev + 1)
                setPlayerTurn(prev => !prev) 
            }
        }

        // Check instant win (Triple)

        function checkTriple(){
            playerTurn ? diceToCheck = allDiceValues : diceToCheck = allCPUDiceValues
            if (diceToCheck.every(value => value === diceToCheck[0])){
                playerTurn? setStatus(`Player wins. Rolled triples. CPU turn.`) : setStatus(`CPU wins. Rolled triples. Player turn.`)
                setWinRoll(true)
                playerTurn ? setPlayerScore(prev => prev + 1) : setCPUScore(prev => prev + 1)
                setPlayerTurn(prev => !prev) 
            }
        }

        // Check instant win (Pair with a six)

        function checkPairWithSix(){
            playerTurn ? diceToCheck = allDiceValues : diceToCheck = allCPUDiceValues
            if(diceToCheck.includes(6)){
                diceToCheck.sort()
            }

            if (diceToCheck[2] === 6 && diceToCheck[0] === diceToCheck[1]){
                setWinRoll(true)
                playerTurn? setStatus(`Player wins. Pair with 6. CPU's turn.`) : setStatus(`CPU wins. Pair with 6. Player's turn`)
                playerTurn ? setPlayerScore(prev => prev + 1) : setCPUScore(prev => prev + 1)
                setPlayerTurn(prev => !prev) 
            }
        }
        
            // Check instant loss - 1, 2, 3

            function checkOneTwoThree(){
                playerTurn ? diceToCheck = allDiceValues : diceToCheck = allCPUDiceValues
                if (diceToCheck.includes(1) && diceToCheck.includes(2) && diceToCheck.includes(3)){
                    playerTurn? setStatus(`Player loses. Rolled 1, 2, 3. CPU's turn.`) : setStatus(`CPU loses. Rolled 1, 2, 3. Player's turn.`)
                    setWinRoll(true)
                    playerTurn ? setCPUScore(prev => prev + 1) : setPlayerScore(prev => prev + 1)
                    setPlayerTurn(prev => !prev) 

            }
        }

            // Check instant loss - Pair + 1

            function checkPairWithOne(){
                playerTurn ? diceToCheck = allDiceValues : diceToCheck = allCPUDiceValues

                if (diceToCheck.includes(1)){
                diceToCheck.sort()
                }

                if (diceToCheck[0] === 1 && diceToCheck[1] === diceToCheck[2]){
                    setWinRoll(true)
                    playerTurn? setStatus(`Player loses. Rolled Pair with 1. CPU's turn.`) : setStatus(`CPU loses. Rolled Pair with 1. Player's turn`)
                    playerTurn ? setCPUScore(prev => prev + 1) : setPlayerScore(prev => prev + 1)
                    setPlayerTurn(prev => !prev) 
    
                }
            }


            function compareRoundPoints(){

                let playerPairCount = 0
                let computerPairCount = 0
                let playerPairDice = []
                let computerPairDice = []

                for (let i = 0; i < allDiceValues.length; i++){
                    if (allDiceValues[i] === allDiceValues[i+1]){
                        playerPairCount++
                        playerPairDice.push(allDiceValues[i])
                        playerPairDice.push(allDiceValues[i + 1])
                    }
                    if (allCPUDiceValues[1] === allCPUDiceValues[i+1]){
                        computerPairCount++
                        computerPairDice.push(allCPUDiceValues[i])
                        computerPairDice.push(allCPUDiceValues[i + 1])
                    }}

                if (computerPairCount < 1 && playerPairCount < 1 ){
                        console.log("Need to re-roll")
                        return
                    }

                else if (computerPairCount === playerPairCount){
                        console.log("Need to determine higher pair")
                        return
                }

                else if (playerPairCount > computerPairCount){
                    console.log("Player won the count")
                    /*let filtered = diceToCheck.filter(value => value !== pairDice[0])
                    playerTurn ? setPlayerRoundPoint(filtered) : setComputerRoundPoint(filtered)
                   playerTurn ? setStatus(`Player rolled pair + ${playerRoundPoint}`) : setStatus(`CPU rolled pair + ${computerRoundPoint}`)
                    setPlayerTurn(prev => !prev) */
                }
                else if (computerPairCount > playerPairCount){
                    console.log("Computer won the count")
                }

            

        
            }   

            /* Check round point if there is a double and not an instant win

                function roundPoint(){
                    
                    let pairCount = 0
                    let pairDice = []

                    playerTurn ? diceToCheck = allDiceValues : diceToCheck = allCPUDiceValues

                    for (let i = 0; i < diceToCheck.length; i++){
                        if (diceToCheck[i] === diceToCheck[i+1]){
                            pairCount++
                            pairDice.push(diceToCheck[i])
                            pairDice.push(diceToCheck[i + 1])
                        }
                    
                    if (pairCount === 1){
                        let filtered = diceToCheck.filter(value => value !== pairDice[0])
                        playerTurn ? setPlayerRoundPoint(filtered) : setComputerRoundPoint(filtered)
                      //  playerTurn ? setStatus(`Player rolled pair + ${playerRoundPoint}`) : setStatus(`CPU rolled pair + ${computerRoundPoint}`)
                        setPlayerTurn(prev => !prev) 
                    }

        
                   
                    }
                }   
*/
        

    }, [dice])




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
        setWinRoll(false)

      
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