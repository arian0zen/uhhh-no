export type CardColor = 'red' | 'blue' | 'green' | 'yellow' | 'wild';
export type CardType = 'number' | 'skip' | 'reverse' | 'draw_two' | 'wild' | 'wild_draw_four';

export interface Card {
  id: string;
  color: CardColor;
  type: CardType;
  value?: number; // 0-9 for number cards
}

export interface Player {
  id: string;
  username: string;
  cards: Card[];
  isCurrentPlayer: boolean;
}

export interface GameState {
  id: string;
  players: Player[];
  currentCard: Card;
  direction: 'clockwise' | 'counterclockwise';
  status: 'waiting' | 'playing' | 'finished';
  winner?: string;
} 