import { useState } from 'react';
import { useStoreEffect } from '../store/StoreEffect.js';

const EffectControls = () => {
  const {
    setText, text,
    setVelocityFont, velocity_font,
    setVelocityMove, velocity_move,
    setColor, color,
    reset
  } = useStoreEffect();

  const [isOpen, setIsOpen] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'text':
        setText(value);
        break;
      case 'velocity_font':
        setVelocityFont(Number(value));
        break;
      case 'velocity_move':
        setVelocityMove(Number(value));
        break;
      case 'color':
        setColor(value);
        break;
      default:
        break;
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="cursor-pointer fixed top-4 right-4 text-white p-2 rounded-full shadow-lg z-50 transition-all hover:scale-110"
        aria-label="Abrir controles"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            fill="#fff"
            d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.06-.94l2.03-1.58a.5.5 0 00.12-.64l-1.92-3.32a.5.5 0 00-.61-.23l-2.39.96a7.03 7.03 0 00-1.62-.94l-.36-2.53A.5.5 0 0014 2h-4a.5.5 0 00-.5.42l-.36 2.53c-.59.23-1.14.54-1.62.94l-2.39-.96a.5.5 0 00-.61.23l-1.92 3.32a.5.5 0 00.12.64l2.03 1.58c-.04.3-.06.61-.06.94s.02.64.06.94l-2.03 1.58a.5.5 0 00-.12.64l1.92 3.32a.5.5 0 00.61.23l2.39-.96c.48.4 1.03.71 1.62.94l.36 2.53A.5.5 0 0010 22h4a.5.5 0 00.5-.42l.36-2.53c.59-.23 1.14-.54 1.62-.94l2.39.96a.5.5 0 00.61-.23l1.92-3.32a.5.5 0 00-.12-.64l-2.03-1.58zM12 15a3 3 0 110-6 3 3 0 010 6z"
          />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed top-4 right-4 bg-slate-800/60 backdrop-blur-md p-6 rounded-lg shadow-xl z-50 text-white w-72">
      <div className="flex justify-between items-center mb-4 border-b border-gray-200/20 pb-2">
        <h2 className="text-xl font-semibold">Effect Controls</h2>
        <button onClick={() => setIsOpen(false)} className="cursor-pointer text-xl text-gray-400 hover:text-white hover:scale-105">&times;</button>
      </div>
      <div className="space-y-4">
        <div>
          <label htmlFor="text" className="block text-sm font-medium text-gray-300">Text:</label>
          <input
            type="text"
            id="text"
            name="text" // Añadir name
            value={text}
            onChange={handleChange} // Usar handleChange
            className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm p-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <div>
          <label htmlFor="velocity_font" className="block text-sm font-medium text-gray-300">
            Font Velocity (ms): {velocity_font}
          </label>
          <input
            type="range"
            id="velocity_font"
            name="velocity_font" // Añadir name
            min="100"
            max="2000"
            step="50"
            value={velocity_font}
            onChange={handleChange} // Usar handleChange
            className="mt-1 block w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
        </div>
        <div>
          <label htmlFor="velocity_move" className="block text-sm font-medium text-gray-300">
            Move Velocity (ms): {velocity_move}
          </label>
          <input
            type="range"
            id="velocity_move"
            name="velocity_move" // Añadir name
            min="100"
            max="2000"
            step="50"
            value={velocity_move}
            onChange={handleChange} // Usar handleChange
            className="mt-1 block w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
        </div>
        <div>
          <label htmlFor="color" className="block text-sm font-medium text-gray-300">Effect Color:</label>
          <input
            type="color"
            id="color"
            name="color" // Añadir name
            value={color}
            onChange={handleChange} // Usar handleChange
            className="mt-1 block w-full h-10 bg-gray-700 border-gray-600 rounded-md shadow-sm p-1 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <button
          onClick={reset}
          className="cursor-pointer w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-md transition duration-150"
        >
          Reset Controls
        </button>
      </div>
    </div>
  );
};

export default EffectControls;
