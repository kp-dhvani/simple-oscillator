import React, { useEffect, useRef, useState } from 'react';
import Draggable, {
  DraggableData,
  DraggableEvent,
  DraggableEventHandler,
} from 'react-draggable';
import NonInteractiveShape from './NonInteractiveShape';
import './Draggable.css';

interface DraggableComponentProps {
  onDragStart: DraggableEventHandler;
  onDragStop: DraggableEventHandler;
  handleDrag: DraggableEventHandler;
  onNoninteractiveShapeClick: () => void;
  isPlaying: boolean;
}

const DraggableComponent: React.FC<DraggableComponentProps> = ({
  isPlaying,
  onDragStart,
  onDragStop,
  handleDrag,
  onNoninteractiveShapeClick,
}) => {
  const dragElementRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = Math.min(1024, window.innerWidth - 32); // 32px for padding
        const height = Math.min(420, width * 0.41); // Maintain aspect ratio
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const saveCoordinates = (_: DraggableEvent, data: DraggableData) => {
    handleDrag(_, data);
  };

  return (
    <div className='drag-box'>
      <NonInteractiveShape onClick={onNoninteractiveShapeClick} />
      <div
        ref={containerRef}
        style={{
          border: `min(10px, 2vw) solid ${isPlaying ? '#FF6577' : '#b3b3b3'}`,
          width: dimensions.width ? `${dimensions.width}px` : '100%',
          height: dimensions.height ? `${dimensions.height}px` : 'auto',
          position: 'relative',
          backgroundColor: isPlaying ? '#FF6577' : '#1C1C1D',
          marginTop: 'min(5rem, 10vw)',
          maxWidth: '1024px',
          margin: 'min(5rem, 10vw) auto 0',
          overflow: 'hidden',
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
            className='drag-button'
            ref={dragElementRef}
            style={{
              height: 'min(30px, 6vw)',
              width: 'min(30px, 6vw)',
              borderRadius: '50%',
              backgroundColor: isPlaying ? '#B3B3B3' : '#1B1B1D',
              color: 'white',
              cursor: 'grab',
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              border: '2px solid #ccc',
              boxShadow: 'inset 0 0 0 1px #b3b3b3',
              padding: 0,
              margin: 0,
            }}
          ></button>
        </Draggable>
      </div>
    </div>
  );
};

export default DraggableComponent;
