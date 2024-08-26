import React, { useEffect } from 'react';
import { useSynthAudioContext } from './SynthAudioContextProvider';

const ManageAudioContextState: React.FC = () => {
  const synthAudioContext = useSynthAudioContext();

  useEffect(() => {
    const attemptResumeAudioContext = async () => {
      try {
        const { audioContextInstance } = synthAudioContext;
        if (audioContextInstance.state === 'suspended') {
          await audioContextInstance.resume();
          console.log('AudioContext resumed automatically');
        }
      } catch (error) {
        console.error('Error accessing AudioContext:', error);
      }
    };

    attemptResumeAudioContext();
  }, [synthAudioContext]);

  return null;
};

export default ManageAudioContextState;
