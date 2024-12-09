import { Dinosaur } from '../../modules/dinosaur/Dinosaur';
import { Spawner } from '../../modules/obstacles/Spawner';
import { Entity } from './Entity';
import { GameStatus } from '../State';

export class Collision {
  constructor () {}

  detect (dinosaur: Dinosaur, obstacles: Spawner): GameStatus {
    if (obstacles.obstacles.some(o => areRectsColliding(o, dinosaur))) {
      return GameStatus.Ended;
    } else {
      return GameStatus.Running;
    }
  }
}

function areRectsColliding (a: Entity, b: Entity): boolean {
  return (
    (a.x < b.x + b.width) &&
    (a.x + a.width > b.x) &&
    (a.y < b.y + b.height) &&
    (a.y + a.height > b.y)
  );
}