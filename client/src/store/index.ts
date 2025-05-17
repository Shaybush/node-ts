import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userReducer } from './slices/user';

const rootReducer = combineReducers({
  user: userReducer, // slice 1
  // basket: basketReducer, // slice 2 
});

export function createStore(preloadedState?: State) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export type State = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore['dispatch'];
