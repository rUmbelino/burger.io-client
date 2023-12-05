import { useState } from 'react';
import { Animate } from 'react-simple-animate';
import OppenedMenu from './OpennedMenu';
import ClosedMenu from './ClosedMenu';

const backgroundStyle = {
	top: 0,
	visibility: 'hidden',
	zIndex: -10,
	opacity: 0,
};
const foregroundStyle = {
	top: 0,
	zIndex: 10,
	opacity: 1,
};

const Menu = () => {
	const [isOpen, setIsOpen] = useState(false);
	const menuClass = isOpen ? 'menu-open' : 'menu-closed';

	return (
		<div data-cy="menu-container" className={`position-relative overflow-hidden ${menuClass}`}>
			<Animate
				delay={0}
				duration={0.5}
				// @ts-ignore
				start={{ ...backgroundStyle }}
				end={{ opacity: 1 }}
				play={!isOpen}
				complete={{ ...foregroundStyle }}
			>
				<ClosedMenu handleOpenMenu={() => setIsOpen(true)} />
			</Animate>
			<Animate
				duration={0.5}
				delay={0}
				play={isOpen}
				// @ts-ignore
				start={{ transform: 'translate(-100%, -50px)', ...backgroundStyle }}
				end={{ transform: 'translate(0px, -50px)' }}
				complete={{ transform: 'translate(0px, -50px)', ...foregroundStyle }}
				easeType="cubic-bezier(0.445, 0.05, 0.55, 0.95)"
			>
				<OppenedMenu handleCloseMenu={() => setIsOpen(false)} />
			</Animate>
		</div>
	);
};

export default Menu;
