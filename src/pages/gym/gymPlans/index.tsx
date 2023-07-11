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
	FA_IR.PlanName,
	FA_IR.TimeStart,
	FA_IR.TimeEnd,
	FA_IR.PlanPrice,
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
										fileName: 'gym-plan-csv',
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
										fileName: 'gym-plan-xls',
										exportType: 'xls',
									});
								}}
							>
								<Lucide icon="Sheet" className="w-4 h-4 ml-2" />
								{FA_IR.ExportExcle}
							</Menu.Item>
						</Menu.Items>
					</Menu>


				</div>

			</div>
			<Table className="border-spacing-y-[10px] border-separate -mt-2">
				<Table.Thead>
					<Table.Tr>

						{TableTitle.map((title, index) => (
							<Table.Th
								key={index}
								className={clsx([
									index !== 0 ? 'text-center' : '',
									'border-b-0 whitespace-nowrap',
								])}
							>
								{title}
							</Table.Th>
						))}
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>
					{gymPlan?.map((faker: any) => (
						<Table.Tr key={faker.id} className="intro-x">

							<Table.Td className="first:rounded-l-md last:rounded-r-md  bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
								{faker.name}
							</Table.Td>
							<Table.Td className="first:rounded-l-md last:rounded-r-md !py-3.5 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center">
							
									{`${faker.time_start} `}
							
							</Table.Td>
							<Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
								<Tippy
									onClick={() => {
										// Copy the text inside the text field
										navigator.clipboard.writeText(faker.phoneNumber);
									}}
									content={FA_IR.Copy}
									className="flex items-center justify-center underline decoration-dotted"
								>
									{faker.time_end}
								</Tippy>
							</Table.Td>
							<Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
								{faker.price}
							</Table.Td>
						</Table.Tr>
					))}
				</Table.Tbody>
			</Table>
		</>
	);
}

export default Main;
