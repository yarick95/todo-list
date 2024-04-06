import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { todosReducer } from './todosSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const todosPersistConfig = {
  key: 'root',
  storage: storage,
};

const rootReducer = combineReducers({
  todos: persistReducer(todosPersistConfig, todosReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
