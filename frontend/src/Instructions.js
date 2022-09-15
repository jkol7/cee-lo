import React from 'react';

export default function Instructions(props) {
  <span className="closeBtn" onClick={props.modalOpenClose}>
    &times;
  </span>;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="closeBtn" onClick={props.modalOpenClose}>
          &times;
        </span>

        <div className="instructionBody">
          <p className="instructionTitle">Game Instructions</p>
          <p>
            The player and the computer(CPU) will roll three die at the same
            time.
          </p>
          <p>Roll the better dice combination. Draws are a re-roll.</p>
          <p className="instructionHighlight">Instant Win</p>
          <div className="imageDescription">
            <div className="flex-col">
              <img src="456.png"></img>
              <p>4-5-6</p>
            </div>
            <div className="flex-col">
              <img src="3ofakind.png"></img>
              <p>3 of a kind</p>
            </div>
            <div className="flex-col">
              <img src="pair6.png"></img>
              <p>Pair with 6</p>
            </div>
          </div>
          <p className="instructionHighlight">Instant Loss</p>
          <div className="instant-loss-description">
            <div className="flex-col">
              <img src="123.png"></img>
              <p>1-2-3</p>
            </div>
            <div className="flex-col">
              <img src="doublewith1.png"></img>
              <p>Pair with 1</p>
            </div>
          </div>
          <p className="instructionHighlight">Pairs</p>
          <p> If no instant win/loss, roller with the pair wins.</p>
          <div className="flex-col">
            <img src="pairsaved.png"></img>
            <p>Pair winner.</p>
          </div>
          <div className="flex-col">
            <img src="uneven.png"></img>
            <p>Loser.</p>
          </div>
        </div>
        <p className="instructionHighlight">Set Point</p>
        <p>Both rolls have pairs. Value is the unpaired die.</p>
      </div>
    </div>
  );
}
