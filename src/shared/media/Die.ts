import { Game } from '../Game';
import { loadAudio } from '../utils';
import { GameStatus } from '../types';
import die from '../../assets/sound/die.wav'

export class Die {
  ctx: AudioContext;
  element: HTMLMediaElement;
  track: MediaElementAudioSourceNode;
  
  constructor (ctx: AudioContext) {
    this.ctx = ctx;
    this.track = this.ctx.createMediaElementSource(Die.prototype.element)
    this.track.connect(this.ctx.destination);
  }

  static async load () {
    try {
      const audio = await loadAudio(die);

      Die.prototype.element = audio;
    } catch (e) { 
      console.log('e', e)
    }
  }

  play (game: Game, keys: Set<string>) {
    if (game.status === GameStatus.Over) {
      Die.prototype.element.play();      
    }
  }
}