import { IBaseGameData } from 'z-games-base-game';

import { INoThanksPlayer } from './';

export interface INoThanksData extends IBaseGameData {
  cards: number[];
  currentCard: number;
  currentCardCost: number;
  cardsLeft: number;
  players: INoThanksPlayer[];
}
