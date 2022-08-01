import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import '../src/style.css'

export default function App() {

    
    const [playerTurn, setPlayerTurn] = React.useState(false)
    const [dice, setDice] = React.useState(allNewDice("player"))
    const [winRoll, setWinRoll] = React.useState(false)
    const [computerDice, setComputerDice] = React.useState(allNewDice("cpu"))
    const [status, setStatus] = React.useState("Please roll to start")
    const [playerRoundPoint, setPlayerRoundPoint] = React.useState(0)
    const [computerRoundPoint, setComputerRoundPoint] = React.useState(0)
    const [playerScore, setPlayerScore] = React.useState(0)
    const [cpuScore, setCPUScore] = React.useState(0)
    const [playerRollWin, setPlayerRollWin] = React.useState(false)
    const [cpuRollWin, setCPURollWin] = React.useState(false)



    React.useEffect(() => {
        let diceToCheck
        const allDiceValues = dice.map(element => element.value).sort()
        const allCPUDiceValues = computerDice.map(element => element.value).sort()
        setPlayerRoundPoint(0)
        setComputerRoundPoint(0)

     
        
        //Need to be able to check these for both the computer and player. Check if first win. Then check if there is a draw in any scenario, re-roll.
        //Need conditions to stop checking if any come back "true". Example: Rolled trips 1 but lost because it is dobule and 1.
        
        checkFourFiveSix(true)
        checkFourFiveSix(false)

        if (playerRollWin === true && cpuRollWin === true){
            console.log("draw")
            setPlayerRollWin(prev => !prev)
            setCPURollWin(prev => !prev)
            return
        }
        else if (playerRollWin === true){
            console.log("player wins 456")
            setPlayerRollWin(prev => !prev)
            return
        }
        else if (cpuRollWin === true) {
            console.log("cpu wins 456")
            setCPURollWin(prev => !prev)
            return
        }


        checkTriple(true)
        checkTriple(false)


        if (playerRollWin === true && cpuRollWin === true){
            console.log("draw")
            setPlayerRollWin(prev => !prev)
            setCPURollWin(prev => !prev)
            return
        }
        else if (playerRollWin === true){
            console.log("player wins triple")
            setPlayerRollWin(prev => !prev)
            return
        }
        else if (cpuRollWin === true){
            console.log("cpu wins triple")
            setCPURollWin(prev => !prev)
            return
        }
        checkPairWithSix(true)
        checkPairWithSix(false)


        if (playerRollWin === true && cpuRollWin === true){
            console.log("draw")
            return
        }
        else if (playerRollWin === true){
            console.log("player wins pair with 6")
            return
        }
        else if (cpuRollWin === true){
            console.log("cpu wins pair with 6")
            return
        }

   


        // Check instant win (4,5,6)

        function checkFourFiveSix(isPlayer){
            isPlayer ? diceToCheck = allDiceValues : diceToCheck = allCPUDiceValues
            if (diceToCheck.includes(4) && diceToCheck.includes(5) && diceToCheck.includes(6)){
              //  isPlayer? setStatus(`Player wins. Rolled 4, 5, 6.`) : setStatus(`CPU wins. Rolled 4, 5, 6. Player turn.`)
                isPlayer ? setPlayerRollWin(prev => prev = true) : setCPURollWin(prev => prev = true)
                //isPlayer ? setPlayerScore(prev => prev + 1) : setCPUScore(prev => prev + 1)
            }
            return 
        }

        // Check instant win (Triple)

        function checkTriple(isPlayer){
            isPlayer ? diceToCheck = allDiceValues : diceToCheck = allCPUDiceValues
            if (diceToCheck.every(value => value === diceToCheck[0])){
               // isPlayer? setStatus(`Player wins. Rolled triples.`) : setStatus(`CPU wins. Rolled triples.`)
               isPlayer ? setPlayerRollWin(prev => prev = true) : setCPURollWin(prev => prev = true)
               // isPlayer ? setPlayerScore(prev => prev + 1) : setCPUScore(prev => prev + 1)
            }
            return
        }

        // Check instant win (Pair with a six)

        function checkPairWithSix(isPlayer){
            isPlayer ? diceToCheck = allDiceValues : diceToCheck = allCPUDiceValues
            if(diceToCheck.includes(6)){
                diceToCheck.sort()
            }

            if (diceToCheck[2] === 6 && diceToCheck[0] === diceToCheck[1]){
                //isPlayer? setStatus(`Player wins. Pair with 6.`) : setStatus(`CPU wins. Pair with 6.`)
                //isPlayer ? setPlayerScore(prev => prev + 1) : setCPUScore(prev => prev + 1)
                isPlayer ? setPlayerRollWin(prev => prev = true) : setCPURollWin(prev => prev = true)
            }
            return
        }
        
            // Check instant loss - 1, 2, 3

            function checkOneTwoThree(isPlayer){
                isPlayer ? diceToCheck = allDiceValues : diceToCheck = allCPUDiceValues
                if (diceToCheck.includes(1) && diceToCheck.includes(2) && diceToCheck.includes(3)){
                   // isPlayer? setStatus(`Player loses. Rolled 1, 2, 3.`) : setStatus(`CPU loses. Rolled 1, 2, 3.`)
                  //  isPlayer ? setCPUScore(prev => prev + 1) : setPlayerScore(prev => prev + 1)
                  //isPlayer ? setPlayerRollWin(false) : setCPURollWin(true)

            }
            return
        }

            // Check instant loss - Pair + 1

            function checkPairWithOne(isPlayer){
                isPlayer ? diceToCheck = allDiceValues : diceToCheck = allCPUDiceValues

                if (diceToCheck.includes(1)){
                diceToCheck.sort()
                }

                if (diceToCheck[0] === 1 && diceToCheck[1] === diceToCheck[2]){
                   // setWinRoll(true)
                    //isPlayer? setStatus(`Player loses. Rolled Pair with 1.`) : setStatus(`CPU loses. Rolled Pair with 1.`)
                   // isPlayer ? setCPUScore(prev => prev + 1) : setPlayerScore(prev => prev + 1)   
        
                }
                return
            }


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
        
        }
    }, [winRoll, dice])




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