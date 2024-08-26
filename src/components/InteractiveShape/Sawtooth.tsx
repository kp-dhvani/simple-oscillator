import React, { useEffect, useRef, useState } from 'react';
import { KonvaEventObject } from 'konva/lib/Node';
import { Arc, Stage, Layer, Circle, Rect, RegularPolygon } from 'react-konva';
import Konva from 'konva';

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
  const initialMouseYRef = useRef<number | null>(null);
  const mainBodyRef = useRef<Konva.Rect>(null);

  const handleShapeClick = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    if (isLocked) {
      lockShape(false);
      initialMouseYRef.current = null;
      setHeight(initialHeight);
      if (mainBodyRef.current) {
        mainBodyRef.current.y(100);
      }
    } else {
      lockShape(true);
      initialMouseYRef.current =
        'touches' in e.evt ? e.evt.touches[0].clientY : e.evt.clientY;
    }
  };

  // Handle mouse move event on the shape
  const handleMouseMove = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    if (isLocked && initialMouseYRef.current !== null) {
      const currentMouseY =
        'touches' in e.evt ? e.evt.touches[0].clientY : e.evt.clientY;
      const deltaY = initialMouseYRef.current - currentMouseY;
      const newHeight = Math.max(130, Math.min(390, height + deltaY));
      setShapeDimensionChangeDelta(deltaY);
      setHeight(newHeight);
      if (newHeight > 130 && newHeight < 390 && mainBodyRef.current) {
        mainBodyRef.current.y(mainBodyRef.current.y() - deltaY);
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
      offsetY={-120}
    >
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
          onClick={handleShapeClick}
          onTouchStart={handleShapeClick}
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
  );
};

export default InteractiveSawtooth;
