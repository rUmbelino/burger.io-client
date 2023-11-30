import { closeModal, openModal, updateItemQuantity } from '@/slices/CartReducer';
import { AppDispatch, RootState } from '@/utils/store';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AmountSelector } from './AmountSelector';
import { IconElement } from './IconElement';

export const Cart = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { items, isModalOpen } = useSelector(({ cart }: RootState) => cart);

	const handleShow = () => dispatch(openModal());
	const handleClose = () => dispatch(closeModal());

	const modalBody = () => {
		if (items.length === 0) {
			return <h3>Seu carrinho esta vazio!</h3>;
		}

		return items.map(({ id, icon, name, quantity }) => (
			<div key={id} className="d-flex justify-content-between">
				<IconElement icon={icon} description={name} />
				<AmountSelector
					message="Quantidade:"
					minimumAmount={1}
					initialAmount={quantity}
					onAdd={(quantity: number) => dispatch(updateItemQuantity({ id, quantity }))}
					onSubtract={(quantity: number) => dispatch(updateItemQuantity({ id, quantity }))}
				/>
			</div>
		));
	};

	return (
		<div className="d-flex justify-content-end">
			<Button variant="outline-primary" onClick={handleShow}>
				🛒
			</Button>
			<Modal show={isModalOpen} onHide={handleClose} size="lg">
				<Modal.Header closeButton>
					<Modal.Title>Carrinho</Modal.Title>
				</Modal.Header>
				<Modal.Body className="d-flex flex-column justify-content-between">{modalBody()}</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Fechar
					</Button>
					<Button variant="primary" onClick={handleClose}>
						Fazer Pedido
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};
