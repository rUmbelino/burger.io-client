import { Button } from 'react-bootstrap';
import { useState, FC } from 'react';

interface AmountSelectorProps {
	message: string;
	initialAmount: number;
	minimumAmount?: number;
	maximumAmount?: number;
}

export const AmountSelector: FC<AmountSelectorProps> = ({ initialAmount, minimumAmount, maximumAmount, message }) => {
	const [amount, setAmount] = useState(initialAmount);

	const minimumDisabled = minimumAmount !== undefined && amount <= minimumAmount;
	const maximumDisabled = maximumAmount !== undefined && amount <= maximumAmount;

	return (
		<div>
			<p>{message}</p>
			<Button variant="outline-danger" disabled={minimumDisabled} onClick={() => setAmount(amount - 1)}>
				-
			</Button>
			<span className="mx-3">{amount}</span>
			<Button variant="outline-danger" disabled={maximumDisabled} onClick={() => setAmount(amount + 1)}>
				+
			</Button>
		</div>
	);
};
