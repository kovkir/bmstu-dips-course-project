import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';

import AuthService from '../../services/AuthService';


export function useMiniDrawer() {
	const theme = useTheme();
	const [open, setOpen] = useState(false);
	const [isAuth, setIsAuth] = useState(AuthService.isAuth());

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const changeIsAuth = (value: boolean) => {
		setIsAuth(value);
	};

	return { 
		theme,
		open,
		isAuth,
		handleDrawerOpen,
		handleDrawerClose,
		changeIsAuth,
	};
};
