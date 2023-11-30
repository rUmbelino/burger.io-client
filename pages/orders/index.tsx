import { Accordion, Button, ListGroup, Spinner } from 'react-bootstrap';
import { useOrders } from './hocks/useOrders';
import { IconElement } from '@/components/IconElement';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/utils/store';
import { addItemsToCart } from '@/slices/CartReducer';

export default function Orders() {
	const dispatch = useDispatch<AppDispatch>();
	const { isLoading, isCompleted, orders } = useOrders();

	const acordionItems = orders.reverse().map(({ id, recepies }) => (
		<Accordion.Item key={`order${id}`} eventKey={id.toString()}>
			<Accordion.Header>Pedido #{id}</Accordion.Header>
			<Accordion.Body>
				{recepies.map(({ icon, quantity, name }) => (
					<ListGroup key={`order${name}`} className="mb-3">
						<ListGroup.Item>
							<IconElement icon={icon} description={`${quantity}x - ${name}`} />
						</ListGroup.Item>
					</ListGroup>
				))}
				<div className="d-flex flex-row-reverse">
					<Button variant="success" onClick={() => dispatch(addItemsToCart(recepies))}>
						Pedir Novamente
					</Button>
				</div>
			</Accordion.Body>
		</Accordion.Item>
	));

	return (
		<>
			<h2 className="pb-3">Ultimos pedidos:</h2>
			{isLoading && <Spinner className="d-block m-auto my-5" variant="primary" animation="border" />}
			{isCompleted && <Accordion defaultActiveKey={orders[0].id.toString()}>{acordionItems}</Accordion>}
		</>
	);
}
