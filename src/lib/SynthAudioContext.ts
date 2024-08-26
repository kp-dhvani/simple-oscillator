class SynthAudioContext {
  private static instance?: SynthAudioContext;
  public readonly audioContextInstance: AudioContext;
  public readonly analyserNode: AnalyserNode;

  private constructor() {
    this.audioContextInstance = new (window.AudioContext ||
      window.webkitAudioContext)();
    this.analyserNode = this.audioContextInstance.createAnalyser();
    this.analyserNode.fftSize = 2048;
  }

  public static getInstance(): SynthAudioContext {
    if (!SynthAudioContext.instance) {
      SynthAudioContext.instance = new SynthAudioContext();
    }
    return SynthAudioContext.instance;
  }
}

export type SynthAudioContextType = SynthAudioContext;

export const synthAudioContextInstance = SynthAudioContext.getInstance();
