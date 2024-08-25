import React from 'react';
import './App.css';
import Synth from './components/Synth';

function SimpleSynth() {
  return (
    <div className='Simple-Synth'>
      <p style={{ textAlign: 'center' }}>Simple Synth</p>
      <Synth />
    </div>
  );
}

export default SimpleSynth;
