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
      <Stage width={200} height={300} style={{ cursor: 'pointer' }}>
        <Layer
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Circle
            x={170}
            y={100}
            fill={hovered ? '#FF6577' : '#B3B3B3'}
            radius={60}
            onClick={() => onClick()}
          />
          <Circle x={130} y={90} fill={'#fff'} radius={10} />
          <Circle x={190} y={90} fill={'#fff'} radius={10} />
          {hovered ? (
            <Arc
              x={160}
              y={110}
              angle={180}
              innerRadius={0}
              outerRadius={20}
              fill={'#fff'}
            />
          ) : (
            <Rect
              x={150}
              y={110}
              width={20}
              height={10}
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
