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

const handleButtonPress = (
  callback: (params: HandleButtonPressCallbackParams) => void
) => {
  for (const pad of navigator.getGamepads()) {
    if (pad) {
      const buttons = pad.buttons;
      buttons.forEach((button, index) => {
        const name = getControlName(
          Gamepad.StandardButtons,
          index,
          'EXTRA_BUTTON_'
        );
        if (button.pressed) {
          callback({ button, name, value: button.value, buttons });
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
  handleButtonPress(({ name, value }) => console.log(name, value));
};

document.addEventListener('DOMContentLoaded', () => {
  console.log(`Let's GO!`);

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
      Tone.Transport.start();
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
