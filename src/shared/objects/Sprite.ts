export class Sprite {
  x: number;
  y: number;
  width: number;
  height: number;
  image: HTMLImageElement;

  constructor (x: number, y: number, width: number, height: number, image: HTMLImageElement) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = image;
  }
}