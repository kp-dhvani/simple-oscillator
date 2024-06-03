interface GainProps {
    audioContext: AudioContext
}

const Gain = ({ audioContext }: GainProps): GainNode => {
    const gain = new GainNode(audioContext, {
        gain: 1
    });
    return gain;
}

export default Gain;