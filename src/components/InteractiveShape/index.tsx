import React from 'react';
import Sawtooth from './Sawtooth';
import Sine from './Sine';
import Square from './Square';
import Triangle from './Triangle';

export enum Shapes {
  Sine = 'sine',
  Sawtooth = 'sawtooth',
  Square = 'square',
  Triangle = 'triangle',
}

interface InteractiveShapeProps {
  waveType: string;
  isLocked: boolean;
  lockShape: React.Dispatch<React.SetStateAction<boolean>>;
  setShapeDimensionChangeDelta: React.Dispatch<React.SetStateAction<number>>;
}

const InteractiveShape: React.FC<InteractiveShapeProps> = ({
  waveType,
  isLocked,
  lockShape,
  setShapeDimensionChangeDelta,
}) => {
  const props = {
    isLocked,
    lockShape,
    setShapeDimensionChangeDelta,
  };
  const renderWave = () => {
    switch (waveType) {
      case Shapes.Sawtooth:
        return <Sawtooth {...props} />;
      case Shapes.Sine:
        return <Sine {...props} />;
      case Shapes.Square:
        return <Square {...props} />;
      case Shapes.Triangle:
        return <Triangle />;
      default:
        return <p>Not a supported wave type</p>;
    }
  };
  return (
    <div
      className='interactive-shape'
      style={{
        zIndex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '1rem',
        boxSizing: 'border-box',
      }}
    >
      {renderWave()}
    </div>
  );
};

export default InteractiveShape;
