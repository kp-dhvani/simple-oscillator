import React, { useState } from 'react';
import { Arc, Stage, Layer, Circle, Rect, Shape } from 'react-konva';

interface NonInteractiveShapeProps {
  onClick: () => void;
}

const NonInteractiveShape: React.FC<NonInteractiveShapeProps> = ({
  onClick,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className='non-interactive-shape'>
      <Stage width={300} height={200} style={{ cursor: 'pointer' }}>
        <Layer
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Circle
            x={170}
            y={75}
            fill={hovered ? '#FF6577' : '#B3B3B3'}
            radius={40}
            onClick={() => onClick()}
            onTouchStart={() => onClick()}
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
