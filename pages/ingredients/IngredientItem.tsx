import { Ingredient } from '@/@types/common';
import { AmountSelector } from '@/components/AmountSelector';
import { IconElement } from '@/components/IconElement';
import { TooltipButton } from '@/components/TooltipButton';
import useRequest from '@/hooks/useRequest';
import { deleteIngredient } from '@/slices/ingredientSlice';
import { AppDispatch } from '@/utils/store';
import { useState } from 'react';
import { Button, ButtonGroup, ListGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

export const IngredientItem: React.FC<Ingredient> = ({ id, icon, name, storedAmount }) => {
	const dispatch = useDispatch<AppDispatch>();
	const [updatedAmount, setUpdatedAmount] = useState(storedAmount);

	const { doRequest, errors, loading } = useRequest({
		url: `/ingredient/${id}`,
		method: 'put',
		body: {
			id,
			icon,
			name,
			storedAmount,
		},
		onSuccess: () => {
			toast.success(`${updatedAmount}x ${icon} - Estoque atualizado!`);
		},
	});

	if (errors || loading) {
		return (
			<ListGroup.Item>
				{errors}
				{loading}
			</ListGroup.Item>
		);
	}

	return (
		<ListGroup.Item>
			<div className="d-flex justify-content-between align-items-center">
				<IconElement icon={icon} description={`${name} - ${storedAmount} em estoque`} />
				<div className="d-flex flex-column">
					<AmountSelector
						minimumAmount={0}
						initialAmount={storedAmount}
						message="Atualizar Estoque:"
						onUpdateAmount={amount => setUpdatedAmount(amount)}
					/>
					<ButtonGroup className="px-2">
						<Button variant="outline-success" onClick={() => doRequest({ storedAmount: updatedAmount })}>
							Salvar
						</Button>
						<TooltipButton
							btnDescription="Deletar"
							onConfirm={() => {
								dispatch(deleteIngredient(id));
							}}
						>
							<small>Deseja remover este item de maneira permanente?</small>
						</TooltipButton>
					</ButtonGroup>
				</div>
			</div>
		</ListGroup.Item>
	);
};
