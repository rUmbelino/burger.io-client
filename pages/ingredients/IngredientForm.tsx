import { useModal } from '@/hooks/useModal';
import useRequest from '@/hooks/useRequest';
import { getFormValues } from '@/utils/getFormValues';
import { FC, useRef } from 'react';
import { toast } from 'react-toastify';
import { Button, FloatingLabel, Form } from 'react-bootstrap';

interface IngredientFormProps {
	show: boolean;
	handleClose: () => void;
}

export const IngredientForm: FC<IngredientFormProps> = ({ show, handleClose }) => {
	const formRef = useRef<HTMLFormElement>(null);

	const { Wrapper } = useModal({ show, handleClose, title: 'Cadastrar Ingrediente' });
	const { doRequest, errors, loading } = useRequest({
		url: '/ingredient',
		method: 'post',
		onSuccess: () => {
			toast.success('Ingrediente cadastrado com sucesso!');
			handleClose();
		},
	});

	return (
		<Wrapper>
			{errors}
			{loading}
			{loading === null && (
				<Form ref={formRef}>
					<FloatingLabel controlId="floatingInput" label="Nome" className="mb-3">
						<Form.Control name="name" type="text" placeholder="Nome" />
					</FloatingLabel>
					<FloatingLabel label="Icone" className="mb-3">
						<Form.Control name="icon" type="text" placeholder="Icone" />
					</FloatingLabel>
					<FloatingLabel label="Quantidade" className="mb-3">
						<Form.Control name="storedAmount" type="number" min={0} placeholder="Quantidade" />
					</FloatingLabel>
					<Button
						className="float-end"
						variant="success"
						onClick={() => doRequest(getFormValues(formRef.current!.elements))}
					>
						Salvar
					</Button>
				</Form>
			)}
		</Wrapper>
	);
};
