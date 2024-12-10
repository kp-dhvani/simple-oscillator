import React, { useRef, useState } from 'react';
import { KonvaEventObject } from 'konva/lib/Node';
import { Stage, Layer, Circle, Rect, Arc } from 'react-konva';
import Konva from 'konva';

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
  const initialMouseYRef = useRef<number | null>(null);
  const mainBodyRef = useRef<Konva.Rect>(null);

  const handleShapeClick = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    e.evt.preventDefault();
    if (isLocked) {
      // If already locked, release the lock on click
      lockShape(false);
      initialMouseYRef.current = null;
      setHeight(initialHeight);
      if (mainBodyRef.current) {
        mainBodyRef.current.y(100);
      }
    } else {
      // Lock the shape and start tracking the mouse position
      lockShape(true);
      const clientY =
        'touches' in e.evt ? e.evt.touches[0].clientY : e.evt.clientY;
      initialMouseYRef.current = clientY; // Capture initial mouse position
    }
  };

  // Handle mouse move event on the shape
  const handleMouseMove = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    e.evt.preventDefault();
    if (isLocked && initialMouseYRef.current !== null) {
      const currentMouseY =
        'touches' in e.evt ? e.evt.touches[0].clientY : e.evt.clientY;
      const deltaY = initialMouseYRef.current - currentMouseY;
      setShapeDimensionChangeDelta(deltaY);
      const newHeight = Math.max(140, height + deltaY);
      setHeight(newHeight);
      if (mainBodyRef.current) {
        const newY = mainBodyRef.current.y() - deltaY;
        if (newY >= 160) {
          mainBodyRef.current.y(160);
        } else {
          mainBodyRef.current.y(newY);
        }
      }
      // Update the initial mouse position for continuous dragging
      initialMouseYRef.current = currentMouseY;
    }
  };

  // Handle mouse up event to release the lock
  const handleMouseUp = () => {
    if (isLocked) {
      lockShape(false);
      initialMouseYRef.current = null;
      setHeight(initialHeight);
      if (mainBodyRef.current) {
        mainBodyRef.current.y(100);
      }
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
    >
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
          onClick={handleShapeClick}
          onTouchStart={handleShapeClick}
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
        {/* <Rect
          x={305}
          y={195}
          width={35}
          height={60}
          cornerRadius={50}
          fill={'#00B6EE'}
        /> */}
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
