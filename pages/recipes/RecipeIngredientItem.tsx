import { RecepieIngredient } from "@/@types/common"

const RecipeIngredientItem: React.FC<RecepieIngredient> = ({ icon, storedAmount, name, recipeAmount }) => {
    return (
        <div className="d-flex">
            <div>
                <i className="fs-3 pe-2">{icon}</i>
                <span>{name}</span>
            </div>
            <div className="ms-3">
                <span>{storedAmount} em estoque</span>
                <br />
                <span>{recipeAmount} são usados em cada receita</span>
            </div>
        </div>
    )
}

export default RecipeIngredientItem