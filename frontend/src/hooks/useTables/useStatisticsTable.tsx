import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import qs from 'qs';

import StatisticsService from '../../services/StatisticsService';
import { IStatistics } from '../../interfaces/Statistics/IStatistics';


export function useStatisticsTable() {
	let pageInitValue;
	let rowsPerPageInitValue;

	if (window.location.search) {
		const params = qs.parse(window.location.search.substring(1));
		pageInitValue = Number(params.page);
		rowsPerPageInitValue = Number(params.rowsPerPage);
	} else {
		pageInitValue = 0;
		rowsPerPageInitValue = 20;
	}

	const [statistics, setStatistics] = useState<IStatistics[]>([]);
	const [amountStatistics, setAmountStatistics] = useState(0);
	const [page, setPage] = useState(pageInitValue);
	const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageInitValue);
	const [error, setError] = useState(false);
	const navigate = useNavigate();

	const handleChangePage = (
		event: React.MouseEvent<HTMLButtonElement> | null, 
		newPage: number
	) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

	const handleUpdateTable = async () => {
		await fetchStatistics();
	};

	async function fetchStatistics() {
		const response = await StatisticsService.getAll(page, rowsPerPage);
		if (response) {
			setError(false);
			setStatistics(response.data.items);
			setAmountStatistics(response.data.totalElements);
		} else {
			setError(true);
			setStatistics([]);
			setAmountStatistics(0);
		}
	};

	useEffect(() => {
		const queryString = qs.stringify({
			page,
			rowsPerPage,
		});
		navigate(`?${queryString}`);

		fetchStatistics();
	}, [page, rowsPerPage]);

	return { 
		statistics,
		amountStatistics,
		page, 
		rowsPerPage,
		error,
		handleUpdateTable,
		handleChangePage, 
		handleChangeRowsPerPage,
	};
};
