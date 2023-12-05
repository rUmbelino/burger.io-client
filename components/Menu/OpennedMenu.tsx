import Link from 'next/link';
import { FC } from 'react';
import { CloseButton } from 'react-bootstrap';

const pageList = [
	{ description: 'Ingredientes', path: '/ingredients' },
	{ description: 'Lanches', path: '/recipes' },
	{ description: 'Pedidos', path: '/orders' },
];

interface OppenedMenuProps {
	handleCloseMenu: () => void;
}

const OppenedMenu: FC<OppenedMenuProps> = ({ handleCloseMenu }) => {
	const menuItems = pageList.map(({ description, path }) => (
		<li className="list-group-item" key={path}>
			<Link href={path} className="text-decoration-none">
				{description}
			</Link>
		</li>
	));

	return (
		<div
			className="p-4"
			data-cy="oppened-menu"
			style={{ borderRight: '1px solid var(--bs-gray-300)', height: '100vh' }}
		>
			<CloseButton className="float-end" style={{ fontSize: '12px' }} onClick={handleCloseMenu} />
			<h1 className="text-center font-weight-bold mb-4">
				<Link href="/" className="text-dark text-decoration-none">
					🍔 Burger.io
				</Link>
			</h1>
			<ul className="list-group list-group-flush">{menuItems}</ul>
		</div>
	);
};

export default OppenedMenu;
