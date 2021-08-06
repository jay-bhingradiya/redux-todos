import {configureStore} from '@reduxjs/toolkit';
import librarySlice from './librarySlice';
import todoSlice from './todoSlice';

const store = configureStore ({
  reducer: {todo: todoSlice.reducer, library: librarySlice.reducer},
});

export default store;
