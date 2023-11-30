import { Recepie } from '@/@types/common';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface CartState {
	items: Recepie[];
	isModalOpen: boolean;
	error: null | JSX.Element;
	loading: null | JSX.Element;
}

const initialState: CartState = {
	items: [],
	isModalOpen: false,
	error: null,
	loading: null,
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItemToCart: (state, action: PayloadAction<Recepie>) => {
			const index = state.items.findIndex(({ id }) => id === action.payload.id);
			if (index >= 0) {
				state.items[index].quantity = state.items[index].quantity + 1;
				state.items = [...state.items];
			} else {
				state.items = [...state.items, { ...action.payload, quantity: 1 }];
			}

			state.isModalOpen = true;
		},
		openModal: state => {
			state.isModalOpen = true;
		},
		closeModal: state => {
			state.isModalOpen = false;
		},
	},
});

export const { addItemToCart, openModal, closeModal } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
