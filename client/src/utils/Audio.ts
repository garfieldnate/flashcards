import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';
import { PlaybackSource } from 'expo-av/build/AV';

export const loadAudio = async (src: PlaybackSource): Promise<Sound> => {
  const sound = new Audio.Sound();
  await sound.loadAsync(src);
  return sound;
};
