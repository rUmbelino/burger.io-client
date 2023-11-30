import { Recepie } from '@/@types/common';
import { CartState } from '@/slices/CartReducer';

interface UpdateStateItemQuantityArgs {
	index: number;
	quantity: number;
	state: CartState;
}

export const updateStateItemQuantity = ({ index, state, quantity }: UpdateStateItemQuantityArgs): CartState => {
	state.items[index].quantity = quantity;
	return state;
};

export const findById = (id: number, items: Recepie[]): number => {
	return items.findIndex(item => item.id === id);
};

export const addRecipieToCart = (state: CartState, recepie: Recepie) => {
	const index = findById(recepie.id, state.items);

	if (index >= 0) {
		const step = recepie.quantity || 1;
		const quantity = state.items[index].quantity + step;
		updateStateItemQuantity({ index, state, quantity });
	} else {
		const quantity = recepie.quantity || 1;
		state.items = [...state.items, { ...recepie, quantity }];
	}
};

export const addRecipesToCart = (state: CartState, recipes: Recepie[]) => {
	recipes.forEach(recepie => {
		addRecipieToCart(state, recepie);
	});
};

export const hideModal = (state: CartState) => {
	state.isModalOpen = false;
};

export const showModal = (state: CartState) => {
	state.isModalOpen = true;
};
