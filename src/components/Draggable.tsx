import React, { useRef } from 'react';
import Draggable, { DraggableEventHandler } from 'react-draggable';

interface DraggableComponentProps {
    onDragStart: DraggableEventHandler;
    onDragStop: DraggableEventHandler;
    handleDrag: DraggableEventHandler;
}

const DraggableComponent: React.FC<DraggableComponentProps> = ({
    onDragStart,
    onDragStop,
    handleDrag,
}) => {
    const dragElementRef = useRef<HTMLButtonElement>(null);

    return (
        <>
            <div className='drag-box' style={{ left: '50%', top: '50%', position: 'absolute', transform: 'translate(-50%, -50%)' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <div
                        style={{ width: '500px', height: '500px', position: 'relative', border: '1px solid #000' }}
                    >
                        <Draggable
                            bounds="parent"
                            nodeRef={dragElementRef}
                            onStart={onDragStart}
                            onStop={onDragStop}
                            onDrag={handleDrag}
                        >
                            <button ref={dragElementRef} style={{ position: 'absolute', left: 'calc(50% - 50px)', top: 'calc(50% - 20px)', transform: 'translate(-50%, -50%)', cursor: 'grab' }}>
                                drag me
                            </button>
                        </Draggable>
                    </div>
                </div>
            </div>
        </>
    );

}

export default DraggableComponent;