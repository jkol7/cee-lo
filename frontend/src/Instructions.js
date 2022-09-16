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
          <p className="instructionHighlight win-underline">Instant Win</p>
          <div className="imageDescription">
            <div className="flex-col">
              <img
                src="456.png"
                loading="lazy"
                alt="Dice with four-five-six"
              ></img>
              <p className="win-type">4-5-6</p>
            </div>
            <div className="flex-col">
              <img
                src="3ofakind.png"
                loading="lazy"
                alt="Dice with three of a kind"
              ></img>
              <p className="win-type">3 of a kind</p>
            </div>
            <div className="flex-col">
              <img src="pair6.png" loading="lazy" alt="Pair with a six"></img>
              <p className="win-type">Pair with 6</p>
            </div>
          </div>
          <p className="instructionHighlight loss-underline">Instant Loss</p>
          <div className="two-col-description">
            <div className="flex-col">
              <img
                src="123.png"
                loading="lazy"
                alt="Dice with one two three"
              ></img>
              <p className="loss-type">1-2-3</p>
            </div>
            <div className="flex-col">
              <img
                src="doublewith1.png"
                loading="lazy"
                alt="Pair dice with one"
              ></img>
              <p className="loss-type">Pair with 1</p>
            </div>
          </div>
          <p className="instructionHighlight neutral-underline">Pairs</p>
          <p> If no instant win/loss, roller with the pair wins.</p>
          <div className="two-col-description">
            <div className="flex-col">
              <img src="pairsaved.png" loading="lazy" alt="Pair winner"></img>
              <p className="win-type">Pair winner</p>
            </div>
            <div className="flex-col">
              <img
                src="uneven.png"
                loading="lazy"
                alt="No pair. Other user has pair."
              ></img>
              <p className="loss-type">No pair loss</p>
            </div>
          </div>
          <p className="instructionHighlight neutral-underline">Set Point</p>
          <p>Both rolls have pairs. Value is the unpaired die.</p>
          <div className="two-col-description">
            <div className="flex-col">
              <img src="pairsaved.png" loading="lazy" alt="Pair winner"></img>
              <p className="loss-type">Lower number (4) loss</p>
            </div>
            <div className="flex-col">
              <img
                src="pairwith5.png"
                loading="lazy"
                alt="No pair. Other user has pair."
              ></img>
              <p className="win-type">Higher number (5) win</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
