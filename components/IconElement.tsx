interface IconElementProps {
	icon: string;
	description: string;
}

export const IconElement: React.FC<IconElementProps> = ({ icon, description }) => (
	<div data-cy="icon-element" className="d-flex align-items-center">
		<i className="me-3 fs-3">{icon}</i>
		<span>{description}</span>
	</div>
);
