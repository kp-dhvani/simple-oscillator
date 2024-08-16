import React, { useEffect, useRef, useState } from 'react';
import { KonvaEventObject } from 'konva/lib/Node';
import {
  Arc,
  Stage,
  Layer,
  Circle,
  Line,
  Rect,
  Shape,
  RegularPolygon,
} from 'react-konva';

const InteractiveTriangle: React.FC = () => {
  const initialHeight = 170;
  const [height, setHeight] = useState(initialHeight);
  const [topY, setTopY] = useState(100); // Top point of the triangle
  const [isLocked, setIsLocked] = useState(false);
  const initialMouseYRef = useRef<number | null>(null);

  const handleShapeClick = (e: KonvaEventObject<MouseEvent>) => {
    if (isLocked) {
      // If already locked, release the lock on click
      setIsLocked(false);
      initialMouseYRef.current = null;
    } else {
      // Lock the shape and start tracking the mouse position
      setIsLocked(true);
      initialMouseYRef.current = e.evt.clientY; // Capture initial mouse position
    }
  };

  const handleMouseMove = (e: any) => {
    if (isLocked && initialMouseYRef.current !== null) {
      const currentMouseY = e.evt.clientY;
      const deltaY = initialMouseYRef.current - currentMouseY;
      const newTopY = topY - deltaY;

      setTopY(newTopY);

      initialMouseYRef.current = currentMouseY;
    }
  };

  // useEffect(() => {
  //   console.log({ isLocked });
  // }, [isLocked]);

  // Handle mouse up event to release the lock
  const handleMouseUp = () => {
    if (isLocked) {
      setIsLocked(false);
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
        {/* <RegularPolygon
          x={200}
          y={370 - height}
          sides={3}
          radius={170}
          fill={'#00B6EE'}
          onClick={handleShapeClick}
        /> */}
        <Shape
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(180, topY); // Top vertex
            context.lineTo(30, 300); // Bottom left vertex
            context.lineTo(330, 300); // Bottom right vertex
            context.closePath();
            context.fillStrokeShape(shape);
          }}
          fill='#00B6EE'
          onClick={handleShapeClick}
        />
        <Circle x={150} y={220} fill={'#fff'} radius={15} />
        <Circle x={210} y={220} fill={'#fff'} radius={15} />
        {/* <Arc
          x={200}
          y={210}
          angle={180}
          innerRadius={0}
          outerRadius={50}
          fill={'#fff'}
        /> */}
        <Rect
          x={170}
          y={270}
          width={20}
          height={10}
          cornerRadius={50}
          fill={'#fff'}
        />
        <Rect
          x={100}
          y={200}
          width={35}
          height={60}
          cornerRadius={50}
          fill={'#00B6EE'}
          offsetX={40}
          rotation={40}
        />
        <Rect
          x={350}
          y={130}
          width={35}
          height={60}
          cornerRadius={50}
          fill={'#00B6EE'}
          offsetX={110}
          rotation={-40}
        />
        {/* left leg */}
        <Rect
          x={120}
          y={260}
          width={35}
          height={80}
          cornerRadius={50}
          fill={'#00B6EE'}
        />
        {/* right leg */}
        <Rect
          x={210}
          y={260}
          width={35}
          height={80}
          cornerRadius={50}
          fill={'#00B6EE'}
        />
      </Layer>
    </Stage>
  );
};

export default InteractiveTriangle;
