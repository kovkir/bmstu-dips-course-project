import "../Tables.css";
import { FlightsTitleRow } from "./FlightsTitleRow";
import { FlightsRow } from "./FlightsRow";
import { TablePagination } from '../TablePagination';
import { DataLoadError } from "../../DataLoadError/DataLoadError";
import { FilterFlightsWindow } from "../../ModalWindows/FilterFlightsWindow";
import { useFlightsTable } from "../../../hooks/useTables/useFlightsTable";
import { useFilterFlightsWindow } from "../../../hooks/useWindows/useFilterFlightsWindow";
import { IFlight } from "../../../interfaces/Flight/IFlight";


interface FlightsTableProps {
	openMiniDrawer: boolean
}

export function FlightsTable({ openMiniDrawer }: FlightsTableProps) {
	const { 
		flights,
		amountFlights,
		sortTable, 
		filterTable,
		page, 
		rowsPerPage,
		error,
		handleUpdateTable,
		handleChangePage, 
		handleChangeRowsPerPage,
		handleChangeSort,
		handleChangeFilter,
	} = useFlightsTable();

	const filterFlightsWindow = useFilterFlightsWindow({ handleChangeFilter });


	return (
		<>
			<div className={`${openMiniDrawer ? "short-table-container" : "long-table-container"}`}>
				<div className="table">
					<FlightsTitleRow 
						sortTable={ sortTable }
						filterTable={ filterTable }
						handleChangeSort={ handleChangeSort }
						handleOpenFilterWindow={ filterFlightsWindow.handleOpenWindow }
					/>

					<div className="rows-container">
						{ !error
							?	<div className="rows">
									{ flights.map((flight, index) => 
											<FlightsRow 
												key={ flight.flightNumber }
												flight={ flight } 
												handleOpenPayWindow={ (flights: IFlight) => {} }
												addClassName={index % 2 ? "bg-gray-200": "bg-white"}
											/>
										)
									}
								</div>
							: <DataLoadError 
									handleUpdate={ handleUpdateTable }
								/>
						}
					</div>

					<TablePagination
						amountItems={ amountFlights }
						page={ page }
						handleChangePage={ handleChangePage }
						rowsPerPage={ rowsPerPage }
						handleChangeRowsPerPage={ handleChangeRowsPerPage }
					/>
				</div>
			</div>

			{ filterFlightsWindow.visibility && 
				<FilterFlightsWindow 
					filterTable={ filterTable }
					onFilter={ filterFlightsWindow.handleSearch } 
					onClose={ filterFlightsWindow.handleCloseWindow }
				/> 
			}
		</>
	)
}
