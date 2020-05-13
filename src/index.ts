import { piano, midi, generateSound } from './sounds';

const { Tone } = window;

let gamepad_is_connected = false;
const getControlName = (names, index, extraPrefix) => {
  return index < names.length
    ? names[index]
    : extraPrefix + (index - names.length + 1);
};

const active = {};
const bank = {};

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

const playSound = (name: string, index: number, type?: string) => {
  bank[name] = bank[name] || generateSound(index, type);
  bank[name].play();
};

const stopSound = (name: string) => {
  bank[name].stop();
};

const handleButtonPress = () => {
  for (const pad of navigator.getGamepads()) {
    if (pad) {
      pad.axes.forEach((axis, index) => {
        // left/right
        if (index === 6 && axis === 0 && active['DPAD_LEFT']) {
          stopSound('DPAD_LEFT');
        }
        if (index === 6 && axis === -1) {
          console.log('DPAD_LEFT');
          active['DPAD_LEFT'] = true;
          playSound('DPAD_LEFT', Math.abs(index + axis), 'sine');
        }
        if (index === 6 && axis === 0 && active['DPAD_RIGHT']) {
          stopSound('DPAD_RIGHT');
        }
        if (index === 6 && axis === 1) {
          console.log('DPAD_RIGHT');
          active['DPAD_RIGHT'] = true;
          playSound('DPAD_RIGHT', Math.abs(index + axis), 'sine');
        }

        // up/down
        if (index === 7 && axis === 0 && active['DPAD_UP']) {
          active['DPAD_UP'] = false;
          stopSound('DPAD_UP');
        }
        if (index === 7 && axis === -1) {
          console.log('DPAD_UP');
          active['DPAD_UP'] = true;
          playSound('DPAD_UP', Math.abs(index + axis), 'sine');
        }
        if (index === 7 && axis === 0 && active['DPAD_DOWN']) {
          active['DPAD_DOWN'] = false;
          stopSound('DPAD_DOWN');
        }
        if (index === 7 && axis === 1) {
          console.log('DPAD_DOWN');
          active['DPAD_DOWN'] = true;
          playSound('DPAD_DOWN', Math.abs(index + axis), 'sine');
        }
      });
      pad.buttons.forEach((button, index) => {
        const name = getControlName(STANDARD_BUTTONS, index, 'EXTRA_BUTTON_');
        if (midi[name]) {
          if (button.value === 1) {
            console.log(name, index);
            active[name] = true;
            playSound(name, index);
          }
          if (active[name] && button.value !== 1) {
            active[name] = false;
            stopSound(name);
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
