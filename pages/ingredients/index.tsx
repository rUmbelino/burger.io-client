import { useEffect, useState } from "react"
import { Button, ListGroup } from "react-bootstrap"
import { IngredientItem } from "./IngredientItem"
import { IngredientForm } from "./IngredientForm"
import { useDispatch, useSelector } from "react-redux"
import { fetchIngredients } from "@/slices/ingredientSlice"
import { AppDispatch, RootState } from "@/utils/store"

export default function Ingredients() {
    const dispatch = useDispatch<AppDispatch>()
    const [showForm, setShowForm] = useState(false);
    const { items, loading, error } = useSelector(({ ingredient }: RootState) => ingredient)

    useEffect(() => {
        dispatch(fetchIngredients())
    }, [])

    return (
        <>
            <IngredientForm show={showForm} handleClose={() => setShowForm(false)} />
            <header className="d-flex justify-content-between my-4">
                <h2>Ingredientes:</h2>
                <Button size="sm" variant="success" onClick={() => setShowForm(true)}>Cadastrar Ingrediente</Button>
            </header>
            {error}
            {error === null && loading}
            <ListGroup>
                {items.map((ingredient) => (
                    <IngredientItem key={`ingredient${ingredient.id}`} {...ingredient} />
                ))}
            </ListGroup>
        </>
    )
}