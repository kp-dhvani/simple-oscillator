import React from 'react';
import './App.css';
import Synth from './components/Synth';
import ManageAudioContextState from './components/ManageAudioContextState';

function SimpleSynth() {
  return (
    <div className='Simple-Synth'>
      <p style={{ textAlign: 'center' }}>Simple Synth</p>
      <Synth />
      <ManageAudioContextState />
    </div>
  );
}

export default SimpleSynth;
