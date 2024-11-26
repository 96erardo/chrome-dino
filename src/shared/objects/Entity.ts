import { State } from '../State';

export interface Entity {
  x: number;
  y: number;
  width: number;
  height: number;
  xSpeed: number;
  ySpeed: number;

  update (dt: number, state: State, keys: Set<string>): Entity;

  draw (ctx: CanvasRenderingContext2D): void
}