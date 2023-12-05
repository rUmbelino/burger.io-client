import { FC } from 'react';
import { Button } from 'react-bootstrap';

interface ClosedMenuProps {
	handleOpenMenu: () => void;
}

const ClosedMenu: FC<ClosedMenuProps> = ({ handleOpenMenu }) => (
	<Button className="m-2" data-cy="open-menu-btn" variant="outline-primary" onClick={handleOpenMenu}>
		☰
	</Button>
);

export default ClosedMenu;
