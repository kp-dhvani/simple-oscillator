import React, { useEffect, useState } from "react";
import loadWasm from "../lib/loadWasm";
import Oscillator from "./Oscillator";
import PeriodicWaveComponent from "./PeriodicWave";
import { DraggableEvent, DraggableData, DraggableEventHandler } from 'react-draggable';
import Draggable from './Draggable';
import SynthAudioContext from "../lib/SynthAudioContext";


const AudioContext = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [sineWaveWasm, setSineWaveWasm] = useState<WebAssembly.Module>();
    const [oscillator, setOscillator] = useState<OscillatorNode>()
    const { audioContextInstance } = SynthAudioContext();
    const [frequency, setFrequency] = useState(440);
    const [amplitude, setAmplitude] = useState(1);
    const [duration, setDuration] = useState(2);

    const sampleRate = 44100; // Hz
    const numSamples = duration * sampleRate;

    const onDragStart: DraggableEventHandler = (event: DraggableEvent) => {
        console.log('onDragStart', event);
    }

    const onDragStop: DraggableEventHandler = (event: DraggableEvent) => {
        console.log('onDragStop', event);
    }

    const handleDrag = (_: DraggableEvent, data: DraggableData) => {
        console.log({ x: data.x, y: data.y })
    }

    useEffect(() => {
        const loadAddWasm = async () => {
            const addWasm = await loadWasm('sinewave.wasm');
            setSineWaveWasm(addWasm);
        }
        loadAddWasm();
    }, []);

    useEffect(() => {
        if (isPlaying && sineWaveWasm) {
            // @ts-ignore
            const samplesPtr = sineWaveWasm?.instance.exports.malloc(numSamples * Float32Array.BYTES_PER_ELEMENT)
            // @ts-ignore
            const samples = new Float32Array(sineWaveWasm?.instance.exports.memory.buffer, samplesPtr, numSamples);
            // @ts-ignore
            sineWaveWasm?.instance.exports.generateSineWave(frequency, amplitude, duration, sampleRate, samplesPtr);
            const osc = Oscillator({ audioContext: audioContextInstance, type: 'sine', frequency });
            const real = samples.slice(0, 2);
            const imag = new Float32Array(real.length).fill(0);
            const periodicWave = PeriodicWaveComponent({ audioContext: audioContextInstance, real, imag });
            osc.setPeriodicWave(periodicWave);
            osc.connect(audioContextInstance.destination);
            osc.start();
            setOscillator(osc);
        } else {
            oscillator?.stop();
            oscillator?.disconnect(audioContextInstance.destination);
        }
    }, [isPlaying])

    return (
        <>
        <div className="audio" >
            <div className="drag">
                <Draggable onDragStart={onDragStart} onDragStop={onDragStop} handleDrag={handleDrag}/>
            </div>
            {/* <div className="audio-button">
            <button onClick={() => setIsPlaying(isPlaying => !isPlaying)}>
                {
                    isPlaying ? 'Stop' : 'Play'
                }
            </button>
            </div> */}
        </div>
        </>
    );
};

export default AudioContext;
