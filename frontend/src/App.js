import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import '../src/style.css'

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [winRoll, setWinRoll] = React.useState(false)

    React.useEffect(() => {
        const rollScore = 0
        const allDiceValues = dice.map(element => element.value)


        if (allDiceValues.includes(4) && allDiceValues.includes(5) && allDiceValues.includes(6) ){
            setWinRoll(true)
        }
/*
        if (allDiceValues has two equal){
            rollScore = third not equal
            Then switch to cpu
        }
        
        */

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
        />
    ))
    
    return (
        <main>
            {winRoll && <Confetti />}
            <h1 className="title">Cee-lo</h1>
            <p className="instructions">Win order: Triple, 4-5-6, Pair plus odd value. Instant lose: 1-2-3.</p>
            <div className="dice-container">
                {diceElements}
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