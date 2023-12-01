import { cleanCart, closeModal, makeOrder, openModal } from '@/slices/CartReducer';
import { AppDispatch, RootState } from '@/utils/store';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { CartModalBody } from './CartModalBody';

export const Cart = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { items, isModalOpen } = useSelector(({ cart }: RootState) => cart);

	const handleShowModal = () => dispatch(openModal());
	const handleCleanCart = () => dispatch(cleanCart());
	const handleCloseModal = () => dispatch(closeModal());
	const handleOrder = () => dispatch(makeOrder(items));

	return (
		<div className="d-flex justify-content-end">
			<Button variant="light" onClick={handleShowModal} className="border">
				🛒
			</Button>
			<Modal show={isModalOpen} onHide={handleCloseModal} size="lg">
				<Modal.Header closeButton>
					<Modal.Title>Carrinho</Modal.Title>
				</Modal.Header>
				<Modal.Body className="d-flex flex-column justify-content-between">
					<CartModalBody />
				</Modal.Body>
				<Modal.Footer>
					{items.length === 0 && (
						<Button variant="secondary" onClick={handleCloseModal}>
							Fechar
						</Button>
					)}
					{items.length !== 0 && (
						<>
							<Button variant="secondary" onClick={handleCleanCart}>
								Limpar Carrinho
							</Button>
							<Button variant="primary" onClick={handleOrder}>
								Fazer Pedido
							</Button>
						</>
					)}
				</Modal.Footer>
			</Modal>
		</div>
	);
};
