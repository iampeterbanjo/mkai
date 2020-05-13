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
}

type HandleButtonPressCallback = (
  params: HandleButtonPressCallbackParams
) => void;

const sounds = {
  FACE_1: scribble.clip({
    sample: '/assets/sounds/piano48.wav', // new property: sample
    pattern: 'x',
  }),
  FACE_2: scribble.clip({
    sample: '/assets/sounds/piano49.wav', // new property: sample
    pattern: 'x',
  }),
  FACE_3: scribble.clip({
    sample: '/assets/sounds/piano50.wav', // new property: sample
    pattern: 'x',
  }),
  FACE_4: scribble.clip({
    sample: '/assets/sounds/piano51.wav', // new property: sample
    pattern: 'x',
  }),
  LEFT_TOP_SHOULDER: scribble.clip({
    sample: '/assets/sounds/piano52.wav', // new property: sample
    pattern: 'x',
  }),
  RIGHT_TOP_SHOULDER: scribble.clip({
    sample: '/assets/sounds/piano53.wav', // new property: sample
    pattern: 'x',
  }),
  LEFT_BOTTOM_SHOULDER: scribble.clip({
    sample: '/assets/sounds/piano54.wav', // new property: sample
    pattern: 'x',
  }),
  RIGHT_BOTTOM_SHOULDER: scribble.clip({
    sample: '/assets/sounds/piano55.wav', // new property: sample
    pattern: 'x',
  }),
  SELECT_BACK: scribble.clip({
    sample: '/assets/sounds/piano56.wav', // new property: sample
    pattern: 'x',
  }),
  START_FORWARD: scribble.clip({
    sample: '/assets/sounds/piano57.wav', // new property: sample
    pattern: 'x',
  }),
  LEFT_STICK: scribble.clip({
    sample: '/assets/sounds/piano58.wav', // new property: sample
    pattern: 'x',
  }),
  RIGHT_STICK: scribble.clip({
    sample: '/assets/sounds/piano59.wav', // new property: sample
    pattern: 'x',
  }),
  DPAD_UP: scribble.clip({
    sample: '/assets/sounds/piano60.wav', // new property: sample
    pattern: 'x',
  }),
  DPAD_DOWN: scribble.clip({
    sample: '/assets/sounds/piano61.wav', // new property: sample
    pattern: 'x',
  }),
  DPAD_LEFT: scribble.clip({
    sample: '/assets/sounds/piano62.wav', // new property: sample
    pattern: 'x',
  }),
  DPAD_RIGHT: scribble.clip({
    sample: '/assets/sounds/piano63.wav', // new property: sample
    pattern: 'x',
  }),
};

const formatFloat = (n: number, places: number) => {
  var m = Math.pow(10, places);
  return '' + parseFloat('' + Math.round(n * m) / m).toFixed(places);
};

const active = {};

const getAxisName = (sum: number): string => {
  switch (sum) {
    case 8:
      return 'DPAD_DOWN';
    case 6:
      return 'DPAD_UP';
    case 5:
      return 'DPAD_LEFT';
    case 7:
      return 'DPAD_RIGHT';
    default:
      return 'uknown';
  }
};

const handleButtonPress = ({
  up,
  down,
}: {
  up: HandleButtonPressCallback;
  down: HandleButtonPressCallback;
}) => {
  for (const pad of navigator.getGamepads()) {
    if (pad) {
      pad.axes.forEach((axis, index) => {
        // left/right
        if (index === 6 && axis === 0 && active['DPAD_LEFT']) {
          sounds['DPAD_LEFT'].stop();
        }
        if (index === 6 && axis === -1) {
          active['DPAD_LEFT'] = true;
          sounds['DPAD_LEFT'].start();
        }
        if (index === 6 && axis === 0 && active['DPAD_RIGHT']) {
          sounds['DPAD_RIGHT'].stop();
        }
        if (index === 6 && axis === 1) {
          active['DPAD_RIGHT'] = true;
          sounds['DPAD_RIGHT'].start();
        }

        // up/down
        if (index === 7 && axis === 0 && active['DPAD_UP']) {
          sounds['DPAD_UP'].stop();
        }
        if (index === 7 && axis === -1) {
          active['DPAD_UP'] = true;
          sounds['DPAD_UP'].start();
        }
        if (index === 7 && axis === 0 && active['DPAD_DOWN']) {
          sounds['DPAD_DOWN'].stop();
        }
        if (index === 7 && axis === 1) {
          active['DPAD_DOWN'] = true;
          sounds['DPAD_DOWN'].start();
        }
      });
      pad.buttons.forEach((button, index) => {
        const name = getControlName(
          Gamepad.StandardButtons,
          index,
          'EXTRA_BUTTON_'
        );
        if (button.value === 1) console.log(name);
        if (sounds[name]) {
          const params = { button, name, value: button.value };
          if (button.value === 1) {
            active[name] = true;
            down(params);
          }
          if (active[name] && button.value !== 1) {
            active[name] = false;
            up(params);
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
  handleButtonPress({
    up: ({ name, value }) => {
      sounds[name].stop();
    },
    down: ({ name, value }) => {
      sounds[name].start();
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
