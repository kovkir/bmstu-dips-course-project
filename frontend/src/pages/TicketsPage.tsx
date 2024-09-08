import { TicketsBoard } from '../components/Bords/TicketsBoard';
import { IUser } from '../interfaces/User/IUser';


interface TicketsPageProps {
	openMiniDrawer: boolean
	user: IUser
}

export function TicketsPage({ openMiniDrawer, user }: TicketsPageProps) {
	return (
		<TicketsBoard 
			openMiniDrawer={ openMiniDrawer }
			user={ user }
		/>
	)
}
