import { BaseGame, BaseGameData, BaseGameMove, BaseGamePlayer } from 'z-games-base-game';
export interface NoThanksData extends BaseGameData {
    cards: number[];
    currentCard: number;
    currentCardCost: number;
    cardsLeft: number;
    players: NoThanksPlayer[];
}
export interface NoThanksPlayer extends BaseGamePlayer {
    cards: number[];
    chips: number;
    points: number;
}
export interface NoThanksMove extends BaseGameMove {
    takeCard: boolean;
}
export declare class NoThanks extends BaseGame {
    private static instance;
    static readonly Instance: NoThanks;
    getNewGame: () => {
        playersMax: number;
        playersMin: number;
        gameData: string;
    };
    startGame: (gameDataJSON: string) => {
        gameData: string;
        nextPlayersIds: string[];
    };
    parseGameDataForUser: ({ gameData: gameDataJSON, userId }: {
        gameData: string;
        userId: string;
    }) => string;
    makeMove: ({ gameData: gameDataJSON, move: moveJSON, userId }: {
        gameData: string;
        move: string;
        userId: string;
    }) => {
        gameData: string;
        nextPlayersIds: string[];
    };
    getRules: () => string[];
    private getPointsForPlayer;
    private updatePlayerPlaces;
    private getPlayerNumber;
}
