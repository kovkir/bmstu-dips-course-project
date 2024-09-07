import { Route, Routes } from 'react-router-dom';

import "./App.css";
import { AuthorizationPage } from './pages/AuthorizationPage';
import { FlightsPage } from './pages/FlightsPage';
import { NetworkErrorPage } from './pages/NetworkErrorPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { MiniDrawer } from './components/Drawer/MiniDrawer';
import { useMiniDrawer } from './hooks/useDrawers/useMiniDrawer';


function App() {
	const { 
		theme,
		open,
		isAuth,
		handleDrawerOpen,
		handleDrawerClose,
		changeIsAuth,
	} = useMiniDrawer();

	return (
		<div className="app-container">
			<MiniDrawer
				theme={ theme }
				open={ open }
				isAuth={ isAuth }
				handleDrawerOpen={ handleDrawerOpen }
				handleDrawerClose={ handleDrawerClose }
				changeIsAuth={ changeIsAuth }
			>
				<Routes>
					<Route 
						path="/" 
						element={ <FlightsPage openMiniDrawer={ open }/> }
					/>
					<Route 
						path="/authorization" 
						element={ <AuthorizationPage changeIsAuth={ changeIsAuth }/> }
					/>
					<Route 
						path="/network_error/" 
						element={ <NetworkErrorPage openMiniDrawer={ open }/> }
					/>
					<Route 
						path="*" 
						element={ <NotFoundPage openMiniDrawer={ open }/> }
					/>
				</Routes>
			</MiniDrawer>
		</div>
	)
}

export default App;
