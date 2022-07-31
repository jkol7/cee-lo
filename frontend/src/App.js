import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import '../src/style.css'

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [winRoll, setWinRoll] = React.useState(false)
    const [currentTurn, setCurrentTurn] = React.useState('player')
    const [computerDice, setComputerDice] = React.useState()
    const [status, setStatus] = React.useState(`It is the ${currentTurn}'s turn`)

    React.useEffect(() => {
        const playerScore = 0
        const cpuScore = 0
        console.log(dice)
        if (currentTurn === 'player'){
            const allDiceValues = dice.map(element => element.value)
            if (allDiceValues.includes(4) && allDiceValues.includes(5) && allDiceValues.includes(6) ){
                setWinRoll(true)
                setCurrentTurn('cpu')
            }
        }

        if (currentTurn === 'cpu'){
            document.querySelector(".roll-dice").setAttribute("disabled", true)
            console.log('should disable')
        }

    }, [dice])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            id: nanoid(),
            heldBy: 'cpu'
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
        if(!winRoll) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
        } else {
            setWinRoll(false)
            setDice(allNewDice())
        }
    }


   
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value}  
            heldBy={die.heldBy}
        />
    ))






    
    return (
        <main>
            {winRoll && <Confetti />}
            <h1 className="title">Cee-lo</h1>
            <p className="instructions">Win order: Triple, 4-5-6, Pair plus odd value. Instant lose: 1-2-3.</p>
            <h3>{status}</h3>
            
            
            <div className='cpu-display-container'>
                <h3>Computer Roll</h3>
                <div className="cpu-dice-container">
                {diceElements}
                </div>
                </div>
            
            <div className='user-display-container'>
                <h3>User Roll</h3>
                <div className="user-dice-container">
                {diceElements}
                </div>
                </div>

                <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {winRoll ? "New Game" : "Roll"}
            </button>
            
        </main>
    )
}