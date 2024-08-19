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
        return <Sawtooth />;
      case Shapes.Sine:
        return <Sine {...props} />;
      case Shapes.Square:
        return <Square />;
      case Shapes.Triangle:
        return <Triangle />;
      default:
        return <p>Not a supported wave type</p>;
    }
  };
  return <div className='interactive-shape'>{renderWave()}</div>;
};

export default InteractiveShape;
