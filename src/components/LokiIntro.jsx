import { useEffect, useState } from 'react';

import TVStatic from './TVStatic.jsx';
import EffectControls from './EffectControls.jsx';
import { useStoreEffect } from '../store/StoreEffect.js';

// Lista de tipografías (puedes agregar más fuentes y asegurarte de cargarlas en tu proyecto)
const FONTS = [
  'FontOne',
  // 'FontTwo',
  'FontThree',
  'FontFour',
  'FontFive',
  'FontSix',
  'FontSeven',
  'FontEight',
  'FontNine',
  'FontTen',
];

// Obtener una font random de la lista, asegurando que no sea la misma que la actual
const getRandomFont = (currentFont) => {
  let font;
  do {
    font = FONTS[Math.floor(Math.random() * FONTS.length)];
  } while (font === currentFont);
  return font;
};

// Obtener una posición aleatoria para el movimiento sutil (entre -2px y 2px)
const getRandomPosition = () => {
  return {
    x: (Math.random() - 0.5) * 2,
    y: (Math.random() - 0.5) * 2,
  };
};

const AnimatedLetter = ({ letter, baseFont, velocity_font, velocity_move }) => {
  const [font, setFont] = useState(baseFont);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let fontTimeout;
    let moveTimeout;

    // Asegurarse de que las velocidades son números válidos y mayores que cero
    const validFontSpeed = Math.max(100, Number(velocity_font) || 800);
    const validMoveSpeed = Math.max(100, Number(velocity_move) || 1800);

    const animateFont = () => {
      setFont((prev) => getRandomFont(prev));
      fontTimeout = setTimeout(animateFont, validFontSpeed);
    };
    const animateMove = () => {
      setPos(getRandomPosition());
      moveTimeout = setTimeout(animateMove, validMoveSpeed);
    };

    // Iniciar las animaciones
    animateFont();
    animateMove();

    // Limpiar timeouts al desmontar o cuando cambian las velocidades
    return () => {
      clearTimeout(fontTimeout);
      clearTimeout(moveTimeout);
    };
  }, [velocity_font, velocity_move, letter, baseFont]); // Añadir dependencias para reiniciar la animación si cambian

  return (
    <span className='text-6xl md:text-9xl'
      style={{
        fontFamily: font,
        display: 'inline-block',
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: 'transform 0.7s cubic-bezier(.77,0,.18,1), font-family 0.7s',
        filter: 'drop-shadow(0 0 8px white)',
        color: 'white',
        fontWeight: 700,
        // fontSize: '5rem',
        letterSpacing: '0.2em',
        textShadow: '0 0 2px #ffffff61, 0 0 5px #ffffff61',
      }}
    >
      {letter}
    </span>
  );
};

const LokiIntro = () => {
  const { text, color, velocity_font, velocity_move } = useStoreEffect();

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-[#121212]" style={{ minHeight: '100vh', overflow: 'hidden' }}>
      {console.log(velocity_font, velocity_move)}
      <TVStatic />

      <EffectControls />
      <div className='relative'>
        {text.split('').map((char, i) => (
          <AnimatedLetter velocity_font={velocity_font} velocity_move={velocity_move} key={i} letter={char} baseFont={FONTS[i % FONTS.length]} />
        ))}
      </div>
      <div
        className="w-screen h-screen absolute pointer-none"
        style={{
          background: `linear-gradient(126deg, transparent 65%, ${color}4D)`, // 4D is ~30% opacity in hex
        }}
      />
    </div>
  );
};

export default LokiIntro;