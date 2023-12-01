import { FC, PropsWithChildren, useRef, useState } from 'react';
import { Button, ButtonGroup, CloseButton, Overlay } from 'react-bootstrap';
import { Placement } from 'react-bootstrap/esm/types';

interface TooltipButtonProps {
	variant?: string;
	className?: string;
	placement?: Placement;
	btnDescription: string;
	onConfirm?: () => void;
}

export const TooltipButton: FC<PropsWithChildren<TooltipButtonProps>> = props => {
	const [show, setShow] = useState(false);
	const target = useRef<HTMLButtonElement>(null);
	const { children, variant = 'outline-danger', placement = 'bottom', className, onConfirm, btnDescription } = props;

	const handleConfirm = () => {
		setShow(false);
		if (onConfirm) {
			onConfirm();
		}
	};

	const handleClose = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setShow(false);
	};

	const handleOpen = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setShow(true);
	};

	return (
		<>
			<span className={`btn btn-${variant} ${className}`} ref={target} onClick={handleOpen}>
				{btnDescription}
			</span>
			<Overlay target={target.current} show={show} placement={placement}>
				{({ show, arrowProps, hasDoneInitialMeasure, ...props }) => (
					<div
						{...props}
						style={{
							position: 'absolute',
							backgroundColor: 'var(--toastify-color-error)',
							padding: '2px 10px',
							color: 'white',
							marginTop: '10px',
							borderRadius: 3,
							zIndex: 9999,
							...props.style,
						}}
					>
						<CloseButton className="float-end" variant="white" style={{ fontSize: '10px' }} onClick={handleClose} />
						<br />
						{children}
						<br />
						<ButtonGroup className="d-block text-center my-2" size="sm">
							<Button variant="secondary" onClick={handleClose}>
								Não
							</Button>
							<Button variant="success" onClick={handleConfirm}>
								Sim
							</Button>
						</ButtonGroup>
					</div>
				)}
			</Overlay>
		</>
	);
};
