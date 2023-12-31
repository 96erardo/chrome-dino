import { Player } from '../modules/player/Player';
import { Cactus } from '../modules/obstacles/Cactus';
import pressStart2P from '../assets/font/pressstart2p-regular.ttf'

export const CANVAS_WIDTH = 1000;

export const CANVAS_HEIGHT = 480;

export const GAME_BASELINE_THICKNESS = 4;

export const GAME_BASELINE_POSITION = CANVAS_HEIGHT - 34;

export const GAME_BASELINE_UPPER_LIMIT = GAME_BASELINE_POSITION + 20;

export const font = new FontFace('PressStart2P', `url(${pressStart2P})`, {
  style: 'normal',
  weight: '400',
})

export async function loadImage (url: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const img = elt('img', { src: url });

    img.addEventListener('load', () => {
      resolve(img as HTMLImageElement);
    }, { once: true })
  })
}

export function elt(name: string, attrs: Record<string, string>) {
  let dom = document.createElement(name);

  for (let attr of Object.keys(attrs)) {
    dom.setAttribute(attr, attrs[attr]);
  }

  return dom;
}

export function rect_rect_collision (A: Player, B: Cactus) {
  if (
    (A.x < (B.x + B.width)) &&
    (A.x + A.width > B.x) &&
    (A.y < B.y + B.height) &&
    (A.y + A.height > B.y)
  ) {
    return pixel_perfect_collision(A, B);
  } else {
    return false;
  }
}

export function pixel_perfect_collision (player: Player, obstacle: Cactus) {
  const x1 = Math.max(player.x, obstacle.x);
  const x2 = Math.min((player.x + player.width), (obstacle.x + obstacle.width));
  
  const y1 = Math.max(player.y, obstacle.y);
  const y2 = Math.min((player.y + player.height), (obstacle.y + obstacle.height));

  for (let x = x1; x <= x2; x++) {
    for (let y = y1; y <= y2; y++) {
      const a = player.sprite[0].isPointFilled(
        Math.ceil(x - player.x), 
        Math.ceil(y - player.y)
      );

      const b = obstacle.sprite.isPointFilled(
        Math.ceil(x - obstacle.x), 
        Math.ceil(y - obstacle.y)
      );

      if (a && b) {
        return true;
      }
    }
  }

  return false;
}