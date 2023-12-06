import { useEffect, useRef, useState } from 'react';
import ReactSelect from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/utils/store';
import { Button, Form } from 'react-bootstrap';
import { RecepieIngredient } from '@/@types/common';
import { fetchIngredients } from '@/slices/ingredientSlice';

interface Ingredient {
	id: string;
	recipeAmount: string;
}

const emptyIngredient = { id: '', recipeAmount: '' };

const convertIngredientInOptions = (list: RecepieIngredient[]) => {
	return list.map(({ id, name, icon }) => ({
		value: id.toString(),
		label: `${name} ${icon}`,
	}));
};

export const IngredientFormSection = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [ingredients, setIngredients] = useState<Ingredient[]>([{ ...emptyIngredient }]);
	const { items } = useSelector((state: RootState) => state.ingredient);
	const options: any[] = convertIngredientInOptions(items);

	const fetchOptions = useRef(() => {
		if (items.length === 0) {
			dispatch(fetchIngredients());
		}
	});

	useEffect(() => {
		fetchOptions.current();
	}, []);

	const addIngredientToList = () => {
		setIngredients([...ingredients, { ...emptyIngredient }]);
	};

	const removeIngredientFromList = (index: number) => {
		ingredients.splice(index, 1);
		setIngredients([...ingredients]);
	};

	const updateIngredientListItem = (index: number, key: keyof Ingredient, value: any) => {
		ingredients[index][key] = value;
		setIngredients([...ingredients]);
	};

	return (
		<>
			<div className="d-flex justify-content-between">
				<h4>Ingredientes:</h4>
				<Button variant="primary" size="sm" onClick={addIngredientToList}>
					Add Ingredient
				</Button>
			</div>
			{ingredients.map(({ id, recipeAmount }, index) => (
				<div className="m-3 d-flex justify-content-between align-items-end" key={`ingredient${index}`}>
					<Button disabled={index === 0} variant="outline-danger" onClick={() => removeIngredientFromList(index)}>
						X
					</Button>
					<Form.Group className="mx-3" style={{ flexGrow: 2 }}>
						<Form.Label>Ingrediente:</Form.Label>
						<ReactSelect
							value={id}
							options={options}
							name={`ingredient_${index}_id`}
							placeholder="Selecione o ingrediente"
							onChange={newValue => updateIngredientListItem(index, 'id', newValue)}
						/>
					</Form.Group>
					<Form.Group style={{ flex: 1 }}>
						<Form.Label>Quantidade:</Form.Label>
						<Form.Control
							min={1}
							type="number"
							name={`ingredient_${index}_recipeAmount`}
							value={recipeAmount}
							onChange={event => updateIngredientListItem(index, 'recipeAmount', event.target.value)}
						/>
					</Form.Group>
				</div>
			))}
		</>
	);
};
