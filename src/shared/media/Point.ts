import { Game } from '../Game';
import { loadAudio } from '../utils';
import { Score } from '../objects/Score';
import point from '../../assets/sound/point.wav';

export class Point {
  ctx: AudioContext;
  element: HTMLMediaElement;
  track: MediaElementAudioSourceNode;
  
  constructor (ctx: AudioContext) {
    this.ctx = ctx;
    this.track = this.ctx.createMediaElementSource(Point.prototype.element)
    this.track.connect(this.ctx.destination);
  }

  static async load () {
    try {
      const audio = await loadAudio(point);

      Point.prototype.element = audio;
    } catch (e) { 
      console.log('e', e)
    }
  }

  play (game: Game, keys: Set<string>) {
    const points = Math.floor((game.score as Score).points)
    
    if (points !== 0 && points % 100 === 0) {
      Point.prototype.element.play();      
    }
  }
}