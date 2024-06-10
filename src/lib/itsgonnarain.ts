// import SynthAudioContext from './SynthAudioContext';

// export default async function loadSample() {
//   const { audioContextInstance } = SynthAudioContext();
//   function startLoop(audioBUffer: AudioBuffer, pan = 0, rate = 1) {
//     const sourceNode = audioContextInstance.createBufferSource();
//     const pannerNode = audioContextInstance.createStereoPanner();
//     sourceNode.buffer = audioBUffer;
//     sourceNode.loop = true;
//     sourceNode.loopStart = 2.98;
//     sourceNode.loopEnd = 3.8;
//     sourceNode.playbackRate.value = rate;
//     pannerNode.pan.value = pan;
//     sourceNode.connect(pannerNode);
//     pannerNode.connect(audioContextInstance.destination);
//     sourceNode.start(0, 2.98);
//   }

//   const audioElement = document.createElement('audio');
//   audioElement.src = '/itsgonnarain.mp3';
//   audioElement.controls = true;
//   document.body.appendChild(audioElement);

//   const loadAudioAsBuffer = async (): Promise<ArrayBuffer> => {
//     return new Promise((resolve, reject) => {
//       const xhr = new XMLHttpRequest();
//       xhr.open('GET', audioElement.src, true);
//       xhr.responseType = 'arraybuffer';
//       xhr.onload = () => {
//         if (xhr.status === 200) {
//           resolve(xhr.response);
//         } else {
//           reject(new Error('Failed to load audio file.'));
//         }
//       };
//       xhr.onerror = () => reject(new Error('XHR Error'));
//       xhr.send();
//     });
//   };

//   // Decode the ArrayBuffer to an AudioBuffer
//   const decodeAudioData = async (
//     arrayBuffer: ArrayBuffer,
//   ): Promise<AudioBuffer> => {
//     return new Promise((resolve, reject) => {
//       audioContextInstance.decodeAudioData(
//         arrayBuffer,
//         (buffer) => {
//           resolve(buffer);
//         },
//         (error) => {
//           reject(new Error(`Error decoding audio data: ${error.message}`));
//         },
//       );
//     });
//   };
//   try {
//     const arrayBuffer = await loadAudioAsBuffer();
//     const audioBuffer = await decodeAudioData(arrayBuffer);
//     // startLoop(audioBuffer, -1, 1);
//     // startLoop(audioBuffer, -1, 1.002);
//   } catch (error) {
//     console.error(error);
//   }
// }
