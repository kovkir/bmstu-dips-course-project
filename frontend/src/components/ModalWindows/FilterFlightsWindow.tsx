import { FilterIcon } from '../Icons/FilterIcon';

import "./ModalWindows.css";
import { Backdrop } from "./Backdrop";
import { FormButton } from "../Buttons/FormButton";
import { FormOptionallyButton } from "../Buttons/FormOptionallyButton";
import { TextHeader } from "../Texts/TextHeader";
import { InputRow } from "../Inputs/InputRow";
import { IFilterFlight } from '../../interfaces/Flight/IFilterFlight';
import { useFilterFlightsForm } from '../../hooks/useForms/useFilterFlightsForm';



interface FilterFlightsWindowProps {
	filterTable: IFilterFlight,
	onFilter: (filterFlight: IFilterFlight) => void,
	onClose: () => void
}

export function FilterFlightsWindow({ filterTable, onFilter, onClose }: FilterFlightsWindowProps) {
	const submitHandler = (event: React.FormEvent) => {
		event.preventDefault();
	};

	const keyDownHandler = (event: React.KeyboardEvent) => {
		if (event.key === "Escape") {
			onClose();
		}
	}

	const{ 
		flightNumber,
		fromAirport,
		toAirport,
		minDate,
		maxDate,
		minPrice,
		maxPrice,
		setFlightNumber,
		setFromAirport,
		setToAirport,
		setMinDate,
		setMaxDate,
		setMinPrice,
		setMaxPrice,
		clearFilterFields,
	} = useFilterFlightsForm({ filterTable });
	
	return (
		<>
			<Backdrop onClick={ onClose }/>

			<div className="filter-window">
				<form 
					onSubmit={ submitHandler } 
					onKeyDown={ keyDownHandler }
				>
					<TextHeader text="Поиск полетов"/>

					<div className="mb-5">
						<InputRow
							label="Номер полета"
							value={ flightNumber }
							setValue={ setFlightNumber }
						/>
					</div>

					<div className="mb-5">
						<InputRow
							label="Аэропорт отправления"
							value={ fromAirport }
							setValue={ setFromAirport }
						/>
					</div>

					<div className="mb-5">
						<InputRow
							label="Аэропорт прибытия"
							value={ toAirport }
							setValue={ setToAirport }
						/>
					</div>

					<div className="left-buttons">
						<div>
							<FilterIcon
								color="gray"
								selected={ false }
								onClick={ clearFilterFields }
								addClassName="py-2 px-2 hover:bg-gray-900/10"
								addContainerClassName="basis-1/2"
							/>
						</div>
						<div className="flex flex-row justify-center w-full">
							<FormButton 
								text="Найти"
								onClick={ () => onFilter({ flightNumber, fromAirport, toAirport }) }
							/>
							<FormOptionallyButton 
								text="Закрыть"
								onClick={ onClose }
							/>
						</div>
					</div>
				</form>
			</div>
		</>
	)
}
