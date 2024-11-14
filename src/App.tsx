import React from 'react';
import './App.css';
import Oscillator from './components/Oscillator';
import ManageAudioContextState from './components/ManageAudioContextState';

function SimpleOscillator() {
  return (
    <div className='simple-oscillator'>
      <Oscillator />
      <ManageAudioContextState />
    </div>
  );
}

export default SimpleOscillator;
