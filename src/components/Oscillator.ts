
interface OscillatorProps {
    audioContext: AudioContext;
    type: OscillatorType;
    frequency: number;
}
const Oscillator = ({ audioContext, type, frequency }: OscillatorProps) => {
    const oscillator = audioContext.createOscillator();
        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime); // value in hertz
        oscillator.connect(audioContext.destination);
        // oscillator.start();
        return oscillator;
}

export default Oscillator;