import { configureStore } from '@reduxjs/toolkit';
import { gameReducer } from './slices/gameSlice';
import { userReducer } from './slices/userSlice';
import { Card } from '../types/game';

export interface UserState {
  id: string | null;
  username: string | null;
  isAuthenticated: boolean;
  stats: {
    gamesPlayed: number;
    gamesWon: number;
    winRate: number;
  };
}

export interface GameState {
  isPlaying: boolean;
  currentPlayer: string | null;
  players: string[];
  currentCard: Card | null;
  direction: 'clockwise' | 'counterclockwise';
}

export interface RootState {
  user: UserState;
  game: GameState;
}

const store = configureStore({
  reducer: {
    game: gameReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export default store; 