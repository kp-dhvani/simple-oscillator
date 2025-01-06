import React, { useEffect, useRef, useState } from 'react';
import { Arc, Stage, Layer, Circle, Rect, Shape } from 'react-konva';
import Konva from 'konva';
import Hammer from 'hammerjs';

interface InteractiveSineProps {
  isLocked: boolean;
  lockShape: React.Dispatch<React.SetStateAction<boolean>>;
  setShapeDimensionChangeDelta: React.Dispatch<React.SetStateAction<number>>;
}

const InteractiveSine: React.FC<InteractiveSineProps> = ({
  isLocked,
  lockShape,
  setShapeDimensionChangeDelta,
}) => {
  const initialRadius = 140;
  const [radius, setRadius] = useState({ x: initialRadius, y: initialRadius });
  const shapeRef = useRef<Konva.Shape>(null);

  useEffect(() => {
    const shape = shapeRef.current;
    if (!shape) return;

    // get the actual HTML element for the shape
    const shapeElement = shape.getStage()?.container();
    if (!shapeElement) return;

    const hammer = new Hammer(shapeElement);

    // configure for vertical panning
    hammer.get('pan').set({
      direction: Hammer.DIRECTION_VERTICAL,
      threshold: 0,
    });

    hammer.on('pan', (ev) => {
      const deltaY = -ev.deltaY; // invert for natural direction
      const newUpperRadiusY = Math.max(80, initialRadius + deltaY);

      setRadius((prev) => ({ x: prev.x, y: newUpperRadiusY }));
      setShapeDimensionChangeDelta(deltaY);
      lockShape(true);
    });

    hammer.on('panend', () => {
      setRadius({ x: initialRadius, y: initialRadius });
      lockShape(false);
    });

    return () => {
      hammer.destroy();
    };
  }, [setShapeDimensionChangeDelta]);

  return (
    <Stage width={400} height={520} offsetY={-120}>
      <Layer>
        <Shape
          sceneFunc={(context, shape) => {
            const radiusX = initialRadius;
            const centerX = 200;
            const centerY = 200;

            context.beginPath();

            //draw upper part of the ellipse
            context.moveTo(centerX - radius.x, centerY);
            context.ellipse(
              centerX,
              centerY,
              radius.x,
              radius.y,
              0,
              Math.PI,
              0,
              false,
            );

            context.ellipse(
              centerX,
              centerY,
              radiusX,
              initialRadius,
              0,
              0,
              Math.PI,
              false,
            );

            context.closePath();
            context.fillStrokeShape(shape);
          }}
          fill={'#FF6577'}
          ref={shapeRef}
        />
        <Circle x={150} y={170} fill={'#fff'} radius={15} />
        <Circle x={250} y={170} fill={'#fff'} radius={15} />
        {isLocked ? (
          <Arc
            x={200}
            y={220}
            angle={180}
            innerRadius={0}
            outerRadius={90}
            fill={'#fff'}
          />
        ) : (
          <Rect
            x={190}
            y={280}
            width={20}
            height={10}
            cornerRadius={50}
            fill={'#fff'}
          />
        )}
        {/* left arm */}
        <Rect
          x={isLocked ? 45 : 25}
          y={200}
          width={35}
          height={60}
          cornerRadius={50}
          fill={'#FF6577'}
          rotation={isLocked ? 60 : 0}
        />
        {/* right arm */}
        <Rect
          x={340}
          y={isLocked ? 230 : 200}
          width={35}
          height={60}
          cornerRadius={50}
          fill={'#FF6577'}
          rotation={isLocked ? -60 : 0}
        />
        {/* left leg */}
        <Rect
          x={150}
          y={305}
          width={35}
          height={55}
          cornerRadius={50}
          fill={'#FF6577'}
          offsetY={-10}
        />
        {/* right leg */}
        <Rect
          x={210}
          y={305}
          width={35}
          height={55}
          cornerRadius={50}
          fill={'#FF6577'}
          offsetY={-10}
        />
      </Layer>
    </Stage>
  );
};

export default InteractiveSine;
