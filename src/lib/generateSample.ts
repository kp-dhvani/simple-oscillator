function generateSineWaveSample(
  sampleRate: number,
  frequency: number,
  amplitude: number,
): Float32Array {
  const numSamples = Math.round(sampleRate * 1);
  const samples = new Float32Array(numSamples);

  const angularFrequency = (2 * Math.PI * frequency) / sampleRate;
  for (let i = 0; i < numSamples; i++) {
    samples[i] = amplitude * Math.sin(angularFrequency * i);
  }

  return samples;
}
export default generateSineWaveSample;
