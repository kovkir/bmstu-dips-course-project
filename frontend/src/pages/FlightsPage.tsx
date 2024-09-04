import { FlightsTable } from '../components/Tables/Flights/FlightsTable';


interface FlightsPageProps {
	openMiniDrawer: boolean
}

export function FlightsPage({ openMiniDrawer }: FlightsPageProps) {
	return (
			<FlightsTable 
				openMiniDrawer={ openMiniDrawer }
			/>
	)
}
