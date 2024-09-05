import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import "./Drawer.css";
import { drawerWidth } from './MiniDrawer';
import { NavBarButton } from "../Buttons/NavBarButton";
import { AuthorizeButton } from '../Buttons/AuthorizeButton';
import { RegisterButtom } from '../Buttons/RegisterButtom';


interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

interface DrawerNavBarProps {
	open: boolean
	handleDrawerOpen: () => void
	handleDrawerClose: () => void
}

export function DrawerNavBar({ open, handleDrawerOpen, handleDrawerClose }: DrawerNavBarProps) {
	return (
		<AppBar position="fixed" open={ false }>
			<Toolbar>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					onClick={ open ? handleDrawerClose : handleDrawerOpen }
					edge="start"
				>
					<MenuIcon />
				</IconButton>

				<NavBarButton 
					text="СПО УС ПОИ"
					link="/"
				/>

				<div className="authorization-block">
					<div className="authorization-button-container">
						<AuthorizeButton 
							text="Войти"
							link="/"
						/>
					</div>

					<div className="authorization-button-container">
						<RegisterButtom 
							text="Зарегистрироваться"
							link="/"
						/>
					</div>
				</div>
			</Toolbar>
		</AppBar>
	);
}
