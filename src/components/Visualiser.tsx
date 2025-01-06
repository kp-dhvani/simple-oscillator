import React, { useEffect, useRef } from 'react';

interface VisualiserProps {
  analyser: AnalyserNode | null;
  isPlaying: boolean;
  maxWidth?: string;
}

const Visualiser: React.FC<VisualiserProps> = React.memo(
  ({ isPlaying, analyser, maxWidth }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameIdRef = useRef<number | null>(null);
    const dataArray = useRef<Uint8Array | null>(null);
    useEffect(() => {
      if (analyser) {
        dataArray.current = new Uint8Array(analyser.frequencyBinCount);
      }
    }, [analyser]);

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
    const draw = () => {
      const canvasContext = canvasRef.current?.getContext('2d');
      if (canvasRef.current && canvasContext && analyser) {
        const width = canvasRef.current.width;
        const height = canvasRef.current.height;
        const bufferLength = analyser.frequencyBinCount;
        analyser.getByteTimeDomainData(dataArray.current!);
        canvasContext.clearRect(0, 0, width, height);
        canvasContext.fillStyle = '#1C1C1D';
        canvasContext.fillRect(0, 0, width, height);
        canvasContext.strokeStyle = '#FF6577';
        canvasContext.lineWidth = 5;
        canvasContext.beginPath();

        const sliceWidth = (width * 1.0) / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray.current![i] / 128.0;
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
    useEffect(() => {
      const startAnimation = () => {
        if (isPlaying && analyser) {
          animationFrameIdRef.current = requestAnimationFrame(draw);
        }
      };

      const stopAnimation = () => {
        if (animationFrameIdRef.current) {
          cancelAnimationFrame(animationFrameIdRef.current);
          animationFrameIdRef.current = null;
        }
      };

      // Determine action based on playing state
      isPlaying ? startAnimation() : stopAnimation();

      // Cleanup function
      return () => {
        stopAnimation();
      };
    }, [isPlaying, analyser, draw]);

    return (
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          maxWidth: maxWidth ? `${maxWidth}px` : '800px',
          height: 'auto',
          aspectRatio: '2 / 1',
          border: `5px solid ${isPlaying ? '#FF6577' : '#b3b3b3'}`,
        }}
      />
    );
  },
);

export default Visualiser;
