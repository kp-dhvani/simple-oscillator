import React, { useEffect, useRef, useState } from 'react';
import { Arc, Stage, Layer, Circle, Rect } from 'react-konva';
import Hammer from 'hammerjs';
import Konva from 'konva';

interface NonInteractiveShapeProps {
  onClick: () => void;
}

const NonInteractiveShape: React.FC<NonInteractiveShapeProps> = ({
  onClick,
}) => {
  const [hovered, setHovered] = useState(false);
  const stageRef = useRef<Konva.Stage>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const shapeElement = stage.container();
    if (!shapeElement) return;

    const hammer = new Hammer(shapeElement);

    hammer.get('press').set({
      time: 1,
    });

    hammer.on('press', () => {
      onClick();
    });

    return () => {
      hammer.destroy();
    };
  }, [onClick]);

  return (
    <div className='non-interactive-shape'>
      <Stage
        width={300}
        height={200}
        offsetY={20}
        style={{ cursor: 'pointer' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        ref={stageRef}
      >
        <Layer>
          <Circle
            x={170}
            y={75}
            fill={hovered ? '#FF6577' : '#B3B3B3'}
            radius={40}
          />
          <Circle x={150} y={60} fill={'#fff'} radius={5} />
          <Circle x={190} y={60} fill={'#fff'} radius={5} />
          {hovered ? (
            <Arc
              x={170}
              y={75}
              angle={180}
              innerRadius={0}
              outerRadius={15}
              fill={'#fff'}
            />
          ) : (
            <Rect
              x={160}
              y={75}
              width={18}
              height={8}
              cornerRadius={50}
              fill={'#fff'}
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default NonInteractiveShape;
