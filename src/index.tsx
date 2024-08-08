import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SimpleSynth from './App';
import { SynthAudioContextProvider } from './components/SynthAudioContextProvider';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <SynthAudioContextProvider>
        <SimpleSynth />
      </SynthAudioContextProvider>
    </React.StrictMode>,
  );
}
