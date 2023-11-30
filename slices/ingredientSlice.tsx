import axios from '@/utils/axios';
import { RecepieIngredient } from '@/@types/common';
import { RequestState } from '@/utils/requestState';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface IngredientState {
	state: RequestState;
	items: RecepieIngredient[];
}

const initialState: IngredientState = {
	items: [],
	state: RequestState.IDLE,
};

export const fetchIngredients = createAsyncThunk('fetch:ingredients', async () => {
	const { data } = await axios.get('/ingredient');
	return data;
});

export const deleteIngredient = createAsyncThunk('delete:ingredients', async (id: number) => {
	await axios.get(`/ingredient/${id}`);
	const { data } = await axios.get('/ingredient');
	return data;
});

export const ingredientSlice = createSlice({
	name: 'ingredient',
	initialState,
	reducers: {
		setIngredients: (state, action: PayloadAction<RecepieIngredient[]>) => {
			state.items = action.payload;
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchIngredients.fulfilled, (state, action) => {
			state.state = RequestState.COMPLETED;
			state.items = action.payload;
		}),
			builder.addCase(fetchIngredients.pending, state => {
				state.state = RequestState.LOADING;
			}),
			builder.addCase(fetchIngredients.rejected, state => {
				state.state = RequestState.ERROR;
			}),
			builder.addCase(deleteIngredient.fulfilled, (state, action) => {
				state.state = RequestState.COMPLETED;
				state.items = action.payload;
			}),
			builder.addCase(deleteIngredient.pending, state => {
				state.state = RequestState.LOADING;
			}),
			builder.addCase(deleteIngredient.rejected, state => {
				state.state = RequestState.ERROR;
			});
	},
});

export const { setIngredients } = ingredientSlice.actions;

export const ingredientReducer = ingredientSlice.reducer;
