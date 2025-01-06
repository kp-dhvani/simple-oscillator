import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Circle, Rect, Arc } from 'react-konva';
import Konva from 'konva';
import Hammer from 'hammerjs';

interface InteractiveSquareProps {
  isLocked: boolean;
  lockShape: React.Dispatch<React.SetStateAction<boolean>>;
  setShapeDimensionChangeDelta: React.Dispatch<React.SetStateAction<number>>;
}

const InteractiveSquare: React.FC<InteractiveSquareProps> = ({
  isLocked,
  lockShape,
  setShapeDimensionChangeDelta,
}) => {
  const initialHeight = 200;
  const [height, setHeight] = useState(initialHeight);
  const mainBodyRef = useRef<Konva.Rect>(null);

  useEffect(() => {
    const mainBody = mainBodyRef.current;
    if (!mainBody) return;

    // Get the actual HTML element for the shape
    const shapeElement = mainBody.getStage()?.container();
    if (!shapeElement) return;

    const hammer = new Hammer(shapeElement);

    // Configure for vertical panning
    hammer.get('pan').set({
      direction: Hammer.DIRECTION_VERTICAL,
      threshold: 0,
    });

    hammer.on('pan', (ev) => {
      const deltaY = -ev.deltaY; // Invert for natural direction
      const newHeight = Math.max(140, initialHeight + deltaY);

      setHeight(newHeight);
      setShapeDimensionChangeDelta(deltaY);
      lockShape(true);

      if (mainBodyRef.current) {
        const newY = 100 + (initialHeight - newHeight);
        if (newY >= 160) {
          mainBodyRef.current.y(160);
        } else {
          mainBodyRef.current.y(newY);
        }
      }
    });

    hammer.on('panend', () => {
      setHeight(initialHeight);
      lockShape(false);
      if (mainBodyRef.current) {
        mainBodyRef.current.y(100);
      }
    });

    return () => {
      hammer.destroy();
    };
  }, [setShapeDimensionChangeDelta]);

  return (
    <Stage width={400} height={520}>
      <Layer offsetY={-120}>
        {/* main body */}
        <Rect
          x={100}
          y={100}
          width={200}
          height={height}
          fill={'#00B6EE'}
          ref={mainBodyRef}
          cornerRadius={10}
        />
        <Circle x={170} y={190} fill={'#fff'} radius={15} />
        <Circle x={230} y={190} fill={'#fff'} radius={15} />

        {/* face */}
        {isLocked ? (
          <Arc
            x={200}
            y={220}
            angle={180}
            innerRadius={0}
            outerRadius={60}
            fill={'#fff'}
          />
        ) : (
          <Rect
            x={190}
            y={265}
            width={20}
            height={10}
            cornerRadius={50}
            fill={'#fff'}
          />
        )}

        {/* left arm */}
        <Rect
          x={isLocked ? 80 : 60}
          y={195}
          width={35}
          height={60}
          cornerRadius={50}
          fill={'#00B6EE'}
          rotation={isLocked ? 60 : 0}
        />
        {/* right arm */}
        <Rect
          x={isLocked ? 303 : 305}
          y={isLocked ? 225 : 195}
          width={35}
          height={60}
          cornerRadius={50}
          fill={'#00B6EE'}
          rotation={isLocked ? -60 : 0}
        />
        {/* left leg */}
        <Rect
          x={150}
          y={280}
          width={35}
          height={60}
          cornerRadius={50}
          fill={'#00B6EE'}
        />
        {/* right leg */}
        <Rect
          x={210}
          y={280}
          width={35}
          height={60}
          cornerRadius={50}
          fill={'#00B6EE'}
        />
      </Layer>
    </Stage>
  );
};

export default InteractiveSquare;
