import axios from '@/utils/axios';
import { Ingredient, RecepieIngredient } from '@/@types/common';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Error } from '@/components/Error';
import { Loading } from '@/components/Loading';

export interface IngredientState {
	items: RecepieIngredient[];
	error: null | JSX.Element;
	loading: null | JSX.Element;
}

const initialState: IngredientState = {
	items: [],
	error: null,
	loading: null,
};

export const fetchIngredients = createAsyncThunk('fetch:ingredients', async () => {
	const { data } = await axios.get('/ingredient');
	return data;
});

export const deleteIngredient = createAsyncThunk('delete:ingredients', async (id: number) => {
	console.log('OIII');
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
			state.error = null;
			state.loading = null;
			state.items = action.payload;
		}),
			builder.addCase(fetchIngredients.pending, (state, action) => {
				state.loading = <Loading />;
			}),
			builder.addCase(fetchIngredients.rejected, (state, action) => {
				state.error = <Error />;
			}),
			builder.addCase(deleteIngredient.fulfilled, (state, action) => {
				state.error = null;
				state.loading = null;
				state.items = action.payload;
			}),
			builder.addCase(deleteIngredient.pending, (state, action) => {
				state.loading = <Loading />;
			}),
			builder.addCase(deleteIngredient.rejected, (state, action) => {
				state.error = <Error />;
			});
	},
});

export const { setIngredients } = ingredientSlice.actions;

export const ingredientReducer = ingredientSlice.reducer;
