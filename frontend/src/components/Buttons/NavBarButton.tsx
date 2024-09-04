import "./Buttons.css";


interface NavBarButtonProps {
	text: string,
}

export function NavBarButton({ text }: NavBarButtonProps) {
	return (
		<button className="navbar-button">{ text }</button>
	)
}
