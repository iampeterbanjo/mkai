import { generateSound, getVolume } from "./sounds";

let gamepad_is_connected = false;
const getControlName = (names, index, extraPrefix) => {
  return index < names.length
    ? names[index]
    : extraPrefix + (index - names.length + 1);
};

const active = {};
const bank = {};

const STANDARD_BUTTONS = [
  "BUTTON_3",
  "BUTTON_4",
  "BUTTON_1",
  "BUTTON_2",
  "THROW",
  "AMP",
  "LEFT_BOTTOM_SHOULDER",
  "RIGHT_BOTTOM_SHOULDER",
  "SELECT_BACK",
  "START_FORWARD",
  "LEFT_STICK",
  "RIGHT_STICK",
  "DPAD_UP",
  "DPAD_DOWN",
  "DPAD_LEFT",
  "DPAD_RIGHT",
  "HOME",
];

let gapCountdown = -1;
let frame = 0;
let inputBuffer = [] as string[];
const checkInputs = (name: string) => {
  inputBuffer.push(name);
  let buffer = inputBuffer.join(",");
  console.log(buffer);
  if (buffer === "DPAD_DOWN,DPAD_LEFT,BUTTON_1") {
    console.log("BOOM");
    const gapEl = document.getElementById('gap') as HTMLInputElement;
    const gap = parseInt(gapEl.value, 10)
    console.log(gap)
    if(gapEl &&  gap > 0) {
        gapCountdown = gap;
    }
    inputBuffer = [];
    playSound("BOOM", 50);
    setTimeout(() => stopSound("BOOM"), 250)
  }
  if (name === "SELECT_BACK" || inputBuffer.length === 3) {
    inputBuffer = [];
  }
};

const checkGap = () => {
    if(gapCountdown >= 0) {
        gapCountdown =- 1;
    }
    if(gapCountdown === 0) {
        playSound('GAP', 70);
        setTimeout(() => stopSound("GAP"), 250)

        console.log('GAP!')
    }
}

const playSound = (name: string, index: number, type?: string) => {
  if (frame % 15 === 0) {
    stopSound(name);
  }
  bank[name] = bank[name] || generateSound(index, type);
  bank[name].volume = getVolume();
  bank[name].play();
};

const stopSound = (name: string) => {
  const sound = bank[name];
  if (!sound) {
    return;
  }
  //   if (frame % 4 === 0) {
  checkInputs(name);
  //   }
  bank[name].stop();
};

const handleAxis = (up: string, down: string) => (
  axis: number,
  value: number
) => {
  if (axis === 0) {
    stopSound(up);
    stopSound(down);
  }
  if (axis === -1) {
    playSound(up, value, "sine");
  }
  if (axis === 1) {
    playSound(down, value, "sine");
  }
};

const handleY = handleAxis("DPAD_UP", "DPAD_DOWN");
const handleX = handleAxis("DPAD_LEFT", "DPAD_RIGHT");

const handleButtonPress = () => {
  for (const pad of navigator.getGamepads()) {
    if (pad) {
      pad.axes.forEach((axis, index) => {
        const value = Math.abs(index + axis);
        // left/right
        if (index === 6) {
          return handleX(axis, value);
        }

        // up/down
        if (index === 7) {
          handleY(axis, value);
        }
      });
      pad.buttons.forEach((button, index) => {
        const name = getControlName(STANDARD_BUTTONS, index, "EXTRA_BUTTON_");

        if (button.value === 1) {
          active[name] = true;
          playSound(name, index);
        }
        if (active[name] && button.value !== 1) {
          active[name] = false;
          stopSound(name);
        }
      });
    }
  }
};

const runAnimation = () => {
  if (!gamepad_is_connected) {
    return;
  }

  frame = frame === 60 ? 0 : frame + 1;
  window.requestAnimationFrame(runAnimation);
  handleButtonPress();
  checkGap();
};

document.addEventListener("DOMContentLoaded", () => {
  console.log(`Let's GO!`);

  window.addEventListener("gamepadconnected", (event) => {
    console.log("Gamepad connected");
    gamepad_is_connected = true;

    window.requestAnimationFrame(runAnimation);
  });

  window.addEventListener("gamepaddisconnected", (event) => {
    console.log("Gamepad disconnected:");

    gamepad_is_connected = false;
  });
});
