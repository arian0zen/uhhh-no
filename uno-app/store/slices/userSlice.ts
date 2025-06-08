import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../store';

const initialState: UserState = {
  id: null,
  username: null,
  isAuthenticated: false,
  stats: {
    gamesPlayed: 0,
    gamesWon: 0,
    winRate: 0,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ id: string; username: string }>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.id = null;
      state.username = null;
      state.isAuthenticated = false;
    },
    updateStats: (state, action: PayloadAction<{ won: boolean }>) => {
      state.stats.gamesPlayed += 1;
      if (action.payload.won) {
        state.stats.gamesWon += 1;
      }
      state.stats.winRate = (state.stats.gamesWon / state.stats.gamesPlayed) * 100;
    },
  },
});

export const { setUser, logout, updateStats } = userSlice.actions;
export const userReducer = userSlice.reducer; 