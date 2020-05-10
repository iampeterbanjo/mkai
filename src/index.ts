const { scribble, Tone } = window;

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
});
