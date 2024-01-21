import { ACT_FLOOR_POSITION, loadAudio } from '../utils';
import { Game } from '../Game';
import jump from '../../assets/sound/jump.wav'

export class Jump {
  ctx: AudioContext;
  element: HTMLMediaElement;
  track: MediaElementAudioSourceNode;
  
  constructor (ctx: AudioContext) {
    this.ctx = ctx;
    this.track = this.ctx.createMediaElementSource(Jump.prototype.element)
    this.track.connect(this.ctx.destination);
  }

  static async load () {
    const audio = await loadAudio(jump);

    Jump.prototype.element = audio;
  }

  play (game: Game, keys: Set<string>) {
    if (
      (game.player.y + game.player.height) === ACT_FLOOR_POSITION &&
      keys.has('ArrowUp')
    ) {
      Jump.prototype.element.play();      
    }
  }
}