import { useDispatch, useSelector } from 'react-redux';
import { AmountSelector } from '../AmountSelector';
import { IconElement } from '../IconElement';
import { AppDispatch, RootState } from '@/utils/store';
import { updateItemQuantity } from '@/slices/CartReducer';
import { RequestState } from '@/utils/requestState';
import { Loading } from '../Loading';

export const CartModalBody = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { items, state } = useSelector(({ cart }: RootState) => cart);

	if (state === RequestState.LOADING) {
		return <Loading />;
	}

	if (items.length === 0) {
		return <p className="my-3">Seu carrinho esta vazio!</p>;
	}

	return items.map(({ id, icon, name, quantity }, index) => (
		<>
			<div key={id} className="d-flex justify-content-between">
				<IconElement icon={icon} description={name} />
				<AmountSelector
					message="Quantidade:"
					minimumAmount={1}
					initialAmount={quantity}
					onUpdateAmount={(quantity: number) => dispatch(updateItemQuantity({ id, quantity }))}
				/>
			</div>

			{items.length !== index + 1 && <hr />}
		</>
	));
};
