import { Recepie } from '@/@types/common';
import useRequest from '@/hooks/useRequest';
import { FormEvent, useEffect, useState } from 'react';
import { Accordion, Button, ButtonGroup } from 'react-bootstrap';
import RecipeItem from './RecipeItem';
import { RecipeForm } from './RecipeForm';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/utils/store';
import { addItemToCart } from '@/slices/CartSlice';

export default function Recepies() {
	const dispatch = useDispatch<AppDispatch>();
	const [showFormModal, setShowModal] = useState(false);
	const [recipeItems, setRecipeItems] = useState<JSX.Element[] | null>(null);

	const { errors, loading, doRequest } = useRequest<Recepie[]>({
		url: '/recipe',
		method: 'get',
		onSuccess(data) {
			const recepies = data.map(recipe => {
				const handleOrderRecipe = (e: FormEvent) => {
					e.stopPropagation();
					dispatch(addItemToCart(recipe));
				};

				return (
					<RecipeItem
						key={`recipe${recipe.id}`}
						{...recipe}
						headerActionElement={
							<ButtonGroup className="mx-3">
								<span className="btn btn-outline-danger" onClick={e => e.stopPropagation()}>
									Remover
								</span>
								<span className="btn btn-outline-success" onClick={handleOrderRecipe}>
									Pedir
								</span>
							</ButtonGroup>
						}
					/>
				);
			});
			setRecipeItems(recepies);
		},
	});

	useEffect(() => {
		doRequest();
	}, []);

	return (
		<>
			<RecipeForm show={showFormModal} handleClose={() => setShowModal(false)} />
			<header className="d-flex justify-content-between my-4">
				<h2>Lanches:</h2>
				<Button size="sm" variant="success" onClick={() => setShowModal(true)}>
					Cadastrar Lanche
				</Button>
			</header>
			{errors}
			{loading}
			<Accordion defaultActiveKey="0">{recipeItems}</Accordion>
		</>
	);
}
