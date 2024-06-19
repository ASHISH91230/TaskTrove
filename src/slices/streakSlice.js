import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getStreakDetails } from '../../../services/operations/StreakBadgesAPI';

export const fetchStreak = createAsyncThunk('streak/fetchStreak', async (userId, { getState }) => {
  const { auth: { token } } = getState();
  const result = await getStreakDetails(userId, token);
  return result;
});

const streakSlice = createSlice({
  name: 'streak',
  initialState: {
    currentStreak: 0,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStreak.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStreak.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentStreak = action.payload.currentStreak;
      })
      .addCase(fetchStreak.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default streakSlice.reducer;
