import { Ingredient } from "@/@types/common";
import { Tooltip } from "@/components/Tooltip";
import React, { useState } from "react";
import { Button, ListGroup } from "react-bootstrap";

export const IngredientItem: React.FC<Ingredient> = ({ icon, storedAmount, name }) => {
    const [updatedAmount, setUpdatedAmount] = useState(storedAmount)

    return (
        <ListGroup.Item>
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <i className="fs-3 pe-2">{icon}</i>
                    <span>{name} - {storedAmount} em estoque</span>
                </div>
                <div className="d-flex flex-column">
                    <div>
                        <p>Atualizar Estoque:</p>
                        <Button disabled={updatedAmount === 0} variant="outline-danger" onClick={() => setUpdatedAmount(updatedAmount - 1)}>-</Button>
                        <span className="mx-3" >{updatedAmount}</span>
                        <Button variant="outline-danger" onClick={() => setUpdatedAmount(updatedAmount + 1)}>+</Button>
                        <Button className="ms-3" variant="outline-success">Salvar</Button>
                        <Tooltip />
                    </div>
                    <Button className="my-3" variant="outline-danger">Remover Ingrediente</Button>
                </div>
            </div>
        </ListGroup.Item>
    )
}
