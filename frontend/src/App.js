import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import '../src/style.css'

export default function App() {

    
    const [dice, setDice] = React.useState(allNewDice("player"))
    const [rollOver, setRollOver] = React.useState(false)
    const [computerDice, setComputerDice] = React.useState(allNewDice("cpu"))
    const [status, setStatus] = React.useState("Please roll to start")
    const [playerRoundPoint, setPlayerRoundPoint] = React.useState(0)
    const [computerRoundPoint, setComputerRoundPoint] = React.useState(0)
    const [playerScore, setPlayerScore] = React.useState(0)
    const [cpuScore, setCPUScore] = React.useState(0)




    React.useEffect(() => {
        
        const allDiceValues = dice.map(element => element.value).sort()
        const allCPUDiceValues = computerDice.map(element => element.value).sort()
        let returnedIsOver = false
        setPlayerRoundPoint(0)
        setComputerRoundPoint(0)

     

        //Need condition to stop running functions if someone wins or draws.
        
        //Maybe assing a variable. If it is returned true from functions, then don't run the next, and instead return from UseEffect.
      
        returnedIsOver = checkFourFiveSix()
        console.log(returnedIsOver)
        console.log("1" + returnedIsOver)

        !returnedIsOver && checkTriple()
        console.log("2" + returnedIsOver)
        
        !rollOver && checkPairWithSix()
        console.log("3" + rollOver)

        !rollOver && checkOneTwoThree()
        console.log("4" + rollOver)

        !rollOver && checkPairWithOne()
        console.log("5" + rollOver)

   


        // Check instant win (4,5,6)

        function checkFourFiveSix(){
            if (allDiceValues.includes(4) && allDiceValues.includes(5) && allDiceValues.includes(6) && allCPUDiceValues.includes(4) && allCPUDiceValues.includes(5) && allCPUDiceValues.includes(6)){
                setStatus('Draw. Both rolled 4-5-6.')
                setRollOver(true)
                return true
                
                
            }
            else if (allDiceValues.includes(4) && allDiceValues.includes(5) && allDiceValues.includes(6)){
                setStatus('Player wins 4-5-6.')
                setPlayerScore(prev => prev + 1)
                setRollOver(true)
                return true
                
            }

            else if (allCPUDiceValues.includes(4) && allCPUDiceValues.includes(5) && allCPUDiceValues.includes(6)){
                setStatus('CPU wins 4-5-6')
                setCPUScore(prev => prev + 1)
                setRollOver(true)
                return true
                
            }
                  
            return false
        }

        // Check instant win (Triple)

        function checkTriple(){
            
            if (allDiceValues.every(value => value === allDiceValues[0]) && allCPUDiceValues.every(value => value === allCPUDiceValues[0])){
                setStatus('Both rolled triples. Draw.')
                return setRollOver(true)
                
            }
            else if (allDiceValues.every(value => value === allDiceValues[0])){
               setStatus(`Player wins. Rolled triples.`)
               setPlayerScore(prev => prev + 1)
               return setRollOver(true)
            }
            else if (allCPUDiceValues.every(value => value === allCPUDiceValues[0])){
                setStatus(`CPU wins. Rolled triples.`)
                setCPUScore(prev => prev + 1)
                return setRollOver(true)
            }
            return
        }


        // Check instant win (Pair with a six)

        function checkPairWithSix(){
            
            if (allDiceValues[2] === 6 && allDiceValues[0] === allDiceValues[1] && allCPUDiceValues[2] === 6 && allCPUDiceValues[0] === allCPUDiceValues[1]){
                setStatus('Both have pair with six draw')
                return setRollOver(true)
                
            }
            else if (allDiceValues[2] === 6 && allDiceValues[0] === allDiceValues[1]){
                setStatus('Player has pair with six win.')
                setPlayerScore(prev => prev + 1)       
                return setRollOver(true)
            }
            else if(allCPUDiceValues[2] === 6 && allCPUDiceValues[0] === allCPUDiceValues[1]){
                setStatus('CPU has pair with six win')
                setCPUScore(prev => prev + 1)
                return setRollOver(true)
            }    
            return
        }
        
            // Check instant loss - 1, 2, 3

            function checkOneTwoThree(){
                if (allDiceValues.includes(1) && allDiceValues.includes(2) && allDiceValues.includes(3) && allCPUDiceValues.includes(1) && allCPUDiceValues.includes(2) && allCPUDiceValues.includes(3)){
                    setStatus('Both draw with 1-2-3')
                    return setRollOver(true)
                    
                }
                else if (allDiceValues.includes(1) && allDiceValues.includes(2) && allDiceValues.includes(3)){
                  setStatus('Player loses from 1-2-3')
                  setCPUScore(prev => prev + 1)
                  return setRollOver(true)
              }
              else if (allCPUDiceValues.includes(1) && allCPUDiceValues.includes(2) && allCPUDiceValues.includes(3)){
                setStatus('CPU loses from 1-2-3')
                setPlayerScore(prev => prev + 1)
                return setRollOver(true)
            }
                return
        }

            // Check instant loss - Pair + 1

            
            function checkPairWithOne(){

                if (allDiceValues[0] === 1 && allDiceValues[1] === allDiceValues[2] && allCPUDiceValues[0] === 1 && allCPUDiceValues[1] === allCPUDiceValues[2]){
                    setStatus('Pair with one draw')
                    return setRollOver(true)
                    
                }
                else if (allDiceValues[0] === 1 && allDiceValues[1] === allDiceValues[2]){
                   setStatus(`Player loses. Rolled Pair with 1.`) 
                   setCPUScore(prev => prev + 1)  
                   return setRollOver(true)   
                }
                else if (allCPUDiceValues[0] === 1 && allCPUDiceValues[1] === allCPUDiceValues[2]){
                    setStatus('CPU loses. Rolled pair with 1.')
                    setPlayerScore(prev => prev + 1) 
                    return setRollOver(true)
                }
                return
            }

/*
            function compareRoundPoints(){

                let playerPairCount = false
                let computerPairCount = false
                

                //Pair dice not necessary now because filter not needed.

                if (allDiceValues[0] === allDiceValues[1]){
                        playerPairCount = true
                        setPlayerRoundPoint(prevValue => prevValue = allDiceValues[2])
                        console.log(`This is the value: ${allDiceValues[2]}`)

                    }
                if (allDiceValues[1] === allDiceValues[2]){
                    playerPairCount = true
                    setPlayerRoundPoint(prevValue => prevValue = allDiceValues[0])
                    console.log(`This is the value: ${allDiceValues[0]}`)

                }
                if (allCPUDiceValues[0] === allCPUDiceValues[1]){
                        computerPairCount = true
                        setComputerRoundPoint(prevValue => prevValue = allCPUDiceValues[2])
                        console.log(`This is the value: ${allCPUDiceValues[2]}`)
                    }
                if (allCPUDiceValues[1] === allCPUDiceValues[2]){
                        computerPairCount = true
                        setComputerRoundPoint(prevValue => prevValue = allCPUDiceValues[0])
                        console.log(`This is the value: ${allCPUDiceValues[0]}`)
                    }
                

                if (!computerPairCount && !playerPairCount){
                        setStatus('No winner. Must re-roll.')
                        return
                    }
                else if (playerPairCount && !computerPairCount){
                    setWinRoll(true)
                    setStatus(`Player wins with a pair.`)
                    setPlayerScore(prev => prev + 1)
                    console.log(`This is player round point : ${playerRoundPoint}`)
                    return
                }
                else if (!playerPairCount && computerPairCount){
                    setWinRoll(true)
                    setStatus(`CPU wins with a pair.`)
                    setCPUScore(prev => prev + 1)
                    console.log(`This is CPU round point ${computerRoundPoint}`)
                    return
                }
                else if (computerPairCount === playerPairCount){
                        if (playerRoundPoint > computerRoundPoint){
                            setWinRoll(true)
                            setStatus(`Player wins with ${playerRoundPoint}.`)
                            setPlayerScore(prev => prev + 1)
                            return
                        }
                        else if (computerRoundPoint > playerRoundPoint){
                            setWinRoll(true)
                            setStatus(`CPU wins with ${computerRoundPoint}.`)
                            setCPUScore(prev => prev + 1)
                            return
                }
                    else if (computerRoundPoint === playerRoundPoint){
                        setStatus(`Both rolled the same value. Roll again`)
                        return
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
        setRollOver(false)
        setStatus('No result. Keep rolling!')

      
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