import React, { useEffect, useRef } from 'react';
import { useSynthAudioContext } from './SynthAudioContextProvider';

interface VisualiserProps {
  analyser: AnalyserNode | undefined;
  isPlaying: boolean;
}

const Visualiser: React.FC<VisualiserProps> = ({ isPlaying, analyser }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvasContext = canvasRef.current?.getContext('2d');
      if (canvasContext) {
        const pixelRatio = window.devicePixelRatio;
        const sizeOnScreen = canvasRef.current.getBoundingClientRect();
        canvasRef.current.width = sizeOnScreen.width * pixelRatio;
        canvasRef.current.height = sizeOnScreen.height * pixelRatio;
        const canvasHeight = canvasRef.current.height;
        const canvasWidth = canvasRef.current.width;
        canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
        canvasContext.fillStyle = '#1C1C1D';
        canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);
        canvasContext.strokeStyle = '#FF6577';
        canvasContext.beginPath();
        canvasContext.moveTo(0, canvasHeight / 2);
        canvasContext.lineTo(canvasWidth, canvasHeight / 2);
        canvasContext.stroke();
      }
    }
  }, []);
  useEffect(() => {
    if (isPlaying) {
      draw();
    } else {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    }
  }, [isPlaying]);

  const draw = () => {
    const canvasContext = canvasRef.current?.getContext('2d');
    if (canvasRef.current && canvasContext && analyser) {
      const width = canvasRef.current.width;
      const height = canvasRef.current.height;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteTimeDomainData(dataArray);
      canvasContext.clearRect(0, 0, width, height); // Clear the canvas
      canvasContext.fillStyle = '#1C1C1D';
      canvasContext.fillRect(0, 0, width, height);
      canvasContext.strokeStyle = '#FF6577';
      canvasContext.lineWidth = 5;
      canvasContext.beginPath();

      const sliceWidth = (width * 1.0) / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * height) / 2;

        if (i === 0) {
          canvasContext.moveTo(x, y);
        } else {
          canvasContext.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasContext.lineTo(width, height / 2);
      canvasContext.stroke();

      animationFrameIdRef.current = requestAnimationFrame(draw);
    }
  };
  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          width: '600px',
          height: '300px',
          border: `5px solid ${isPlaying ? '#FF6577' : '#b3b3b3'}`,
        }}
      />
      <p>Visualiser</p>
    </>
  );
};

export default Visualiser;
