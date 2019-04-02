import { IBaseGamePlayer } from 'z-games-base-game';

export interface INoThanksPlayer extends IBaseGamePlayer {
  cards: number[];
  chips: number;
  points: number;
}
