import { Entity } from './Entity';
import { State } from '../State';

export interface Obstacle extends Entity {

  canAppear (state: State): boolean;

  update (dt: number, state: State, keys: Set<string>): Obstacle
}