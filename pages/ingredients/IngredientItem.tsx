import { Ingredient } from '@/@types/common';
import { TooltipButton } from '@/components/TooltipButton';
import useRequest from '@/hooks/useRequest';
import { deleteIngredient } from '@/slices/ingredientSlice';
import { AppDispatch } from '@/utils/store';
import React, { useState } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

export const IngredientItem: React.FC<Ingredient> = ({ id, icon, storedAmount, name }) => {
	const dispatch = useDispatch<AppDispatch>();
	const [updatedAmount, setUpdatedAmount] = useState(storedAmount);

	return (
		<ListGroup.Item>
			<div className="d-flex justify-content-between align-items-center">
				<div>
					<i className="fs-3 pe-2">{icon}</i>
					<span>
						{name} - {storedAmount} em estoque
					</span>
				</div>
				<div className="d-flex flex-column">
					<div>
						<p>Atualizar Estoque:</p>
						<Button
							disabled={updatedAmount === 0}
							variant="outline-danger"
							onClick={() => setUpdatedAmount(updatedAmount - 1)}
						>
							-
						</Button>
						<span className="mx-3">{updatedAmount}</span>
						<Button variant="outline-danger" onClick={() => setUpdatedAmount(updatedAmount + 1)}>
							+
						</Button>
						<Button className="ms-3" variant="outline-success">
							Salvar
						</Button>
					</div>
					<TooltipButton
						className="my-3"
						variant="outline-danger"
						btnDescription="Remover Ingrediente"
						onConfirm={() => {
							dispatch(deleteIngredient(id));
						}}
					>
						<small>Deseja remover este item de maneira permanente?</small>
					</TooltipButton>
				</div>
			</div>
		</ListGroup.Item>
	);
};
