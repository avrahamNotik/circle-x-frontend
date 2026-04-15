import { create } from "zustand";
import clickSound from "../utils/music/button-click-sound.mp3";
import { persist } from "zustand/middleware";

type PlaySound = "click" | "win" | "lost";

interface SoundType {
  volume: number;
  setVolume: (volume: number) => void;
  playSound: (playSound: PlaySound) => void;
}

export const useSoundStore = create<SoundType>()(
  persist(
    (set, get) => {
      const sounds: Record<PlaySound, HTMLAudioElement> = {
        click: new Audio(clickSound),
        win: new Audio(),
        lost: new Audio(),
      } as const;
      return {
        volume: 30,
        setVolume: (volume: number) => set({ volume: volume }),
        playSound: (playSound: PlaySound) => {
          const { volume } = get();
          const audio = sounds[playSound];
          audio.volume = volume / 100;
          audio.currentTime = 0;
          audio.play();
        },
      };
    },
    { name: "sound-storage" },
  ),
);
