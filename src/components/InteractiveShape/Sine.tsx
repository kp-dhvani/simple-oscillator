import React, { useRef, useState } from 'react';
import { KonvaEventObject } from 'konva/lib/Node';
import { Arc, Stage, Layer, Circle, Rect, Shape } from 'react-konva';

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
  const initialMouseYRef = useRef<number | null>(null);

  const handleShapeClick = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    e.evt.preventDefault();
    if (isLocked) {
      lockShape(false);
      initialMouseYRef.current = null;
      setRadius({ x: initialRadius, y: initialRadius });
    } else {
      lockShape(true);
      const clientY =
        'touches' in e.evt ? e.evt.touches[0].clientY : e.evt.clientY;
      initialMouseYRef.current = clientY;
    }
  };

  // Handle mouse move event on the shape
  const handleMouseMove = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    e.evt.preventDefault();
    if (isLocked && initialMouseYRef.current !== null) {
      const currentMouseY =
        'touches' in e.evt ? e.evt.touches[0].clientY : e.evt.clientY;
      const deltaY = initialMouseYRef.current - currentMouseY;
      const newUpperRadiusY = Math.max(80, radius.y + deltaY);
      setShapeDimensionChangeDelta(deltaY);
      setRadius({ x: radius.x, y: newUpperRadiusY });

      // Update the initial mouse position for continuous dragging
      initialMouseYRef.current = currentMouseY;
    }
  };

  const handleMouseUp = () => {
    if (isLocked) {
      lockShape(false);
      initialMouseYRef.current = null;
      setRadius({ x: initialRadius, y: initialRadius });
    }
  };

  return (
    <Stage
      width={400}
      height={520}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
      offsetY={-120}
    >
      <Layer>
        <Shape
          sceneFunc={(context, shape) => {
            const radiusX = initialRadius;
            const centerX = 200;
            const centerY = 200;

            context.beginPath();

            // Draw upper part of the ellipse
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
          onClick={handleShapeClick} // Toggle locking the shape on click
          onTouchStart={handleShapeClick}
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
