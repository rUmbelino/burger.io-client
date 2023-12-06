import { Button } from 'react-bootstrap';
import { useState, FC } from 'react';

interface AmountSelectorProps {
	message: string;
	initialAmount: number;
	minimumAmount?: number;
	maximumAmount?: number;
	onUpdateAmount?: (amount: number) => void;
}

const buildAmountHandler = (setter: (value: number) => void, callback?: (value: number) => void) => {
	return (amount: number) => {
		setter(amount);
		if (callback) {
			callback(amount);
		}
	};
};

export const AmountSelector: FC<AmountSelectorProps> = props => {
	const { initialAmount, minimumAmount, maximumAmount, message, onUpdateAmount } = props;
	const [amount, setAmount] = useState(initialAmount);

	const minimumDisabled = minimumAmount !== undefined && amount <= minimumAmount;
	const maximumDisabled = maximumAmount !== undefined && amount <= maximumAmount;

	const handleAdd = buildAmountHandler(setAmount, onUpdateAmount);
	const handleSubtract = buildAmountHandler(setAmount, onUpdateAmount);

	return (
		<div data-cy="amount-selector" className="my-2">
			<p className="text-center mb-2">{message}</p>
			<div className="d-flex justify-content-around align-items-center">
				<Button variant="outline-danger" disabled={minimumDisabled} onClick={() => handleSubtract(amount - 1)}>
					-
				</Button>
				<span className="mx-3">{amount}</span>
				<Button variant="outline-danger" disabled={maximumDisabled} onClick={() => handleAdd(amount + 1)}>
					+
				</Button>
			</div>
		</div>
	);
};
