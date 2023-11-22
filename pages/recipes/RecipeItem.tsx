import { Recepie } from "@/@types/common"
import { Accordion, Button, ButtonGroup } from "react-bootstrap"
import RecipeIngredientItem from "./RecipeIngredientItem"

const RecipeItem: React.FC<Recepie> = ({ id, icon, name, ingredients }) => {
    return (
        <Accordion.Item eventKey={id.toString()}>
            <Accordion.Header>
                <i className="me-3 fs-3">{icon}</i>
                <span>{name}</span>
                <ButtonGroup className="mx-3">
                    <span className="btn btn-outline-danger" onClick={e => e.stopPropagation()}>Remover</span>
                    <span className="btn btn-outline-success" onClick={e => e.stopPropagation()}>Pedir</span>
                </ButtonGroup>

            </Accordion.Header>
            <Accordion.Body >
                <p>Ingredientes:</p>
                <div className="d-flex justify-content-between">
                    <div>
                        {ingredients.map((recepieIngredient) => (
                            <RecipeIngredientItem key={`recipieIngredient${recepieIngredient.id}`} {...recepieIngredient} />
                        ))}
                    </div>
                </div>
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default RecipeItem