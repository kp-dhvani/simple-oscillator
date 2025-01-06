import React, { useEffect, useRef, useState } from 'react';
import { Arc, Stage, Layer, Circle, Rect, Shape } from 'react-konva';
import Konva from 'konva';

interface InteractiveTrianlgeProps {
  isLocked: boolean;
  lockShape: React.Dispatch<React.SetStateAction<boolean>>;
  setShapeDimensionChangeDelta: React.Dispatch<React.SetStateAction<number>>;
}

const InteractiveTriangle: React.FC<InteractiveTrianlgeProps> = ({
  isLocked,
  lockShape,
  setShapeDimensionChangeDelta,
}) => {
  const initialTopY = 100;
  const [topY, setTopY] = useState(initialTopY);
  const shapeRef = useRef<Konva.Shape>(null);

  useEffect(() => {
    const mainBody = shapeRef.current;
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

    hammer.on('pan', (ev) => {
      const deltaY = ev.deltaY; // invert for natural direction
      const newTopY = Math.min(140, 100 + deltaY);

      setTopY(newTopY);
      setShapeDimensionChangeDelta(-deltaY);
      lockShape(true);
    });

    hammer.on('panend', () => {
      setTopY(initialTopY);
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
            const radius = 10;

            const topX = 180;
            const topYPosition = topY;
            const leftX = 30;
            const leftY = 300;
            const rightX = 330;
            const rightY = 300;

            context.beginPath();

            context.moveTo(leftX + radius, leftY);
            context.arcTo(leftX, leftY, topX, topYPosition, radius);

            context.lineTo(topX - radius, topYPosition + radius);
            context.arcTo(topX, topYPosition, rightX, rightY, radius);

            context.lineTo(rightX, rightY - 15);
            context.arcTo(
              rightX + radius,
              rightY,
              leftX + radius,
              leftY,
              radius,
            );

            context.fillStrokeShape(shape);
          }}
          fill='#FF4582'
          ref={shapeRef}
        />
        <Circle x={150} y={200} fill={'#fff'} radius={15} />
        <Circle x={210} y={200} fill={'#fff'} radius={15} />
        {/* face */}
        {isLocked ? (
          <Arc
            x={180}
            y={250}
            angle={180}
            innerRadius={0}
            outerRadius={40}
            fill={'#fff'}
          />
        ) : (
          <Rect
            x={172}
            y={270}
            width={15}
            height={7}
            cornerRadius={50}
            fill={'#fff'}
          />
        )}

        {/* left arm */}
        <Rect
          x={isLocked ? 85 : 50}
          y={200}
          width={35}
          height={60}
          cornerRadius={50}
          fill={'#FF4582'}
          rotation={isLocked ? 120 : 40}
        />
        {/* right arm */}
        <Rect
          x={290}
          y={isLocked ? 230 : 220}
          width={35}
          height={60}
          cornerRadius={50}
          fill={'#FF4582'}
          rotation={isLocked ? -120 : -40}
        />
        {/* left leg */}
        <Rect
          x={130}
          y={280}
          width={35}
          height={60}
          cornerRadius={50}
          fill={'#FF4582'}
        />
        {/* right leg */}
        <Rect
          x={200}
          y={280}
          width={35}
          height={60}
          cornerRadius={50}
          fill={'#FF4582'}
        />
      </Layer>
    </Stage>
  );
};

export default InteractiveTriangle;
