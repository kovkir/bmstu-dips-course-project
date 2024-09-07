import { Authorization } from "../components/Auth/Authorization"


interface AuthorizationPageProps {
	changeIsAuth: (value: boolean) => void
}

export function AuthorizationPage({ changeIsAuth }: AuthorizationPageProps) {
	return (
		<Authorization
			changeIsAuth={ changeIsAuth }
		/>
	)
}
