import { FC, PropsWithChildren, useRef, useState } from 'react';
import { Button, ButtonGroup, CloseButton, Overlay } from 'react-bootstrap';

interface TooltipButtonProps {
	variant: string;
	className?: string;
	btnDescription: string;
	onConfirm?: () => void;
}

export const TooltipButton: FC<PropsWithChildren<TooltipButtonProps>> = ({
	children,
	variant,
	className,
	onConfirm,
	btnDescription,
}) => {
	const [show, setShow] = useState(false);
	const target = useRef<HTMLButtonElement>(null);

	const handleConfirm = () => {
		setShow(!show);
		if (onConfirm) {
			onConfirm();
		}
	};

	return (
		<>
			<Button className={className} variant={variant} ref={target} onClick={() => setShow(!show)}>
				{btnDescription}
			</Button>
			<Overlay target={target.current} show={show} placement="bottom">
				{({ ...props }) => (
					<div
						{...props}
						style={{
							position: 'absolute',
							backgroundColor: 'var(--toastify-color-error)',
							padding: '2px 10px',
							color: 'white',
							marginTop: '10px',
							borderRadius: 3,
							...props.style,
						}}
					>
						<CloseButton
							className="float-end"
							variant="white"
							style={{ fontSize: '10px' }}
							onClick={() => setShow(!show)}
						/>
						<br />
						{children}
						<br />
						<ButtonGroup className="d-block text-center my-3" size="sm">
							<Button variant="secondary" onClick={() => setShow(!show)}>
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
