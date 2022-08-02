import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import '../src/style.css'

export default function App() {

    
    const [dice, setDice] = React.useState(allNewDice("player"))
    const [computerDice, setComputerDice] = React.useState(allNewDice("cpu"))
    const [status, setStatus] = React.useState("Please roll to start")
    const [playerScore, setPlayerScore] = React.useState(0)
    const [cpuScore, setCPUScore] = React.useState(0)




    React.useEffect(() => {
        
        const allDiceValues = dice.map(element => element.value).sort()
        const allCPUDiceValues = computerDice.map(element => element.value).sort()
        let returnedIsOver = false
        

        // Each turn, this calls functions to determine the different winning/losing logic. 
        // If the turn is over, returnedIsOver = true and we return before checking the next conditon.
      
        returnedIsOver = checkFourFiveSix()

        if (returnedIsOver === true){
            return
        }

        returnedIsOver = checkTriple()
      
        if (returnedIsOver === true){
            return
        }

        returnedIsOver = checkPairWithSix()

        if (returnedIsOver === true){
            return
        }

        returnedIsOver = checkOneTwoThree()

        if (returnedIsOver === true){
            return
        }

        returnedIsOver = checkPairWithOne()

        if (returnedIsOver === true){
            return
        }

        returnedIsOver = compareRoundPoints()

        if (returnedIsOver === true){
            return
        }




        // Check instant win (4,5,6)

        function checkFourFiveSix(){
            if (allDiceValues.includes(4) && allDiceValues.includes(5) && allDiceValues.includes(6) && allCPUDiceValues.includes(4) && allCPUDiceValues.includes(5) && allCPUDiceValues.includes(6)){
                setStatus('Draw. Both rolled 4-5-6.')
                return true
                
                
            }
            else if (allDiceValues.includes(4) && allDiceValues.includes(5) && allDiceValues.includes(6)){
                setStatus('Player wins 4-5-6.')
                setPlayerScore(prev => prev + 1)
                return true
                
            }

            else if (allCPUDiceValues.includes(4) && allCPUDiceValues.includes(5) && allCPUDiceValues.includes(6)){
                setStatus('CPU wins 4-5-6')
                setCPUScore(prev => prev + 1)
                return true
                
            }
                  
            return false
        }

        // Check instant win (Triple)

        function checkTriple(){
            
            if (allDiceValues.every(value => value === allDiceValues[0]) && allCPUDiceValues.every(value => value === allCPUDiceValues[0])){
                setStatus('Both rolled triples. Draw.')
                return true
                
            }
            else if (allDiceValues.every(value => value === allDiceValues[0])){
               setStatus(`Player wins. Rolled triples.`)
               setPlayerScore(prev => prev + 1)
               return true
            }
            else if (allCPUDiceValues.every(value => value === allCPUDiceValues[0])){
                setStatus(`CPU wins. Rolled triples.`)
                setCPUScore(prev => prev + 1)
                return true
            }
            return false
        }


        // Check instant win (Pair with a six)

        function checkPairWithSix(){
            
            if (allDiceValues[2] === 6 && allDiceValues[0] === allDiceValues[1] && allCPUDiceValues[2] === 6 && allCPUDiceValues[0] === allCPUDiceValues[1]){
                setStatus('Both have pair with six draw')
                return true
                
            }
            else if (allDiceValues[2] === 6 && allDiceValues[0] === allDiceValues[1]){
                setStatus('Player has pair with six win.')
                setPlayerScore(prev => prev + 1)       
                return true
            }
            else if(allCPUDiceValues[2] === 6 && allCPUDiceValues[0] === allCPUDiceValues[1]){
                setStatus('CPU has pair with six win')
                setCPUScore(prev => prev + 1)
                return true
            }    
            return false
        }
        
            // Check instant loss - 1, 2, 3

            function checkOneTwoThree(){
                if (allDiceValues.includes(1) && allDiceValues.includes(2) && allDiceValues.includes(3) && allCPUDiceValues.includes(1) && allCPUDiceValues.includes(2) && allCPUDiceValues.includes(3)){
                    setStatus('Both draw with 1-2-3')
                    return true
                    
                }
                else if (allDiceValues.includes(1) && allDiceValues.includes(2) && allDiceValues.includes(3)){
                    setStatus('Player loses from 1-2-3')
                    setCPUScore(prev => prev + 1)
                    return true
              }
                else if (allCPUDiceValues.includes(1) && allCPUDiceValues.includes(2) && allCPUDiceValues.includes(3)){
                    setStatus('CPU loses from 1-2-3')
                    setPlayerScore(prev => prev + 1)
                    return true
            }
                return false
        }

            // Check instant loss - Pair + 1

            
            function checkPairWithOne(){

                if (allDiceValues[0] === 1 && allDiceValues[1] === allDiceValues[2] && allCPUDiceValues[0] === 1 && allCPUDiceValues[1] === allCPUDiceValues[2]){
                    setStatus('Pair with one draw')
                    return true
                    
                }
                else if (allDiceValues[0] === 1 && allDiceValues[1] === allDiceValues[2]){
                   setStatus(`Player loses. Rolled Pair with 1.`) 
                   setCPUScore(prev => prev + 1)    
                    return true
                }
                else if (allCPUDiceValues[0] === 1 && allCPUDiceValues[1] === allCPUDiceValues[2]){
                    setStatus('CPU loses. Rolled pair with 1.')
                    setPlayerScore(prev => prev + 1) 
                    return true
                }
                return false
            }




            // If no instant win or loss, check if there is a pair. If both pairs, compare third die.


            function compareRoundPoints(){

                let playerPairCount = false
                let computerPairCount = false
                let playerRoundPoint = 0
                let computerRoundPoint = 0
                


                // Check if there's a pair for the player. If there is, store the third die as the point.

                if (allDiceValues[0] === allDiceValues[1]){
                        playerPairCount = true
                        playerRoundPoint = allDiceValues[2]
                    }

                if (allDiceValues[1] === allDiceValues[2]){
                    playerPairCount = true
                    playerRoundPoint = allDiceValues[0]
                }

                // Check if there's a pair for the CPU. If there is, store the third die as the point.


                if (allCPUDiceValues[0] === allCPUDiceValues[1]){
                        computerPairCount = true
                        computerRoundPoint = allCPUDiceValues[2]
                    }

                if (allCPUDiceValues[1] === allCPUDiceValues[2]){
                        computerPairCount = true
                        computerRoundPoint = allCPUDiceValues[0]
                    }
                
                
                // Determine who wins based on pair count. If both have pairs, then we check the round point.

                if (!computerPairCount && !playerPairCount){
                        setStatus('No winner. Must re-roll.')
                        return true
                    }
                else if (playerPairCount && !computerPairCount){
                    setStatus(`Player wins with a pair.`)
                    setPlayerScore(prev => prev + 1)
                    console.log(`This is player round point : ${playerRoundPoint}`)
                    return true
                }
                else if (!playerPairCount && computerPairCount){
                    setStatus(`CPU wins with a pair.`)
                    setCPUScore(prev => prev + 1)
                    console.log(`This is CPU round point ${computerRoundPoint}`)
                    return true
                }
                else if (computerPairCount === playerPairCount){
                        if (playerRoundPoint > computerRoundPoint){
                            setStatus(`Both rolled pairs. Player wins with ${playerRoundPoint}.`)
                            setPlayerScore(prev => prev + 1)
                            return true
                        }
                        else if (computerRoundPoint > playerRoundPoint){
                            setStatus(`Both rolled pairs. CPU wins with ${computerRoundPoint}.`)
                            setCPUScore(prev => prev + 1)
                            return true
                }
                    else if (computerRoundPoint === playerRoundPoint){
                        setStatus(`Both rolled the same value. Roll again.`)
                        return true
                    }
              
            }   
        }
       
        
    }, [dice])




    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            id: nanoid()
        }
    }


    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 3; i++) {
            newDice.push(generateNewDie())
            
        }
        return newDice
    }
    
    function rollDice() {
        
        setDice(allNewDice())
        setComputerDice(allNewDice())
        setStatus('No result. Keep rolling!')    
    }



   
    const computerDiceElements = computerDice.map(die => (
        <Die 
            key={die.id} 
            value={die.value}
        />))

    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value}
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