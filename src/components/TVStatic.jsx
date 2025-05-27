import React, { useEffect } from 'react';

const TVStatic = () => {
  useEffect(() => {
    const canvas = document.getElementById('tv-static-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    const drawStatic = () => {
      const w = canvas.width;
      const h = canvas.height;
      const imageData = ctx.createImageData(w, h);
      for (let i = 0; i < w * h * 4; i += 4) {
        const shade = Math.random() * 120;
        imageData.data[i] = shade;
        imageData.data[i + 1] = shade;
        imageData.data[i + 2] = shade;
        imageData.data[i + 3] = 60 + Math.random() * 80; // alpha
      }
      ctx.putImageData(imageData, 0, 0);
      animationId = requestAnimationFrame(drawStatic);
    };
    drawStatic();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-20"
      style={{
        background:
          'repeating-linear-gradient(transparent 0px, rgba(255,255,255,0.03) 1px, transparent 2px), repeating-linear-gradient(90deg, transparent 0px, rgba(255,255,255,0.03) 1px, transparent 2px)',
        mixBlendMode: 'screen',
        opacity: 0.7,
        animation: 'staticNoise 0.25s steps(2) infinite',
      }}
    >
      <canvas
        id="tv-static-canvas"
        width="1920"
        height="1080"
        style={{ width: '100%', height: '100%', display: 'block', opacity: 0.5 }}
      ></canvas>
    </div>
  );
};

export default TVStatic;
