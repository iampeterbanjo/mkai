import { piano, midi } from './sounds';

const { Tone } = window;

let gamepad_is_connected = false;
const getControlName = (names, index, extraPrefix) => {
  return index < names.length
    ? names[index]
    : extraPrefix + (index - names.length + 1);
};

const active = {};

const STANDARD_BUTTONS = [
  'BUTTON_3',
  'BUTTON_4',
  'BUTTON_1',
  'BUTTON_2',
  'THROW',
  'AMP',
  'LEFT_BOTTOM_SHOULDER',
  'RIGHT_BOTTOM_SHOULDER',
  'SELECT_BACK',
  'START_FORWARD',
  'LEFT_STICK',
  'RIGHT_STICK',
  'DPAD_UP',
  'DPAD_DOWN',
  'DPAD_LEFT',
  'DPAD_RIGHT',
  'HOME',
];

const handleButtonPress = () => {
  for (const pad of navigator.getGamepads()) {
    if (pad) {
      pad.axes.forEach((axis, index) => {
        // left/right
        if (index === 6 && axis === 0 && active['DPAD_LEFT']) {
          piano['DPAD_LEFT'].stop();
        }
        if (index === 6 && axis === -1) {
          console.log('DPAD_LEFT');
          active['DPAD_LEFT'] = true;
          piano['DPAD_LEFT'].start();
        }
        if (index === 6 && axis === 0 && active['DPAD_RIGHT']) {
          piano['DPAD_RIGHT'].stop();
        }
        if (index === 6 && axis === 1) {
          console.log('DPAD_RIGHT');
          active['DPAD_RIGHT'] = true;
          piano['DPAD_RIGHT'].start();
        }

        // up/down
        if (index === 7 && axis === 0 && active['DPAD_UP']) {
          piano['DPAD_UP'].stop();
        }
        if (index === 7 && axis === -1) {
          console.log('DPAD_UP');
          active['DPAD_UP'] = true;
          piano['DPAD_UP'].start();
        }
        if (index === 7 && axis === 0 && active['DPAD_DOWN']) {
          piano['DPAD_DOWN'].stop();
        }
        if (index === 7 && axis === 1) {
          console.log('DPAD_DOWN');
          active['DPAD_DOWN'] = true;
          piano['DPAD_DOWN'].start();
        }
      });
      pad.buttons.forEach((button, index) => {
        const name = getControlName(STANDARD_BUTTONS, index, 'EXTRA_BUTTON_');
        if (midi[name]) {
          if (button.value === 1) {
            console.log(name);
            active[name] = true;
            midi[name].start();
          }
          if (active[name] && button.value !== 1) {
            active[name] = false;
            midi[name].stop();
          }
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
  handleButtonPress();
};

document.addEventListener('DOMContentLoaded', () => {
  console.log(`Let's GO!`);

  Tone.Transport.start();

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
