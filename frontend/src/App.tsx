import { Route, Routes } from 'react-router-dom';

import "./App.css";
import { FlightsPage } from './pages/FlightsPage';
import { NetworkErrorPage } from './pages/NetworkErrorPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { MiniDrawer } from './components/Drawer/MiniDrawer';
import { useMiniDrawer } from './hooks/useDrawers/useMiniDrawer';


function App() {
	const { 
		theme,
		open,
		handleDrawerOpen,
		handleDrawerClose
	} = useMiniDrawer();

	return (
		<div className="app-container">
			<MiniDrawer
				theme={ theme }
				open={ open }
				handleDrawerOpen={ handleDrawerOpen }
				handleDrawerClose={ handleDrawerClose }
			>
				<Routes>
					<Route 
						path="/" 
						element={ <FlightsPage openMiniDrawer={ open }/> }
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
