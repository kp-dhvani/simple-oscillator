### Example: If you have 10000 frames and the sample rate is 44100 Hz:
Time in seconds = Number of frames / Sample rate
                = 10000 frames / 44100 samples per second
                ≈ 0.2268 seconds
### Example: If you have 10000 samples and the audio is stereo (2 channels):
   Number of frames = Number of samples / Channel count
                  = 10000 samples / 2 channels
                  = 5000 frames

Aliasing: Aliasing occurs when frequencies above the Nyquist frequency (half the sampling rate) fold back into the audible frequency range, causing distortion in the reconstructed audio signal. To avoid aliasing, frequencies above the Nyquist frequency must be attenuated or removed before sampling.

Low-pass Filtering: A low-pass filter is used to attenuate frequencies above the Nyquist frequency while allowing frequencies below the Nyquist frequency to pass through unchanged. In an ideal scenario, the low-pass filter would have a sharp cutoff at the Nyquist frequency, allowing only frequencies below it to pass. However, in practice, achieving an ideal low-pass filter is challenging, and there will always be a transition band where frequencies are partly attenuated.

Transition Band: The transition band is the frequency range between the passband (where frequencies are mostly unaffected) and the stopband (where frequencies are significantly attenuated). In this transition band, frequencies are gradually attenuated, reducing the likelihood of aliasing. The width of the transition band depends on various factors, including the characteristics of the filter and the specific requirements of the audio application.

Sampling Theorem: The Nyquist-Shannon sampling theorem states that to accurately represent an analog signal in digital form, the sampling rate must be at least twice the highest frequency present in the signal. By applying a low-pass filter to remove frequencies above the Nyquist frequency before sampling, we ensure that the sampled signal does not contain aliased frequencies.

 In digital audio, 44,100 Hz (alternately represented as 44.1 kHz) is a common sampling frequency. Why 44.1 kHz?

Firstly, because the hearing range of human ears is roughly 20 Hz to 20,000 Hz. Via the Nyquist–Shannon sampling theorem, the sampling frequency must be greater than twice the maximum frequency one wishes to reproduce. Therefore, the sampling rate has to be greater than 40,000 Hz.

Secondly, signals must be low-pass filtered before sampling, otherwise aliasing occurs. While an ideal low-pass filter would perfectly pass frequencies below 20 kHz (without attenuating them) and perfectly cut off frequencies above 20 kHz, in practice, a transition band is necessary, where frequencies are partly attenuated. The wider this transition band is, the easier and more economical it is to make an anti-aliasing filter. The 44.1 kHz sampling frequency allows for a 2.05 kHz transition band.

If you use this call above, you will get a stereo buffer with two channels that, when played back on an AudioContext running at 44100 Hz (very common, most normal sound cards run at this rate), will last for 0.5 seconds: 22,050 frames/44,100 Hz = 0.5 seconds.

```JS
const context = new AudioContext();
const buffer = new AudioBuffer(context, {
  numberOfChannels: 1,
  length: 22050,
  sampleRate: 22050,
});
```