import { Sprite } from './Sprite';

export class SpriteSheet {
  config: Record<string, SheetConfig>;

  constructor (config: Record<string, SheetConfig>) {
    this.config = config;
  }

  getSprite (state: string): Sprite {
    const config = this.config[state];

    if (!Array.isArray(config.sprites)) {
      return config.sprites; 
    }

    const index = Math.floor(Date.now() / config.interval) % config.sprites.length;
    
    return config.sprites[index];
  }
}

export type SheetConfig = {
  interval?: number;
  sprites: Sprite | Array<Sprite>;
}