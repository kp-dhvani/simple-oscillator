class SynthAudioContext {
  private static instance?: SynthAudioContext;
  public readonly audioContextInstance: AudioContext;

  private constructor() {
    this.audioContextInstance = new (window.AudioContext ||
      window.webkitAudioContext)();
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
