import React, { ReactNode, createContext, useContext, useState } from 'react';
import {
  SynthAudioContextType,
  synthAudioContextInstance,
} from '../lib/SynthAudioContext';

interface SynthAudioContextProviderProps {
  children: ReactNode;
}

const SynthAudioContextContext = createContext<
  SynthAudioContextType | undefined
>(undefined);

export const useSynthAudioContext = () => {
  const context = useContext(SynthAudioContextContext);
  if (!context) {
    throw new Error(
      'useSynthAudioContext must be used within a SynthAudioContextProvider',
    );
  }
  return context;
};

export const SynthAudioContextProvider: React.FC<
  SynthAudioContextProviderProps
> = ({ children }) => {
  return (
    <SynthAudioContextContext.Provider value={synthAudioContextInstance}>
      {children}
    </SynthAudioContextContext.Provider>
  );
};
