interface PeriodicWaveComponentProps {
  audioContext: AudioContext;
  real: Float32Array;
  imag: Float32Array;
}

const PeriodicWaveComponent = ({
  audioContext,
  real,
  imag,
}: PeriodicWaveComponentProps): PeriodicWave => {
  const wave = new PeriodicWave(audioContext, {
    real,
    imag,
  });

  return wave;
};

export default PeriodicWaveComponent;
