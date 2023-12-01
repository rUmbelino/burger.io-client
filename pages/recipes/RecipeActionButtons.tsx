import { Recepie } from '@/@types/common';
import useRequest from '@/hooks/useRequest';
import { addItemToCart } from '@/slices/CartReducer';
import { AppDispatch } from '@/utils/store';
import { FC, FormEvent } from 'react';
import { toast } from 'react-toastify';
import { ButtonGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { TooltipButton } from '@/components/TooltipButton';

export const RecipeActionButtons: FC<Recepie> = recipe => {
	const dispatch = useDispatch<AppDispatch>();
	const { id } = recipe;

	const { doRequest, errors, loading } = useRequest({
		url: `/ingredient/${id}`,
		method: 'delete',
		onSuccess() {
			toast.success('Ingrediente removido com sucesso!');
		},
	});

	const handleOrderRecipe = (e: FormEvent) => {
		e.stopPropagation();
		dispatch(addItemToCart(recipe));
	};

	if (errors || loading) {
		return (
			<>
				{errors}
				{loading}
			</>
		);
	}

	return (
		<ButtonGroup className="mx-3">
			<TooltipButton btnDescription="Deletar" onConfirm={doRequest}>
				<span>Deseja realmente remover este item de maneira permanente?</span>
			</TooltipButton>
			<span className="btn btn-outline-success" onClick={handleOrderRecipe}>
				Pedir
			</span>
		</ButtonGroup>
	);
};
