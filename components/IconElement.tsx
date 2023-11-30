interface IconElementProps {
	icon: string;
	description: string;
}

export const IconElement: React.FC<IconElementProps> = ({ icon, description }) => (
	<div>
		<i className="me-3 fs-3">{icon}</i>
		<span>{description}</span>
	</div>
);
