import React, { useEffect, useRef, useState } from 'react';
import { KonvaEventObject } from 'konva/lib/Node';
import { Arc, Stage, Layer, Circle, Rect, Shape } from 'react-konva';

interface InteractiveSineProps {
  isLocked: boolean;
  lockShape: React.Dispatch<React.SetStateAction<boolean>>;
  setNewShapeCoordinates: React.Dispatch<React.SetStateAction<number>>;
}

const InteractiveSine: React.FC<InteractiveSineProps> = ({
  isLocked,
  lockShape,
  setNewShapeCoordinates,
}) => {
  const initialRadius = 140;
  const [radius, setRadius] = useState({ x: initialRadius, y: initialRadius });
  const initialMouseYRef = useRef<number | null>(null);

  const handleShapeClick = (e: KonvaEventObject<MouseEvent>) => {
    if (isLocked) {
      lockShape(false);
      initialMouseYRef.current = null;
    } else {
      lockShape(true);
      initialMouseYRef.current = e.evt.clientY;
    }
  };

  // Handle mouse move event on the shape
  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    if (isLocked && initialMouseYRef.current !== null) {
      const currentMouseY = e.evt.clientY;
      const deltaY = initialMouseYRef.current - currentMouseY;
      const newUpperRadiusY = Math.max(50, radius.y + deltaY);
      setRadius({ x: radius.x, y: newUpperRadiusY });

      // Update the initial mouse position for continuous dragging
      initialMouseYRef.current = currentMouseY;
    }
  };

  useEffect(() => {
    setNewShapeCoordinates(radius.y);
  }, [radius]);

  // Handle mouse up event to release the lock
  const handleMouseUp = () => {
    if (isLocked) {
      lockShape(false);
      initialMouseYRef.current = null;
    }
  };
  return (
    <Stage
      width={800}
      height={800}
      onMouseMove={handleMouseMove} // Update shape while dragging
      onMouseUp={handleMouseUp} // Release lock on mouse up
    >
      <Layer offsetY={-150}>
        <Shape
          sceneFunc={(context, shape) => {
            const radiusX = 140;
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
          fill={'#00B6EE'}
          onClick={handleShapeClick} // Toggle locking the shape on click
        />
        <Circle x={170} y={170} fill={'#fff'} radius={20} />
        <Circle x={230} y={170} fill={'#fff'} radius={20} />
        {isLocked ? (
          <Arc
            x={200}
            y={260}
            angle={180}
            innerRadius={0}
            outerRadius={50}
            fill={'#fff'}
          />
        ) : (
          <Rect
            x={190}
            y={260}
            width={20}
            height={10}
            cornerRadius={50}
            fill={'#fff'}
          />
        )}
        <Rect
          x={100}
          y={200}
          width={35}
          height={60}
          cornerRadius={50}
          fill={'#00B6EE'}
          offsetX={75}
        />
        <Rect
          x={420}
          y={200}
          width={35}
          height={60}
          cornerRadius={50}
          fill={'#00B6EE'}
          offsetX={75}
        />
        {/* left leg */}
        <Rect
          x={150}
          y={300}
          width={35}
          height={60}
          cornerRadius={50}
          fill={'#00B6EE'}
          offsetY={-20}
        />
        {/* right leg */}
        <Rect
          x={210}
          y={300}
          width={35}
          height={60}
          cornerRadius={50}
          fill={'#00B6EE'}
          offsetY={-20}
        />
      </Layer>
    </Stage>
  );
};

export default InteractiveSine;
