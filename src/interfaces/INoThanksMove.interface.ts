import { IBaseGameMove } from 'z-games-base-game';

export interface INoThanksMove extends IBaseGameMove {
  takeCard: boolean;
}
