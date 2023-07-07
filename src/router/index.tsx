import { useRoutes } from "react-router-dom";
// import SimpleMenu from "../layouts/SimpleMenu";
import SideMenu from '../layouts/SideMenu';
import AddGymPage from "../pages/gym/addGym";
import FindGymPage from "../pages/gym/findGym";
import LandingPage from "../pages/landing";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import { NotFoundPage } from "../pages/NotFoundPage";
import { ProtectionWrapper } from "../components/Wrappers/ProtectionWrapper";

function Router() {
	const routes = [
		{
			path: '/',
			element: <LandingPage />,
		},
		{
			path: '/auth',
			element: <ProtectionWrapper />,
			children: [
				{
					path: 'login',
					element: <Login />,
				},
				{
					path: 'register',
					element: <Register />,
				},
			],
		},
		{
			path: '/dashboard',
			element: <SideMenu />,
			children: [
				{
					path: '',
					element: <FindGymPage />,
				},
				{
					path: 'gym/add',
					element: <AddGymPage />,
				},
			],
		},
		// not found page
		{
			path: '*',
			element: <NotFoundPage />,
		},
	];

	return useRoutes(routes);
}

export default Router;
