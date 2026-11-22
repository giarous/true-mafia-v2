import Sound from 'react-native-sound';

/** Audio names resolve to Android raw resources or the iOS application bundle. */
export function loadSound(filename) {
  return new Sound(filename, Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.warn(`Could not load audio: ${filename}`, error);
    }
  });
}

export function playSound(sound) {
  sound.play(success => {
    if (!success) {
      console.warn('Audio playback did not complete.');
    }
  });
}
