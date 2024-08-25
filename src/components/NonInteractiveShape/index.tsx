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
      <Stage width={200} height={200} style={{ cursor: 'pointer' }}>
        <Layer
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Circle
            x={170}
            y={100}
            fill={hovered ? '#FF6577' : '#B3B3B3'}
            radius={40}
            offsetX={-20}
            onClick={() => onClick()}
          />
          <Circle x={165} y={90} fill={'#fff'} radius={5} />
          <Circle x={195} y={90} fill={'#fff'} radius={5} />
          {hovered ? (
            <Arc
              x={185}
              y={110}
              angle={180}
              innerRadius={0}
              outerRadius={15}
              fill={'#fff'}
            />
          ) : (
            <Rect
              x={175}
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
