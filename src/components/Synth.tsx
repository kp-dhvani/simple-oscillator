import React, { useEffect, useState } from 'react';
import {
  DraggableEvent,
  DraggableData,
  DraggableEventHandler,
} from 'react-draggable';
import Draggable from './Draggable';
import Visualiser from './Visualiser';
import { useSynthAudioContext } from './SynthAudioContextProvider';

const minY = -250;
const maxY = 220;

const Synth = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [oscillator, setOscillator] = useState<OscillatorNode | null>();
  const [gainNode, setGainNode] = useState<GainNode | null>();
  const { audioContextInstance } = useSynthAudioContext();
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode>();
  const [frequency, setFrequency] = useState(440);
  const [amplitude, setAmplitude] = useState(0);

  useEffect(() => {
    const analyser = audioContextInstance.createAnalyser();
    analyser.fftSize = 2048;
    setAnalyserNode(analyser);
  }, []);

  const onDragStart: DraggableEventHandler = () => {
    setIsPlaying(true);
    const oscillator = audioContextInstance.createOscillator();
    const newGainNode = audioContextInstance.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(
      frequency,
      audioContextInstance.currentTime,
    );
    newGainNode.connect(analyserNode!);
    analyserNode!.connect(audioContextInstance.destination);
    oscillator.connect(newGainNode);
    oscillator.start();
    newGainNode.gain.setValueAtTime(
      amplitude,
      audioContextInstance.currentTime,
    );
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
      gainNode.disconnect(analyserNode!);
      analyserNode?.disconnect(audioContextInstance.destination);
      oscillator.stop();
      oscillator.disconnect();
      setOscillator(null);
      setGainNode(null);
    }
  };

  const handleDrag = (_: DraggableEvent, data: DraggableData) => {
    if (gainNode && oscillator) {
      let amp = (2 * (data.y - minY)) / (maxY - minY) - 1;

      if (amp === 0) {
        amp = amp > 0 ? 0.0001 : -0.0001;
      }
      const clampedAmp = Math.max(-0.9999, Math.min(0.9999, amp));
      gainNode.gain.exponentialRampToValueAtTime(
        clampedAmp,
        audioContextInstance.currentTime,
      );
      const freq = frequency + data.deltaX;
      oscillator.frequency.exponentialRampToValueAtTime(
        freq,
        audioContextInstance.currentTime + 0.1,
      );
      setAmplitude(amp);
      setFrequency(freq);
    }
  };

  return (
    <div
      className='synth'
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className='audio' style={{ marginBottom: '8rem' }}>
        <div className='drag'>
          <Draggable
            isPlaying={isPlaying}
            onDragStart={onDragStart}
            onDragStop={onDragStop}
            handleDrag={handleDrag}
          />
        </div>
      </div>
      <div className='visualiser'>
        <Visualiser analyser={analyserNode} isPlaying={isPlaying} />
      </div>
    </div>
  );
};

export default Synth;
