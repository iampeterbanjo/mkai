import Pizzicato from 'pizzicato';

export const getVolume = (): number => {
    const volumeEl = document.getElementById('volume') as HTMLInputElement;

    return parseFloat(volumeEl.value)
}

export const generateSound = (index: number, type: string = 'triangle') => {
  const factor = index === 0 ? 1 : index + 1;
  const volume = getVolume();
  
  return new Pizzicato.Sound({
    source: 'wave',
    options: {
      frequency: 261.626 * (factor / 4),
      type,
      volume,
      attack: 0.1,
      release: 0.1
    },
  });
};
