import "../Tables.css";
import { IFlight } from "../../../interfaces/Flight/IFlight";
import { PayIcon } from "../../Icons/PayIcon";


interface FlightsRowProps {
	flight: IFlight
	handleOpenPayWindow: (flight: IFlight) => void
	addClassName?: string
}

export function FlightsRow(props: FlightsRowProps) {
	return (
		<div
			className={ `row ${ props.addClassName }` }
			onDoubleClick={ () => props.handleOpenPayWindow(props.flight) }
		>
			<div className="row-item basis-1/6">{ props.flight.flightNumber }</div>
			<div className="row-item basis-1/4">{ props.flight.fromAirport }</div>
			<div className="row-item basis-1/4">{ props.flight.toAirport }</div>
			<div className="row-item basis-1/5">{ props.flight.date }</div>
			<div className="row-item basis-1/6">{ props.flight.price }</div>
			
			<div className="actions">
				<PayIcon 
					color="gray"
					addClassName="px-2 py-2"
					addContainerClassName="basis-1/2"
					onClick={ () => props.handleOpenPayWindow(props.flight) }
				/>
			</div>
		</div>
	)
}
