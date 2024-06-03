import React from 'react';

/**
 * 
 * An AudioBuffer is defined with three parameters:
 * the number of channels (1 for mono, 2 for stereo, etc.),
 * its length, meaning the number of sample frames inside the buffer,
 * and the sample rate, the number of sample frames played per second.
 * A sample is a single 32-bit floating point value representing the value
 * of the audio stream at each specific moment in time within a particular
 * channel (left or right, if in the case of stereo).
 * A frame, or sample frame, is the set of all values for all channels
 * that will play at a specific moment in time: all the samples of all
 * the channels that play at the same time (two for a stereo sound, six for 5.1, etc.).
 * The sample rate is the quantity of those samples
 * (or frames, since all samples of a frame play at the same time)
 * that will play in one second, measured in Hz.
 * The higher the sample rate, the better the sound quality.
 */
interface AudioBufferProps {
    length: number;
    sampleRate: number;
    numberOfChannels: number
}

const AudioBuffer: React.FC<AudioBufferProps> = ({
    length,
    sampleRate,
    numberOfChannels = 1
}) => {
    return (
        <p>Audio Buffer</p>
    )
}

export default AudioBuffer;