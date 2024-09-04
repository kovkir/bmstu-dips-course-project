import { useState } from 'react';

import { IFilterFlight } from '../../interfaces/Flight/IFilterFlight';


interface useFilterFlightsFormProps {
	filterTable: IFilterFlight
};

export function useFilterFlightsForm({ filterTable }: useFilterFlightsFormProps) {
	const [flightNumber, setFlightNumber] = useState(filterTable.flightNumber ?? "");
	const [fromAirport, setFromAirport] = useState(filterTable.fromAirport ?? "");
	const [toAirport, setToAirport] = useState(filterTable.toAirport ?? "");
	const [minDate, setMinDate] = useState(filterTable.minDate ?? null);
	const [maxDate, setMaxDate] = useState(filterTable.maxDate ?? null);
	const [minPrice, setMinPrice] = useState(filterTable.minPrice);
	const [maxPrice, setMaxPrice] = useState(filterTable.maxPrice);

	const clearFilterFields = () => {
		setFlightNumber("");
		setFromAirport("");
		setToAirport("");
		setMinDate(null);
		setMaxDate(null);
		setMinPrice(undefined);
		setMaxPrice(undefined);
	}

	return {
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
	};
};
