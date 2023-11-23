import { useModal } from "@/hooks/useModal"
import useRequest from "@/hooks/useRequest"
import { getFormValues } from "@/utils/getFormValues"
import { FC, useRef } from "react"
import { Button, FloatingLabel, Form } from "react-bootstrap"
import { toast } from "react-toastify"
import { IngredientFormSection } from "./IngredientFormSection"

interface IngredientFormProps {
    show: boolean
    handleClose: () => void
}

const options = [
    { value: '1', label: 'Batata 🥔' },
    { value: '2', label: 'Tomate 🍅' },
    { value: '3', label: 'Ovo 🥚' }
]


export const RecipeForm: FC<IngredientFormProps> = ({ show, handleClose }) => {
    const formRef = useRef<HTMLFormElement>(null)
    const { Wrapper } = useModal({ show, handleClose, title: 'Cadastrar Lanche' })
    const { doRequest, errors, loading } = useRequest({
        url: '/recipe',
        method: 'post',
        onSuccess: () => {
            toast.success('Receita cadastrada com sucesso!')
            handleClose()
        }
    })


    const handleFormSubmit = () => {
        if (formRef.current) {
            doRequest(getFormValues(formRef.current.elements))
        }
    }

    return (
        <Wrapper>
            {errors}
            {loading}
            {loading === null && <Form ref={formRef}>
                <FloatingLabel controlId="floatingInput" label="Nome" className="mb-3">
                    <Form.Control name="name" type="text" placeholder="Nome" />
                </FloatingLabel>
                <FloatingLabel label="Icone" className="mb-3">
                    <Form.Control name="icon" type="text" placeholder="Icone" />
                </FloatingLabel>
                <IngredientFormSection options={options} />
                <Button className="float-end mt-3" variant="success" onClick={handleFormSubmit}>
                    Salvar
                </Button>
            </Form>}
        </Wrapper>
    )
}