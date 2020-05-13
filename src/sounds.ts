import Pizzicato from 'pizzicato';

const { scribble } = window;

export const piano = {
  BUTTON_3: scribble.clip({
    sample: './assets/sounds/piano48.wav',
    pattern: '[x]',
  }),
  BUTTON_4: scribble.clip({
    sample: './assets/sounds/piano49.wav',
    pattern: '[x]',
  }),
  BUTTON_1: scribble.clip({
    sample: './assets/sounds/piano50.wav',
    pattern: '[x]',
  }),
  BUTTON_2: scribble.clip({
    sample: './assets/sounds/piano51.wav',
    pattern: '[x]',
  }),
  THROW: scribble.clip({
    sample: './assets/sounds/piano52.wav',
    pattern: '[x]',
  }),
  AMP: scribble.clip({
    sample: './assets/sounds/piano53.wav',
    pattern: '[x]',
  }),
  LEFT_BOTTOM_SHOULDER: scribble.clip({
    sample: './assets/sounds/piano54.wav',
    pattern: '[x]',
  }),
  RIGHT_BOTTOM_SHOULDER: scribble.clip({
    sample: './assets/sounds/piano55.wav',
    pattern: '[x]',
  }),
  SELECT_BACK: scribble.clip({
    sample: './assets/sounds/piano56.wav',
    pattern: '[x]',
  }),
  START_FORWARD: scribble.clip({
    sample: './assets/sounds/piano57.wav',
    pattern: '[x]',
  }),
  LEFT_STICK: scribble.clip({
    sample: './assets/sounds/piano58.wav',
    pattern: '[x]',
  }),
  RIGHT_STICK: scribble.clip({
    sample: './assets/sounds/piano59.wav',
    pattern: '[x]',
  }),
  DPAD_UP: scribble.clip({
    sample: './assets/sounds/piano60.wav',
    pattern: '[x]',
  }),
  DPAD_DOWN: scribble.clip({
    sample: './assets/sounds/piano61.wav',
    pattern: '[x]',
  }),
  DPAD_LEFT: scribble.clip({
    sample: './assets/sounds/piano62.wav',
    pattern: '[x]',
  }),
  DPAD_RIGHT: scribble.clip({
    sample: './assets/sounds/piano63.wav',
    pattern: '[x]',
  }),
};

export const generateSound = (index: number, type: string = 'triangle') => {
  const factor = index === 0 ? 1 : index + 1;
  return new Pizzicato.Sound({
    source: 'wave',
    options: {
      frequency: 261.626 * (factor / 4),
      type,
      volume: 0.7,
      attack: 0.1,
    },
  });
};

export const midi = {
  BUTTON_3: scribble.clip({
    synth: 'PluckSynth',
    notes: 'a4',
    pattern: '[[x]]',
  }),
  BUTTON_4: scribble.clip({
    synth: 'PluckSynth',
    notes: 'a3',
    pattern: '[x]',
  }),
  BUTTON_1: scribble.clip({
    synth: 'PluckSynth',
    notes: 'c0',
    pattern: '[x]',
  }),
  BUTTON_2: scribble.clip({
    synth: 'PluckSynth',
    notes: 'c1',
    pattern: '[x]',
  }),
  THROW: scribble.clip({
    synth: 'PluckSynth',
    notes: 'c2',
    pattern: '[x]',
  }),
  AMP: scribble.clip({
    synth: 'PluckSynth',
    notes: 'c3',
    pattern: '[x]',
  }),
  LEFT_BOTTOM_SHOULDER: scribble.clip({
    synth: 'PluckSynth',
    notes: 'c4',
    pattern: '[x]',
  }),
  RIGHT_BOTTOM_SHOULDER: scribble.clip({
    synth: 'PluckSynth',
    notes: 'c5',
    pattern: '[x]',
  }),
  SELECT_BACK: scribble.clip({
    synth: 'PluckSynth',
    notes: 'c6',
    pattern: '[x]',
  }),
  START_FORWARD: scribble.clip({
    synth: 'PluckSynth',
    notes: 'c7',
    pattern: '[x]',
  }),
  LEFT_STICK: scribble.clip({
    synth: 'PluckSynth',
    notes: 'c8',
    pattern: '[x]',
  }),
  RIGHT_STICK: scribble.clip({
    synth: 'PluckSynth',
    notes: 'c9',
    pattern: '[x]',
  }),
  DPAD_UP: scribble.clip({
    synth: 'PluckSynth',
    notes: 'c4',
    pattern: '[x]',
  }),
  DPAD_DOWN: scribble.clip({
    synth: 'PluckSynth',
    notes: 'd4',
    pattern: '[x]',
  }),
  DPAD_LEFT: scribble.clip({
    synth: 'PluckSynth',
    notes: 'e4',
    pattern: '[x]',
  }),
  DPAD_RIGHT: scribble.clip({
    synth: 'PluckSynth',
    notes: 'f4',
    pattern: '[x]',
  }),
};
