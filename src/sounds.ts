import Pizzicato from 'pizzicato';

export const generateSound = (index: number, type: string = 'triangle') => {
  const factor = index === 0 ? 1 : index + 1;
  return new Pizzicato.Sound({
    source: 'wave',
    options: {
      frequency: 261.626 * (factor / 4),
      type,
      volume: 0.7,
      attack: 0.1,
      release: 0.1
    },
  });
};
