import React, { useRef, useState } from 'react';
import Draggable, {
  DraggableData,
  DraggableEvent,
  DraggableEventHandler,
} from 'react-draggable';
import './draggable.css';
interface DraggableComponentProps {
  onDragStart: DraggableEventHandler;
  onDragStop: DraggableEventHandler;
  handleDrag: DraggableEventHandler;
  isPlaying: boolean;
}
const normalizedToDegrees = (
  normalizedValue: number,
  maxAngle: number,
  perspective: number,
) => {
  const angleRange = 2 * maxAngle; // Convert from +/- maxAngle to 0 to 2 * maxAngle
  const apparentDistance = perspective / (1 - Math.abs(normalizedValue)); // Consider perspective depth

  // Adjust for perspective based on distance from center (normalizedValue = 0)
  const distanceFactor = apparentDistance / perspective;
  const adjustedAngleRange = distanceFactor * angleRange;

  const degrees = normalizedValue * adjustedAngleRange;
  return degrees;
};
const DraggableComponent: React.FC<DraggableComponentProps> = ({
  isPlaying,
  onDragStart,
  onDragStop,
  handleDrag,
}) => {
  const dragElementRef = useRef<HTMLButtonElement>(null);
  const [coordinates, setCoordinates] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const maxRotateY = 3;
  const maxRotateX = 5;

  const saveCoordinates = (_: DraggableEvent, data: DraggableData) => {
    setCoordinates({ x: data.x, y: data.y });
    handleDrag(_, data);
  };
  return (
    <>
      <div
        className='drag-box'
        style={{
          left: '50%',
          top: '50%',
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: `10px solid ${isPlaying ? '#FF6577' : '#b3b3b3'}`,
            transition: 'transform 0.3s ease-in-out',
            transform: `
              perspective(500px)
              rotateY(${normalizedToDegrees(coordinates.y, maxRotateY, 100)}deg)
              rotateX(${normalizedToDegrees(coordinates.x, maxRotateX, 100)}deg)
            `,
          }}
        >
          <div
            className={isPlaying ? 'active' : ''}
            style={{
              width: '512px',
              height: '420px',
              position: 'relative',
              backgroundColor: isPlaying ? '#FF6577' : '#1C1C1D',
            }}
          >
            <Draggable
              bounds='parent'
              grid={[1, 1]}
              nodeRef={dragElementRef}
              onStart={onDragStart}
              onStop={onDragStop}
              onDrag={saveCoordinates}
            >
              <button
                ref={dragElementRef}
                style={{
                  height: '30px',
                  width: '30px',
                  borderRadius: '50%',
                  backgroundColor: isPlaying ? '#B3B3B3' : '#1B1B1D',
                  color: 'white',
                  cursor: 'grab',
                  position: 'absolute',
                  left: 'calc(50% - 10px)',
                  top: 'calc(50% - 0px)',
                  transform: 'translate(-50%, -50%)',
                  border: '2px solid #ccc',
                  boxShadow: 'inset 0 0 0 1px #b3b3b3',
                }}
              ></button>
            </Draggable>
          </div>
        </div>
      </div>
    </>
  );
};

export default DraggableComponent;
