import * as React from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import GroupsIcon from '@mui/icons-material/Groups';
import FlightIcon from '@mui/icons-material/Flight';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import BarChartIcon from '@mui/icons-material/BarChart';

import { DrawerNavBar } from './DrawerNavBar';
import { DrawerListItem } from './DrawerListItem';
import { useDropdownList } from '../../hooks/useDrawers/useDropdownList';


export const drawerWidth = 250;

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
	({ theme, open }) => ({
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
		boxSizing: 'border-box',
		...(open && {
			...openedMixin(theme),
			'& .MuiDrawer-paper': openedMixin(theme),
		}),
		...(!open && {
			...closedMixin(theme),
			'& .MuiDrawer-paper': closedMixin(theme),
		}),
	}),
);

interface MiniDrawerProps {
	theme: Theme
	open: boolean
	handleDrawerOpen: () => void
	handleDrawerClose: () => void
	children?: React.ReactNode
}

export function MiniDrawer(props: MiniDrawerProps) {
	const dropdownList = useDropdownList();
	
	return (
		<Box sx={{ display: 'flex'}}>
			<DrawerNavBar
				open={ props.open }
				handleDrawerOpen={ props.handleDrawerOpen }
				handleDrawerClose={ () => {
					dropdownList.handleClose();
					props.handleDrawerClose();
				}}
			/>

			<Drawer variant="permanent" open={ props.open }>
				<DrawerHeader />
				<Divider />
				<List>
					<DrawerListItem
						openDrawer={ props.open }
						text="Список полетов"
						link="/"
						icon={ <FlightIcon /> }
					/>
					<DrawerListItem
						openDrawer={ props.open }
						text="Билеты"
						link="/"
						icon={ <AirplaneTicketIcon /> }
					/>
					<DrawerListItem
						openDrawer={ props.open }
						text="Аккаунт"
						link="/"
						icon={ <AccountBoxIcon /> }
					/>
					<DrawerListItem
						openDrawer={ props.open }
						text="Пользователи"
						link="/"
						icon={ <GroupsIcon /> }
					/>
					<DrawerListItem
						openDrawer={ props.open }
						text="Статистика"
						link="/"
						icon={ <BarChartIcon /> }
					/>
				</List>
				<Divider />
			</Drawer>

			<Box 
				component="main" 
				sx={{ flexGrow: 1 }}
			>
				<DrawerHeader />
				{ props.children }
			</Box>
		</Box>
	);
}
