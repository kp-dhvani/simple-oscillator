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
  const initialRadius = 140;
  const [radius, setRadius] = useState({ x: initialRadius, y: initialRadius });
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

  // Handle mouse up event to release the lock
  const handleMouseUp = () => {
    if (isLocked) {
      setIsLocked(false);
      initialMouseYRef.current = null;
    }
  };
  const width = 800;
  const height = 800;
  //   const radius = 200;
  const cornerRadius = 30;
  return (
    <Stage
      width={800}
      height={800}
      onMouseMove={handleMouseMove} // Update shape while dragging
      onMouseUp={handleMouseUp} // Release lock on mouse up
    >
      <Layer offsetY={-250}>
        <RegularPolygon
          x={200}
          y={200}
          sides={3}
          radius={170}
          fill={'#00B6EE'}
        />
        <Circle x={170} y={190} fill={'#fff'} radius={20} />
        <Circle x={230} y={190} fill={'#fff'} radius={20} />
        {/* <Arc
          x={200}
          y={210}
          angle={180}
          innerRadius={0}
          outerRadius={50}
          fill={'#fff'}
        /> */}
        <Rect
          x={190}
          y={250}
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
          rotation={30}
        />
        <Rect
          x={350}
          y={130}
          width={35}
          height={60}
          cornerRadius={50}
          fill={'#00B6EE'}
          offsetX={73}
          offsetY={-27}
          rotation={-30}
        />
        {/* left leg */}
        <Rect
          x={150}
          y={260}
          width={35}
          height={60}
          cornerRadius={50}
          fill={'#00B6EE'}
        />
        {/* right leg */}
        <Rect
          x={210}
          y={260}
          width={35}
          height={60}
          cornerRadius={50}
          fill={'#00B6EE'}
        />
      </Layer>
    </Stage>
  );
};

export default InteractiveTriangle;
