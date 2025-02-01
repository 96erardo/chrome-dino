import { State } from './State';
import { loadAudio } from './utils';
import jump from '../assets/sound/jump.wav';
import die from '../assets/sound/die.wav';
import point from '../assets/sound/point.wav';
import { GAME_FLOOR } from './constants';
import { DinoStatus } from '../modules/dinosaur/Dinosaur';

export class MediaPlayer {
  before: Array<SoundConfig>
  after: Array<SoundConfig>

  static async load () {
    const [jumpAudio, dieAudio, pointAudio] = await Promise.all([
      loadAudio(jump),
      loadAudio(die),
      loadAudio(point)
    ]);
    
    MediaPlayer.prototype.before = [
      {
        audio: jumpAudio,
        play: (audio: HTMLMediaElement, state: State, keys: Set<string>) => {
          if (
            (state.dinosaur.y + state.dinosaur.height === GAME_FLOOR) &&
            keys.has('ArrowUp')
          ) {
            audio.play()
          }
        }
      }
    ]

    MediaPlayer.prototype.after = [
      {
        audio: dieAudio,
        play: (audio: HTMLMediaElement, state: State, keys: Set<string>) => {
          if (state.dinosaur.status === DinoStatus.Dead) {
            audio.play()
          }
        }
      },
      {
        audio: pointAudio,
        play: (audio: HTMLMediaElement, state: State, keys: Set<string>) => {
          const points = Math.floor(state.score.points);

          if (points !== 0 && points % 100 === 0) {
            audio.play()
          }
        }
      },
    ]
  }

  playBefore (state: State, keys: Set<string>) {
    this.before.forEach(({ audio, play }) => {
      play(audio, state, keys);
    })
  }

  playAfter (state: State, keys: Set<string>) {
    this.after.forEach(({ audio, play }) => {
      play(audio, state, keys);
    })
  }
}

type SoundConfig = {
  audio: HTMLMediaElement,
  play: (audio: HTMLMediaElement, state: State, keys: Set<string>) => void
}