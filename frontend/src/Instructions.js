import React from 'react'

export default function Instructions(props){

<span className="closeBtn" onClick={props.modalOpenClose}>&times;</span>


return(
    <div className="modal">
    <div className="modal-content">
        <span className="closeBtn" onClick={props.modalOpenClose}>&times;</span>
   
    <div className='instructionBody'>
    <p className='instructionTitle'>Game Instructions</p>
    <p>The player and the computer(CPU) will roll three die at the same time.</p>
    <p>Roll the better dice combination. Draws are a re-roll.</p>
    <p className='instructionHighlight'>Instant Win</p><p>4-5-6, 3-of-a-kind, Pair + 6</p>
    <p className='instructionHighlight'>Instant Loss</p><p> 1-2-3, Pair + 1</p>
    <p className='instructionHighlight'>Pairs</p><p> If no instant win/loss, roller with the pair wins.</p>
    <p className='instructionHighlight'>Set Point</p><p>Both rolls have pairs. Value is the unpaired die.</p>
    </div> 
    </div>
    </div>
)
}