import { useRoutes } from "react-router-dom";
// import SimpleMenu from "../layouts/SimpleMenu";
import SideMenu from '../layouts/SideMenu';
import AddGymPage from "../pages/gym/addGym";
import FindGymPage from "../pages/gym/findGym";
import LandingPage from "../pages/landing";
import { Login } from "../pages/auth/login";
import { Register } from '../pages/auth/register';
import ForgetPassword from "../pages/auth/forgetpass";	
import ForgetPasswordOtp from '../pages/auth/forgetpass/otp';	
import ResetPassword from '../pages/auth/forgetpass/reset';	
import NotFoundPage from "../pages/NotFoundPage";
import GymListPage from '../pages/gym/listGym';
import GymUserListPage from '../pages/gym/gymUsers';
import GymProfile from '../pages/gym/gymProfile';
import GymSearchListPage from '../pages/gym/searchGym';
import GymPlanPage from '../pages/gym/gymPlans';
import EditGymPage from '../pages/gym/gymEdit';
import VerifyPage from "../pages/VerifyPage";
import LogoutPage from "../pages/LogoutPage";
import GymRequestPages from "../pages/gym/gymRequests";
import UserProfile from '../pages/profile';


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
					path: 'gyms',
					element: <GymSearchListPage />
				},
				{
					path: 'gym/:id',
					element: <GymProfile />,
				},
				{
					path: 'plan/list',
					element: <GymPlanPage />,
				},
				{
					path: 'gym/add',
					element: <AddGymPage />,
				},
				{
					path: 'gym/edit/:id',
					element: <EditGymPage />,
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
					path: 'requests',
					element: <GymRequestPages />,
				},
				{
					path: 'profile',
					element: <UserProfile />,
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
