import { Accordion, Button, ListGroup, Spinner, Table } from "react-bootstrap"
import { useOrders } from "./hocks/useOrders"

export default function Orders() {
    const { isLoading, isCompleted, orders } = useOrders()

    const acordionItems = orders.reverse().map(({ id, recepies }) => (
        <Accordion.Item key={`order${id}`} eventKey={id.toString()}>
            <Accordion.Header>Pedido #{id}</Accordion.Header>
            <Accordion.Body>
                {recepies.map(({ icon, quantity, name }) => (
                    <ListGroup key={`order${name}`} className="mb-3">
                        <ListGroup.Item>
                            <i className="fs-3 pe-2">{icon}</i>
                            <span>{quantity}x - {name}</span>
                        </ListGroup.Item>
                    </ListGroup>
                ))}
                <div className="d-flex flex-row-reverse">
                    <Button variant="success" className="">Pedir Novamente</Button>
                </div>
            </Accordion.Body>
        </Accordion.Item>
    ))

    return (
        <>
            <h2 className="pb-3">Ultimos pedidos:</h2>
            {isLoading && <Spinner className="d-block m-auto my-5" variant="primary" animation="border" />}
            {isCompleted && <Accordion defaultActiveKey={orders[0].id.toString()}>{acordionItems}</Accordion>}
        </>
    )
}