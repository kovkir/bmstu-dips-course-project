import BarChart from "@mui/icons-material/BarChart";

import "../Tables.css";
import { StatisticsTitleRow } from "./StatisticsTitleRow";
import { StatisticsRow } from "./StatisticsRow";
import { TablePagination } from '../TablePagination';
import { DataLoadError } from "../../DataLoadError/DataLoadError";
import { useStatisticsTable } from "../../../hooks/useTables/useStatisticsTable";


export function StatisticsTable() {
	const { 
		statistics,
		amountStatistics,
		page, 
		rowsPerPage,
		error,
		handleUpdateTable,
		handleChangePage, 
		handleChangeRowsPerPage,
	} = useStatisticsTable();

	return (
		<div className="table">
			<StatisticsTitleRow />

			<div className="rows-container">
				{ !error
					?	<div className="rows">
							{ statistics.map((item, index) => 
									<StatisticsRow 
										key={ item.id }
										statistics={ item } 
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
				amountItems={ amountStatistics }
				page={ page }
				handleChangePage={ handleChangePage }
				rowsPerPage={ rowsPerPage }
				handleChangeRowsPerPage={ handleChangeRowsPerPage }
			/>
		</div>
	)
}
