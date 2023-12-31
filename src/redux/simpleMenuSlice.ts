import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { icons } from "../base-components/Lucide";
import { Role } from "../constants";
import { FA_IR } from "../language";

export interface Menu {
  icon: keyof typeof icons;
  title: string;
  pathname?: string;
  subMenu?: Menu[];
  ignore?: boolean;
  roles: Role[];
}

export interface SimpleMenuState {
  menu: Array<Menu | "divider">;
}

const initialState: SimpleMenuState = {
	menu: [
		{
			icon: 'Map',
			title: FA_IR.FindGym,
			roles: [Role.GymOwner, Role.Trainer, Role.Trainee],
			subMenu: [
				{
					icon: 'MapPin',
					pathname: '/dashboard',
					title: FA_IR.FindByLocation,
					roles: [Role.GymOwner, Role.Trainer, Role.Trainee],
				},
				{
					icon: 'Globe',
					title: FA_IR.GymList,
					pathname: '/dashboard/gyms',
					roles: [Role.GymOwner, Role.Trainer, Role.Trainee],
				},
			],
		},
		{
			icon: 'Box',
			title: FA_IR.MyGyms,
			roles: [Role.GymOwner, Role.Trainer, Role.Trainee],
			subMenu: [
				{
					icon: 'List',
					pathname: '/dashboard/gym/list',
					title: FA_IR.GymList,
					roles: [Role.GymOwner, Role.Trainer, Role.Trainee],
				},
				{
					icon: 'PlusCircle',
					pathname: '/dashboard/gym/add',
					title: FA_IR.AddGym,
					roles: [Role.GymOwner],
				},
				{
					icon: 'Users',
					pathname: '/dashboard/gym/users',
					title: FA_IR.GymUsers,
					roles: [Role.GymOwner],
				},
			],
		},
		{
			icon: 'Calendar',
			title: FA_IR.GymPlans,
			pathname: '/dashboard/plan/list',
			roles: [Role.Trainee],
		},
		// {
		// 	icon: 'MessageSquare',
		// 	title: FA_IR.Chat,
		// 	pathname: '/dashboard/chat',
		// 	roles: [Role.GymOwner, Role.Trainer, Role.Trainee],
		// },
		{
			icon: 'Inbox',
			title: FA_IR.Requests,
			pathname: '/dashboard/requests',
			roles: [Role.GymOwner, Role.Trainer, Role.Trainee],
		},
		{
			icon: 'Settings',
			title: FA_IR.Settings,
			roles: [Role.GymOwner, Role.Trainer, Role.Trainee],
			subMenu: [
				{
					icon: 'CheckCircle',
					pathname: '/dashboard/verify',
					title: FA_IR.Verify,
					roles: [Role.GymOwner, Role.Trainer, Role.Trainee],
				},
				{
					icon: 'Trello',
					pathname: '/dashboard/profile',
					title: FA_IR.Profile,
					roles: [Role.GymOwner, Role.Trainer, Role.Trainee],
				},
				{
					icon: 'LogOut',
					pathname: '/dashboard/logout',
					title: FA_IR.Logout,
					roles: [Role.GymOwner, Role.Trainer, Role.Trainee],
				},
			],
		},
	],
};

export const simpleMenuSlice = createSlice({
  name: "simpleMenu",
  initialState,
  reducers: {},
});

export const selectSimpleMenu = (state: RootState) =>
{	
	const filteredList = [];
	for (let i = 0; i < state.simpleMenu.menu.length; i++) {
		const item = state.simpleMenu.menu[i];
		if (item === 'divider') {
			filteredList.push(item);
			continue;
		}
		if (item.roles.includes(state.auth.role as Role)) {
			filteredList.push({
				...item,
				subMenu: item.subMenu?.filter((subItem) =>
					subItem.roles.includes(state.auth.role as Role)
				),
			 });
		}
	}	
	return filteredList;
	
	}
;

export default simpleMenuSlice.reducer;
