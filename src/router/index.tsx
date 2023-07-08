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
