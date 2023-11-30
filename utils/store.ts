import { cartReducer } from '@/slices/CartSlice';
import { ingredientReducer } from '@/slices/ingredientSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
	reducer: {
		cart: cartReducer,
		ingredient: ingredientReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
