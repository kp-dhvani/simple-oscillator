import React, { useRef } from 'react';
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

  const saveCoordinates = (_: DraggableEvent, data: DraggableData) => {
    handleDrag(_, data);
  };

  const buttonStyle = {
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
    ':hover': {
      backgroundColor: '#B3B3B3',
    },
    ':hover::after': {
      content: "'Drag me'",
      position: 'absolute',
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginTop: '5px',
      fontSize: '12px',
      color: 'white',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      padding: '2px 5px',
      borderRadius: '3px',
    },
  };

  return (
    <div className='drag-box'>
      <NonInteractiveShape onClick={onNoninteractiveShapeClick} />
      <div
        style={{
          border: `10px solid ${isPlaying ? '#FF6577' : '#b3b3b3'}`,
          width: '1024px',
          height: '420px',
          position: 'relative',
          backgroundColor: isPlaying ? '#FF6577' : '#1C1C1D',
          marginTop: '5rem',
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
  );
};

export default DraggableComponent;
