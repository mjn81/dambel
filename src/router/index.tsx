import { useRoutes } from "react-router-dom";
import SimpleMenu from "../layouts/SimpleMenu";
import Page1 from "../pages/Page1";
import Page2 from "../pages/Page2";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import { NotFoundPage } from "../pages/NotFoundPage";
import Landing from "../pages/landing";


function Router() {
	const routes = [{
		path: '/',
		element: <Landing />
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/register',
		element: <Register />,
	},
	{
		path: '/dashboard',
		element: <SimpleMenu />,
		children: [
			{
				path: '',
				element: <Page1 />,
			},
			{
				path: 'page-2',
				element: <Page2 />,
			},
		],
	},
	// not found page
	{
		path: '*',
		element: <NotFoundPage />,
	}
	];

	return useRoutes(routes);
}

export default Router;
