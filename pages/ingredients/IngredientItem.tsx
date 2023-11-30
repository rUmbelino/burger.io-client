import { Ingredient } from '@/@types/common';
import { AmountSelector } from '@/components/AmountSelector';
import { IconElement } from '@/components/IconElement';
import { TooltipButton } from '@/components/TooltipButton';
import { deleteIngredient } from '@/slices/ingredientSlice';
import { AppDispatch } from '@/utils/store';
import { Button, ButtonGroup, ListGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

export const IngredientItem: React.FC<Ingredient> = ({ id, icon, storedAmount, name }) => {
	const dispatch = useDispatch<AppDispatch>();

	return (
		<ListGroup.Item>
			<div className="d-flex justify-content-between align-items-center">
				<IconElement icon={icon} description={`${name} - ${storedAmount} em estoque`} />
				<div className="d-flex flex-column">
					<AmountSelector initialAmount={5} message="Atualizar Estoque:" minimumAmount={0} />
					<ButtonGroup className="px-2">
						<Button variant="outline-success">Salvar</Button>
						<TooltipButton
							variant="outline-danger"
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
