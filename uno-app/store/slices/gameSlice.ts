import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Card } from '@/types/game';

interface GameState {
  isPlaying: boolean;
  currentPlayer: string | null;
  players: string[];
  currentCard: Card | null;
  direction: 'clockwise' | 'counterclockwise';
}

const initialState: GameState = {
  isPlaying: false,
  currentPlayer: null,
  players: [],
  currentCard: null,
  direction: 'clockwise',
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: (state) => {
      state.isPlaying = true;
    },
    endGame: (state) => {
      state.isPlaying = false;
      state.currentPlayer = null;
      state.players = [];
      state.currentCard = null;
    },
    setCurrentPlayer: (state, action: PayloadAction<string>) => {
      state.currentPlayer = action.payload;
    },
    addPlayer: (state, action: PayloadAction<string>) => {
      state.players.push(action.payload);
    },
    setCurrentCard: (state, action: PayloadAction<Card>) => {
      state.currentCard = action.payload;
    },
    changeDirection: (state) => {
      state.direction = state.direction === 'clockwise' ? 'counterclockwise' : 'clockwise';
    },
  },
});

export const { 
  startGame, 
  endGame, 
  setCurrentPlayer, 
  addPlayer, 
  setCurrentCard, 
  changeDirection 
} = gameSlice.actions;
export const gameReducer = gameSlice.reducer; 