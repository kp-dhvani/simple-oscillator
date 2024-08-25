import React, { useEffect, useState } from 'react';
import {
  DraggableEvent,
  DraggableData,
  DraggableEventHandler,
} from 'react-draggable';
import { CSSTransition } from 'react-transition-group';
import Draggable from './Draggable';
import Visualiser from './Visualiser';
import { useSynthAudioContext } from './SynthAudioContextProvider';
import WaveTypeSelector from './TypeSelector';
import InteractiveShape, { Shapes } from './InteractiveShape';
import NonInteractiveShape from './NonInteractiveShape';
import './Synth.css';

const Synth = () => {
  const [isDragPlaying, setIDragPlaying] = useState(false);
  const [isShapeOscillatorPlaying, setIsShapeOscillatorPlaying] =
    useState(false);
  const [oscillator, setOscillator] = useState<OscillatorNode | null>();
  const [shapeOscillator, setShapeOscillator] = useState<OscillatorNode | null>(
    null,
  );
  const [gainNode, setGainNode] = useState<GainNode | null>();
  const { audioContextInstance } = useSynthAudioContext();
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode | null>(null);
  const [frequency, setFrequency] = useState(440);
  const [amplitude, setAmplitude] = useState(0);
  const [waveType, setWaveType] = useState<OscillatorType>(Shapes.Sine);
  const [isShapeLocked, setIsShapeLocked] = useState(false);
  const [shapeDimensionChangeDelta, setShapeDimensionChangeDelta] = useState(0);
  const [showNonInteractiveShape, setShowNonInteractiveShape] = useState(false);

  useEffect(() => {
    const analyser = audioContextInstance.createAnalyser();
    analyser.fftSize = 2048;
    setAnalyserNode(analyser);
    return () => {
      setShapeOscillator(null);
      setAnalyserNode(null);
    };
  }, []);

  useEffect(() => {
    if (isShapeLocked) {
      changeSound();
    }
  }, [shapeDimensionChangeDelta]);

  useEffect(() => {
    if (isShapeLocked) {
      startOscillator();
    } else {
      stopOscillator();
    }
  }, [isShapeLocked]);

  const changeSound = () => {
    if (shapeOscillator) {
      const minFreq = 20;
      const maxFreq = 20000;

      const newFreq = frequency + shapeDimensionChangeDelta;

      const clampedFreq = Math.max(minFreq, Math.min(maxFreq, newFreq));
      shapeOscillator.frequency.exponentialRampToValueAtTime(
        clampedFreq,
        audioContextInstance.currentTime + 0.1,
      );
      setFrequency(clampedFreq);
    }
  };

  const startOscillator = () => {
    const osc = audioContextInstance.createOscillator();
    osc.type = waveType;
    osc.connect(analyserNode!);
    analyserNode?.connect(audioContextInstance.destination);
    osc.frequency.exponentialRampToValueAtTime(
      frequency,
      audioContextInstance.currentTime + 0.1,
    );
    // Create a looping envelope for the gain
    osc.connect(audioContextInstance.destination);
    osc.start();
    setIsShapeOscillatorPlaying(true);
    setShapeOscillator(osc);
  };

  const stopOscillator = () => {
    if (shapeOscillator) {
      if (isShapeOscillatorPlaying) {
        shapeOscillator.stop();
        shapeOscillator.disconnect();
        setIsShapeOscillatorPlaying(false);
        setShapeOscillator(null);
        setFrequency(440);
      }
    }
  };

  const onDragStart: DraggableEventHandler = () => {
    setIDragPlaying(true);
    const oscillator = audioContextInstance.createOscillator();
    const newGainNode = audioContextInstance.createGain();
    oscillator.type = waveType;
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
      setIDragPlaying(false);
      gainNode.disconnect(analyserNode!);
      analyserNode?.disconnect(audioContextInstance.destination);
      oscillator.stop();
      oscillator.disconnect();
      setOscillator(null);
      setGainNode(null);
    }
  };

  const handleDrag = (_: DraggableEvent, data: DraggableData) => {
    const minY = -250;
    const maxY = 220;
    if (gainNode && oscillator) {
      let amp = (2 * (maxY - data.y)) / (maxY - minY) - 1;

      if (amp === 0) {
        amp = amp > 0 ? 0.0001 : -0.0001;
      }
      const clampedAmp = Math.max(-0.9999, Math.min(0.9999, amp));
      gainNode.gain.exponentialRampToValueAtTime(
        clampedAmp,
        audioContextInstance.currentTime,
      );
      const freq = Math.max(frequency + data.deltaX, 0);
      oscillator.frequency.exponentialRampToValueAtTime(
        freq,
        audioContextInstance.currentTime + 0.1,
      );
      setAmplitude(amp);
      setFrequency(freq);
    }
  };

  const handleNonInteractiveShapeClick = () => {
    setShowNonInteractiveShape((prev) => !prev);
  };
  return (
    <div className='synth'>
      <CSSTransition
        in={!showNonInteractiveShape}
        timeout={300}
        classNames='fade'
        unmountOnExit
      >
        <div className='drag'>
          <Draggable
            isPlaying={isDragPlaying}
            onDragStart={onDragStart}
            onDragStop={onDragStop}
            handleDrag={handleDrag}
            onNoninteractiveShapeClick={handleNonInteractiveShapeClick}
          />
        </div>
      </CSSTransition>
      <CSSTransition
        in={showNonInteractiveShape}
        timeout={300}
        classNames='fade'
        unmountOnExit
      >
        <>
          <div className='canvas-shape'>
            <InteractiveShape
              waveType={waveType}
              isLocked={isShapeLocked}
              lockShape={setIsShapeLocked}
              setShapeDimensionChangeDelta={setShapeDimensionChangeDelta}
            />
          </div>
          <div>
            <button
              className='reset-shape'
              onClick={handleNonInteractiveShapeClick}
            >
              show drag synth
            </button>
          </div>
        </>
      </CSSTransition>
      <div className='visualiser' style={{ marginTop: '2rem', zIndex: -1 }}>
        <Visualiser
          analyser={analyserNode}
          isPlaying={isShapeOscillatorPlaying || isDragPlaying}
        />
        <p>Frequency: {frequency}</p>
      </div>
      <div className='controls'>
        <WaveTypeSelector waveType={waveType} onTypeSelect={setWaveType} />
      </div>
    </div>
  );
};

export default Synth;
