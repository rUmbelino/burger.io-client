import { closeModal, openModal } from '@/slices/CartReducer';
import { AppDispatch, RootState } from '@/utils/store';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { CartModalBody } from './CartModalBody';

export const Cart = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { isModalOpen } = useSelector(({ cart }: RootState) => cart);

	const handleShow = () => dispatch(openModal());
	const handleClose = () => dispatch(closeModal());

	return (
		<div className="d-flex justify-content-end">
			<Button variant="light" onClick={handleShow}>
				🛒
			</Button>
			<Modal show={isModalOpen} onHide={handleClose} size="lg">
				<Modal.Header closeButton>
					<Modal.Title>Carrinho</Modal.Title>
				</Modal.Header>
				<Modal.Body className="d-flex flex-column justify-content-between">
					<CartModalBody />
				</Modal.Body>
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
