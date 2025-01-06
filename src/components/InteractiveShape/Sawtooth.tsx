import React, { useEffect, useRef, useState } from 'react';
import { Arc, Stage, Layer, Circle, Rect, RegularPolygon } from 'react-konva';
import Konva from 'konva';
import Hammer from 'hammerjs';

interface InteractiveSawtoothProps {
  isLocked: boolean;
  lockShape: React.Dispatch<React.SetStateAction<boolean>>;
  setShapeDimensionChangeDelta: React.Dispatch<React.SetStateAction<number>>;
}

const InteractiveSawtooth: React.FC<InteractiveSawtoothProps> = ({
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

    // get the actual HTML element for the shape
    const shapeElement = mainBody.getStage()?.container();
    if (!shapeElement) return;

    const hammer = new Hammer(shapeElement);

    // configure for vertical panning
    hammer.get('pan').set({
      direction: Hammer.DIRECTION_VERTICAL,
      threshold: 0,
    });

    hammer.on('pan', (ev: HammerInput) => {
      lockShape(true);
      const deltaY = -ev.deltaY; // invert for natural direction
      const newHeight = Math.max(130, Math.min(390, initialHeight + deltaY));

      setHeight(newHeight);
      setShapeDimensionChangeDelta(deltaY);

      if (mainBodyRef.current) {
        mainBodyRef.current.y(100 + (initialHeight - newHeight));
      }
    });

    hammer.on('panend', () => {
      lockShape(false);
      setHeight(initialHeight);
      if (mainBodyRef.current) {
        mainBodyRef.current.y(100);
      }
    });

    return () => {
      hammer.destroy();
    };
  }, [setShapeDimensionChangeDelta]);

  return (
    <div>
      <Stage width={400} height={520} offsetY={-120}>
        <Layer>
          {/* sawtooth */}
          <RegularPolygon
            x={140}
            y={200 - height + 100}
            sides={3}
            radius={40}
            rotation={-90}
            fill={'#FF6577'}
          />
          {/* sawtooth */}
          <RegularPolygon
            x={195}
            y={200 - height + 100}
            sides={3}
            radius={40}
            rotation={-90}
            fill={'#FF6577'}
          />
          {/* sawtooth */}
          <RegularPolygon
            x={250}
            y={200 - height + 100}
            sides={3}
            radius={40}
            rotation={-90}
            fill={'#FF6577'}
          />
          {/* main body */}
          <Rect
            x={100}
            y={100}
            width={170}
            height={height}
            fill={'#FF6577'}
            ref={mainBodyRef}
          />
          <Circle x={150} y={170} fill={'#fff'} radius={15} />
          <Circle x={220} y={170} fill={'#fff'} radius={15} />
          {isLocked ? (
            <Arc
              x={185}
              y={230}
              angle={180}
              innerRadius={0}
              outerRadius={50}
              fill={'#fff'}
            />
          ) : (
            <Rect
              x={175}
              y={260}
              width={20}
              height={10}
              cornerRadius={50}
              fill={'#fff'}
            />
          )}

          {/* left arm */}
          <Rect
            x={isLocked ? 80 : 60}
            y={200}
            width={35}
            height={60}
            cornerRadius={50}
            fill={'#FF6577'}
            rotation={isLocked ? 60 : 0}
          />
          {/* right arm */}
          <Rect
            x={isLocked ? 270 : 275}
            y={isLocked ? 230 : 200}
            width={35}
            height={60}
            cornerRadius={50}
            fill={'#FF6577'}
            rotation={isLocked ? -60 : 0}
          />
          {/* left leg */}
          <Rect
            x={130}
            y={280}
            width={35}
            height={60}
            cornerRadius={50}
            fill={'#FF6577'}
          />
          {/* right leg */}
          <Rect
            x={200}
            y={280}
            width={35}
            height={60}
            cornerRadius={50}
            fill={'#FF6577'}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default InteractiveSawtooth;
