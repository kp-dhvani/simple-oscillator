import React, { useRef, useState } from 'react';
import { KonvaEventObject } from 'konva/lib/Node';
import { Stage, Layer, Circle, Rect } from 'react-konva';
import Konva from 'konva';

const InteractiveSquare: React.FC = () => {
  const initialHeight = 200;
  const [height, setHeight] = useState(initialHeight);
  const [isLocked, setIsLocked] = useState(false);
  const initialMouseYRef = useRef<number | null>(null);
  const mainBodyRef = useRef<Konva.Rect>(null);

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
      const newHeight = Math.max(50, height + deltaY);
      setHeight(newHeight);
      if (mainBodyRef.current) {
        mainBodyRef.current.y(mainBodyRef.current.y() - deltaY);
      }
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
  return (
    <Stage
      width={800}
      height={800}
      onMouseMove={handleMouseMove} // Update shape while dragging
      onMouseUp={handleMouseUp} // Release lock on mouse up
    >
      <Layer offsetY={-150}>
        {/* main body */}
        <Rect
          x={100}
          y={100}
          width={200}
          height={height}
          fill={'#00B6EE'}
          ref={mainBodyRef}
          onClick={handleShapeClick}
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
        {/* face */}

        <Rect
          x={190}
          y={250}
          width={20}
          height={10}
          cornerRadius={50}
          fill={'#fff'}
        />
        {/* left arm */}
        <Rect
          x={100}
          y={200}
          width={35}
          height={60}
          cornerRadius={50}
          fill={'#00B6EE'}
          offsetX={40}
        />
        {/* right arm */}
        <Rect
          x={350}
          y={195}
          width={35}
          height={60}
          cornerRadius={50}
          fill={'#00B6EE'}
          offsetX={45}
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
