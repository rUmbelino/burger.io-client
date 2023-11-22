import { Ingredient } from "@/@types/common"
import useRequest from "@/hooks/useRequest"
import { useEffect, useState } from "react"
import { Button, ListGroup } from "react-bootstrap"
import { IngredientItem } from "./IngredientItem"
import { IngredientForm } from "./IngredientForm"

export default function Ingredients() {
    const [showForm, setShowForm] = useState(false);
    const [ingredientItems, setIngredientItems] = useState<JSX.Element[] | null>(null)

    const { errors, loading, doRequest } = useRequest<Ingredient[]>({
        url: '/ingredient', method: 'get', onSuccess: (data) => {
            const items = data.map((ingredient) => (
                <IngredientItem key={`ingredient${ingredient.id}`} {...ingredient} />
            ))
            setIngredientItems(items)
        }
    })

    useEffect(() => {
        doRequest()
    }, [])

    return (
        <>
            <IngredientForm show={showForm} handleClose={() => setShowForm(false)} />
            <header className="d-flex justify-content-between my-4">
                <h2>Ingredientes:</h2>
                <Button size="sm" variant="success" onClick={() => setShowForm(true)}>Cadastrar Ingrediente</Button>
            </header>
            {errors}
            {loading}
            <ListGroup>
                {ingredientItems}
            </ListGroup>
        </>
    )
}