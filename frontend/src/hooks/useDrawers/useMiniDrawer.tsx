import { useState } from 'react';
import { useTheme } from '@mui/material/styles';


export function useMiniDrawer() {
	const theme = useTheme();
	const [open, setOpen] = useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return { theme, open, handleDrawerOpen, handleDrawerClose };
};
