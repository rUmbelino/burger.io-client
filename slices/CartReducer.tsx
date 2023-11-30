import { Recepie } from '@/@types/common';
import {
	addRecipesToCart,
	addRecipieToCart,
	findById,
	hideModal,
	showModal,
	updateStateItemQuantity,
} from '@/utils/cart';
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

interface UpdateItemQuantityArgs {
	id: number;
	quantity: number;
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItemToCart: (state, action: PayloadAction<Recepie>) => {
			addRecipieToCart(state, action.payload);
			showModal(state);
		},
		addItemsToCart: (state, action: PayloadAction<Recepie[]>) => {
			addRecipesToCart(state, action.payload);
			showModal(state);
		},
		updateItemQuantity: (state, action: PayloadAction<UpdateItemQuantityArgs>) => {
			const { quantity } = action.payload;
			const index = findById(action.payload.id, state.items);

			updateStateItemQuantity({ index, state, quantity });
		},
		openModal: state => showModal(state),
		closeModal: state => hideModal(state),
	},
});

export const { addItemToCart, addItemsToCart, updateItemQuantity, openModal, closeModal } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
