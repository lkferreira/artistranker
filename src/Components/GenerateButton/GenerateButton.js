import React from 'react';
import './GenerateButton.css';

const GenerateButton = ({onButtonClick}) => {
    return (
        <div className='pa4 br3 shadow-5'>
            <button
                className='flex center w-30 f5 grow no-underline br-pill ba bw1 ph3 pv2 mb2 dib bg-green white b--black'
                onClick={onButtonClick}>
                Rank Artists
                </button>
        </div>
    )
}

export default GenerateButton;