import { Recepie } from '@/@types/common';
import axios from '@/utils/axios';
import {
	addRecipesToCart,
	addRecipieToCart,
	findById,
	hideModal,
	showModal,
	updateStateItemQuantity,
} from '@/utils/cart';
import { toast } from 'react-toastify';
import { RequestState } from '@/utils/requestState';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface CartState {
	items: Recepie[];
	isModalOpen: boolean;
	state: RequestState;
}

const initialState: CartState = {
	items: [],
	isModalOpen: false,
	state: RequestState.IDLE,
};

interface UpdateItemQuantityArgs {
	id: number;
	quantity: number;
}

export const makeOrder = createAsyncThunk('post:order', async (recepies: Recepie[]) => {
	await axios.post('/order', { recepies });
});

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
		cleanCart: state => {
			state.items = [];
		},
		openModal: state => showModal(state),
		closeModal: state => hideModal(state),
	},
	extraReducers: builder => {
		builder.addCase(makeOrder.fulfilled, state => {
			toast.success('Pedido realizado com sucesso!');
			state.isModalOpen = false;
			state.state = RequestState.COMPLETED;
			state.items = [];
		}),
			builder.addCase(makeOrder.pending, state => {
				state.state = RequestState.LOADING;
			}),
			builder.addCase(makeOrder.rejected, state => {
				toast.error('Ops! 😵 Ocorreu um erro ao fazer o pedido');
				state.state = RequestState.ERROR;
			});
	},
});

export const { addItemToCart, addItemsToCart, updateItemQuantity, cleanCart, openModal, closeModal } =
	cartSlice.actions;

export const cartReducer = cartSlice.reducer;
