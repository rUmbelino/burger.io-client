import { RecepieIngredient } from '@/@types/common';
import { IconElement } from '@/components/IconElement';

const RecipeIngredientItem: React.FC<RecepieIngredient> = ({ icon, storedAmount, name, recipeAmount }) => {
	return (
		<div className="d-flex">
			<IconElement icon={icon} description={name} />
			<div className="ms-3">
				<span>{storedAmount} em estoque</span>
				<br />
				<span>{recipeAmount} são usados em cada receita</span>
			</div>
		</div>
	);
};

export default RecipeIngredientItem;
