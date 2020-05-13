import { Gamepad } from './gamepad';

const { scribble, Tone } = window;

let gamepad_is_connected = false;
const getControlName = (names, index, extraPrefix) => {
  return index < names.length
    ? names[index]
    : extraPrefix + (index - names.length + 1);
};

interface HandleButtonPressCallbackParams {
  name: string;
  value: number;
  button: GamepadButton;
  buttons: readonly GamepadButton[];
}

type HandleButtonPressCallback = (
  params: HandleButtonPressCallbackParams
) => void;

const kick = scribble.clip({
  sample: 'https://scribbletune.com/sounds/kick.wav', // new property: sample
  pattern: 'x',
});

const active = {};

const handleButtonPress = ({
  up,
  down,
}: {
  up: HandleButtonPressCallback;
  down: HandleButtonPressCallback;
}) => {
  for (const pad of navigator.getGamepads()) {
    if (pad) {
      const buttons = pad.buttons;
      buttons.forEach((button, index) => {
        const name = getControlName(
          Gamepad.StandardButtons,
          index,
          'EXTRA_BUTTON_'
        );
        const params = { button, name, value: button.value, buttons };
        if (button.value === 1) {
          active[name] = true;
          down(params);
        }
        if (active[name] && button.value !== 1) {
          active[name] = false;
          up(params);
        }
      });
    }
  }
};

const runAnimation = () => {
  if (!gamepad_is_connected) {
    return;
  }

  window.requestAnimationFrame(runAnimation);
  handleButtonPress({
    up: ({ name, value }) => {
      kick.stop();
    },
    down: ({ name, value }) => {
      kick.start();
    },
  });
};

document.addEventListener('DOMContentLoaded', () => {
  console.log(`Let's GO!`);

  Tone.Transport.start();

  const playButton = document.querySelector('.btn-play');
  if (playButton) {
    playButton.addEventListener('click', () => {
      scribble
        .clip({
          synth: 'PolySynth', // new property: synth
          pattern: '[xx]',
          notes: 'C4 D4 C4 D#4 C4 D4 C4 Bb3',
        })
        .start();
      console.log('click');
    });
  }

  window.addEventListener('gamepadconnected', (event) => {
    console.log('Gamepad connected');
    gamepad_is_connected = true;

    window.requestAnimationFrame(runAnimation);
  });

  window.addEventListener('gamepaddisconnected', (event) => {
    console.log('Gamepad disconnected:');

    gamepad_is_connected = false;
  });
});
