import { create } from 'zustand';

export const useStoreEffect = create((set) => ({
  text: 'LOKI',
  velocity_font: 800,
  velocity_move: 1800,
  color: '#00bd7d',
  setText: (text) => set({ text }),
  setVelocityFont: (velocity_font) => set({ velocity_font }),
  setVelocityMove: (velocity_move) => set({ velocity_move }),
  setColor: (color) => set({ color }),
  reset: () => set({ text: 'LOKI', velocity_font: 800, velocity_move: 1800, color: '#00bd7d' }),
}));
