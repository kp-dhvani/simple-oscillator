import React, { useEffect, useRef, useState } from 'react';
import {
  DraggableEvent,
  DraggableData,
  DraggableEventHandler,
} from 'react-draggable';
import Draggable from './Draggable';
import SynthAudioContext from '../lib/SynthAudioContext';
import generateSineWaveSample from '../lib/generateSample';
const minX = -250;
const maxX = 230;
const minY = -250;
const maxY = 220;

const AudioContext = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [oscillator, setOscillator] = useState<OscillatorNode | null>();
  const [gainNode, setGainNode] = useState<GainNode | null>();
  const { audioContextInstance } = SynthAudioContext();
  const [frequency, setFrequency] = useState(440);

  const onDragStart: DraggableEventHandler = () => {
    setIsPlaying(true);
    const oscillator = audioContextInstance.createOscillator();
    const newGainNode = audioContextInstance.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(
      frequency,
      audioContextInstance.currentTime,
    );
    newGainNode.connect(audioContextInstance.destination);
    oscillator.connect(newGainNode);
    oscillator.start();
    setOscillator(oscillator);
    setGainNode(newGainNode);
  };

  const onDragStop: DraggableEventHandler = () => {
    if (oscillator && gainNode) {
      gainNode.gain.setValueAtTime(
        gainNode.gain.value,
        audioContextInstance.currentTime,
      );

      gainNode.gain.exponentialRampToValueAtTime(
        0.0001,
        audioContextInstance.currentTime + 0.03,
      );
      setIsPlaying(false);
      gainNode.disconnect(audioContextInstance.destination);
      oscillator.stop();
      oscillator.disconnect();
      setOscillator(null);
      setGainNode(null);
    }
  };

  const handleDrag = (_: DraggableEvent, data: DraggableData) => {
    // Calculate the amplitude based on the vertical position
    if (gainNode && oscillator) {
      const amplitude = 1 - (2 * (data.y - minY)) / (maxY - minY);
      gainNode.gain.setValueAtTime(amplitude, audioContextInstance.currentTime);
    }
  };

  return (
    <>
      <div className='audio'>
        <div className='drag'>
          <Draggable
            isPlaying={isPlaying}
            onDragStart={onDragStart}
            onDragStop={onDragStop}
            handleDrag={handleDrag}
          />
        </div>
      </div>
    </>
  );
};

export default AudioContext;
