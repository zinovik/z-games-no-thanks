"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const z_games_base_game_1 = require("z-games-base-game");
const PLAYERS_MIN = 1; // TODO: 3
const PLAYERS_MAX = 5;
const MIN_NUMBER = 3;
const MAX_NUMBER = 35;
const START_CHIPS_COUNT = 11;
const EXCESS_CARDS_NUMBER = 9;
class NoThanks extends z_games_base_game_1.BaseGame {
    constructor() {
        super(...arguments);
        this.getNewGame = () => {
            const gameData = {
                cards: [],
                cardsLeft: 0,
                currentCard: 0,
                currentCardCost: 0,
                players: [],
            };
            return {
                playersMax: PLAYERS_MAX,
                playersMin: PLAYERS_MIN,
                gameData: JSON.stringify(gameData),
            };
        };
        this.startGame = (gameDataJSON) => {
            const gameData = JSON.parse(gameDataJSON);
            const { cards } = gameData;
            let { players } = gameData;
            players = players.map(player => {
                return Object.assign({}, player, { cards: [], chips: START_CHIPS_COUNT, points: -START_CHIPS_COUNT, place: 0 });
            });
            for (let i = MIN_NUMBER; i <= MAX_NUMBER; i++) {
                cards.push(i);
            }
            for (let i = 0; i < EXCESS_CARDS_NUMBER; i++) {
                cards.splice(Math.floor(Math.random() * cards.length), 1);
            }
            const [currentCard] = cards.splice(Math.floor(Math.random() * cards.length), 1);
            const currentCardCost = 0;
            const cardsLeft = cards.length;
            const nextPlayersIds = [players[Math.floor(Math.random() * players.length)].id];
            return {
                gameData: JSON.stringify(Object.assign({}, gameData, { cards,
                    cardsLeft,
                    currentCard,
                    currentCardCost,
                    players })), nextPlayersIds,
            };
        };
        this.parseGameDataForUser = ({ gameData: gameDataJSON, userId }) => {
            const gameData = JSON.parse(gameDataJSON);
            gameData.players.forEach((player, index) => {
                if (player.id !== userId) {
                    gameData.players[index] = Object.assign({}, gameData.players[index], { chips: 0, points: 0 });
                }
            });
            return JSON.stringify(Object.assign({}, gameData, { cards: [] }));
        };
        this.makeMove = ({ gameData: gameDataJSON, move: moveJSON, userId }) => {
            const gameData = JSON.parse(gameDataJSON);
            const move = JSON.parse(moveJSON);
            const { cards } = gameData;
            let { currentCard, currentCardCost, cardsLeft, players } = gameData;
            const playerNumber = this.getPlayerNumber({ userId, players });
            if (move.takeCard) {
                players[playerNumber].cards.push(currentCard);
                players[playerNumber].cards.sort((a, b) => a - b);
                players[playerNumber].chips += currentCardCost;
                [currentCard] = cards.splice(Math.floor(Math.random() * cards.length), 1);
                cardsLeft = cards.length;
                currentCardCost = 0;
            }
            else {
                if (!players[playerNumber].chips) {
                    throw new Error('You have no chips to pay');
                }
                players[playerNumber].chips--;
                currentCardCost++;
            }
            players[playerNumber].points = this.getPointsForPlayer(players[playerNumber]);
            const nextPlayersIds = [];
            if (cardsLeft) {
                if (playerNumber >= players.length - 1) {
                    nextPlayersIds.push(players[0].id);
                }
                else {
                    nextPlayersIds.push(players[playerNumber + 1].id);
                }
            }
            else {
                players = this.updatePlayerPlaces(players);
            }
            return {
                gameData: JSON.stringify(Object.assign({}, gameData, { cards,
                    players,
                    currentCard,
                    currentCardCost,
                    cardsLeft })),
                nextPlayersIds,
            };
        };
        this.getRules = () => {
            const rules = [];
            rules.push('No Thanks! is a card game for three to five players designed by Thorsten Gimmler. Originally called Geschenkt! (presented (as a gift) in German) and published by Amigo Spiele in 2004, it was translated into English by Z-Man Games.');
            rules.push('There are playing cards numbered 3 to 35 in the game, and nine cards are removed from the deck. Each player receives 11 chips. The first player flips over the top card and either takes it (earning him points according to the value) or passes on the card by paying a chip (placing it on the card). If a player takes a card, he/she also takes all chips that have been put on the card, that player then flips over the next card and decides if he/she want it, and so the game continues until all cards have been taken.');
            rules.push('At the end of the game, cards give points according to their value, but cards in a row only count as a single card with the lowest value (e.g. A run of 30, 29, 28, 27 is only worth 27 points.) Chips are worth one negative point each. The player(s) with the lowest number of points win the game.');
            rules.push('No Thanks! was nominated in 2005 for the German Spiel des Jahres (Game of the Year) award.');
            return rules;
        };
        this.getPointsForPlayer = (player) => {
            let points = 0;
            let lastCard = 0;
            player.cards.forEach(card => {
                if (card !== lastCard + 1) {
                    points += card;
                }
                lastCard = card;
            });
            return points - player.chips;
        };
        this.updatePlayerPlaces = (players) => {
            const playersPlaces = [];
            players.forEach(player => {
                playersPlaces.push({ id: player.id, points: player.points });
            });
            playersPlaces.sort((a, b) => a.points - b.points);
            return players.map(player => {
                let place = 0;
                playersPlaces.forEach((playersPlace, i) => {
                    if (player.id === playersPlace.id) {
                        place = i + 1;
                    }
                });
                return Object.assign({}, player, { place });
            });
        };
        this.getPlayerNumber = ({ userId, players }) => {
            let playerNumber = 0;
            players.forEach((player, index) => {
                if (player.id === userId) {
                    playerNumber = index;
                }
            });
            return playerNumber;
        };
    }
    static get Instance() {
        return this.instance || (this.instance = new this());
    }
}
exports.NoThanks = NoThanks;
