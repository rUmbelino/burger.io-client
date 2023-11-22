import { Recepie } from "@/@types/common"
import useRequest from "@/hooks/useRequest"
import { useEffect, useState } from "react"
import { Accordion, Button } from "react-bootstrap"
import RecipeItem from "./RecipeItem"
import { RecipeForm } from "./RecipeForm"

export default function Recepies() {
    const [showFormModal, setShowModal] = useState(false)
    const [recipeItems, setRecipeItems] = useState<JSX.Element[] | null>(null)
    const { errors, loading, doRequest } = useRequest<Recepie[]>({
        url: '/recipe',
        method: 'get',
        onSuccess(data) {
            const recepies = data.map((recipe) => (
                <RecipeItem key={`recipe${recipe.id}`} {...recipe} />
            ))
            setRecipeItems(recepies)
        }
    })

    useEffect(() => {
        doRequest()
    }, [])

    return (
        <>
            <RecipeForm show={showFormModal} handleClose={() => setShowModal(false)} />
            <header className="d-flex justify-content-between my-4">
                <h2>Lanches:</h2>
                <Button size="sm" variant="success" onClick={() => setShowModal(true)}>Cadastrar Lanche</Button>
            </header>
            {errors}
            {loading}
            <Accordion defaultActiveKey="0">
                {recipeItems}
            </Accordion>
        </>
    )
}