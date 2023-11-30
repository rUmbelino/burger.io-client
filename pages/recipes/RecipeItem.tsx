import { Recepie } from '@/@types/common';
import { Accordion } from 'react-bootstrap';
import RecipeIngredientItem from './RecipeIngredientItem';
import { IconElement } from '@/components/IconElement';

interface RecipeItemProps extends Recepie {
	headerActionElement?: JSX.Element;
}

const RecipeItem: React.FC<RecipeItemProps> = props => {
	const { id, icon, name, ingredients, headerActionElement } = props;

	return (
		<Accordion.Item eventKey={id.toString()}>
			<Accordion.Header>
				<IconElement icon={icon} description={name} />
				{headerActionElement}
			</Accordion.Header>
			<Accordion.Body>
				<p>Ingredientes:</p>
				<div className="d-flex justify-content-between">
					<div>
						{ingredients.map(recepieIngredient => (
							<RecipeIngredientItem key={`recipieIngredient${recepieIngredient.id}`} {...recepieIngredient} />
						))}
					</div>
				</div>
			</Accordion.Body>
		</Accordion.Item>
	);
};

export default RecipeItem;
