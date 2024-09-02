import React from 'react';
import './App.css';
import Oscillator from './components/Oscillator';
import ManageAudioContextState from './components/ManageAudioContextState';

function SimpleOscillator() {
  return (
    <div className='simple-oscillator'>
      <p style={{ textAlign: 'center' }}>Simple Oscillator</p>
      <Oscillator />
      <ManageAudioContextState />
    </div>
  );
}

export default SimpleOscillator;
