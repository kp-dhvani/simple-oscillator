import React, { useRef, useState } from 'react';
import { KonvaEventObject } from 'konva/lib/Node';
import { Arc, Stage, Layer, Circle, Rect, Shape } from 'react-konva';

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
  const [topY, setTopY] = useState(100);
  const initialMouseYRef = useRef<number | null>(null);

  const handleShapeClick = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    if (isLocked) {
      lockShape(false);
      initialMouseYRef.current = null;
    } else {
      // Lock the shape and start tracking the mouse position
      lockShape(true);
      const clientY =
        'touches' in e.evt ? e.evt.touches[0].clientY : e.evt.clientY;
      initialMouseYRef.current = clientY; // Capture initial mouse position
      setTopY(100);
    }
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    if (isLocked && initialMouseYRef.current !== null) {
      const currentMouseY =
        'touches' in e.evt ? e.evt.touches[0].clientY : e.evt.clientY;
      const deltaY = initialMouseYRef.current - currentMouseY;
      const newTopY = topY - deltaY;
      setShapeDimensionChangeDelta(deltaY);
      setTopY(newTopY >= 140 ? 140 : newTopY);
      initialMouseYRef.current = currentMouseY;
    }
  };

  const handleMouseUp = () => {
    if (isLocked) {
      lockShape(false);
      initialMouseYRef.current = null;
      setTopY(100);
    }
  };

  return (
    <Stage
      width={400}
      height={520}
      onMouseMove={handleMouseMove} // Update shape while dragging
      onMouseUp={handleMouseUp} // Release lock on mouse up
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
      offsetY={-120}
    >
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
          onClick={handleShapeClick}
          onTouchStart={handleShapeClick}
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

        {/* 
<Rect
          x={85}
          y={200}
          width={35}
          height={60}
          cornerRadius={50}
          fill={'#FF4582'}
          rotation={!isLocked ? 120 : 40}
        />
        <Rect
          x={285}
          y={230}
          width={35}
          height={60}
          cornerRadius={50}
          fill={'#FF4582'}
          rotation={!isLocked ? -120 : -40}
        /> */}
      </Layer>
    </Stage>
  );
};

export default InteractiveTriangle;
