import { useRoutes } from "react-router-dom";
// import SimpleMenu from "../layouts/SimpleMenu";
import SideMenu from '../layouts/SideMenu';
import AddGymPage from "../pages/gym/addGym";
import FindGymPage from "../pages/gym/findGym";
import LandingPage from "../pages/landing";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import ForgetPassword from "../pages/auth/forgetpass";	
import ForgetPasswordOtp from '../pages/auth/forgetpass/otp';	
import ResetPassword from '../pages/auth/forgetpass/reset';	
import NotFoundPage from "../pages/NotFoundPage";
import GymListPage from '../pages/gym/listGym';
import GymUserListPage from '../pages/gym/gymUsers';
import VerifyPage from "../pages/VerifyPage";
import LogoutPage from "../pages/LogoutPage";


function Router() {
	const routes = [
		{
			path: '/',
			element: <LandingPage />,
		},
		{
			path: '/auth',
			children: [
				{
					path: 'login',
					element: <Login />,
				},
				{
					path: 'register',
					element: <Register />,
				},
				{
					path: 'forget-password',
					element: <ForgetPassword />,
				},
				{
					path: 'forget-password/otp',
					element: <ForgetPasswordOtp />,
				},
				{
					path: 'forget-password/reset',
					element: <ResetPassword />,
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
				{
					path: 'gym/list',
					element: <GymListPage />,
				},
				{
					path: 'gym/users',
					element: <GymUserListPage />,
				},
				{
					path: 'verify',
					element: <VerifyPage />,
				},
				{
					path: 'logout',
					element: <LogoutPage />,
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
