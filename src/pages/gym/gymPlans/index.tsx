import clsx from 'clsx';
import { useState, useRef } from 'react';
import Button from '../../../base-components/Button';
import Pagination from '../../../base-components/Pagination';
import {
	FormCheck,
	FormInput,
	FormSelect,
} from '../../../base-components/Form';
import Lucide from '../../../base-components/Lucide';
import Tippy from '../../../base-components/Tippy';
import { Dialog, Menu } from '../../../base-components/Headless';
import Table from '../../../base-components/Table';
import { IGymUser } from '../../../interfaces';
import { Role } from '../../../constants';
import { FA_IR, FA_IR_ROLES } from '../../../language';
import exportFromJSON from 'export-from-json';
import { Link } from 'react-router-dom';
import { useGymPlan } from '../../../hooks';

const TableTitle = [
	FA_IR.FullName,
	FA_IR.PhoneNumber2,
	FA_IR.AccountStatus,
	FA_IR.Role,
	FA_IR.Plan,
];


function Main() {
	const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
	const { data: gymPlan } = useGymPlan(); 
	return (
		<>
			<h2 className="mt-10 rtl text-lg font-medium intro-y">
				{FA_IR.GymPlans}
			</h2>
			<div className="grid grid-cols-12 gap-6 mt-5">
				<div className="flex flex-wrap items-center gap-2 col-span-12 mt-2 intro-y xl:flex-nowrap">
					<Menu>
						<Menu.Button as={Button} className="px-2 !box">
							<span className="flex items-center justify-center w-5 h-5">
								<Lucide icon="Plus" className="w-4 h-4" />
							</span>
						</Menu.Button>
						<Menu.Items placement="bottom-start" className="rtl mt-1 w-40">
							<Menu.Item
								onClick={() => {
									if (!gymPlan) return;
									exportFromJSON({
										data: gymPlan,
										fileName: 'users-list-csv',
										exportType: 'csv',
									});
								}}
							>
								<Lucide icon="FileText" className="w-4 h-4 ml-2" />
								{FA_IR.ExportCsv}
							</Menu.Item>
							<Menu.Item
								onClick={() => {
									if (!gymPlan) return;
									exportFromJSON({
										data: gymPlan,
										fileName: 'users-list-excel',
										exportType: 'xls',
									});
								}}
							>
								<Lucide icon="Sheet" className="w-4 h-4 ml-2" />
								{FA_IR.ExportExcle}
							</Menu.Item>
						</Menu.Items>
					</Menu>
					<Button
						as={Link}
						to="/dashboard/requests"
						variant="primary"
						className="shadow-md"
					>
						{FA_IR.AddPlan}
					</Button>
					<div className="flex-grow"></div>
					{selectedUsers.length > 0 && (
						<Button variant="danger" className="mr-2 intro-x dark:bg-rose-500">
							{FA_IR.DeleteSelectedUsers} ({selectedUsers.length})
						</Button>
					)}
				</div>

			</div>
		</>
	);
}

export default Main;
