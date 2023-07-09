import clsx from 'clsx';
import { useState, useRef } from 'react';
import Button from '../../../base-components/Button';
import Pagination from '../../../base-components/Pagination';
import { FormCheck, FormInput, FormSelect } from '../../../base-components/Form';
import Lucide from '../../../base-components/Lucide';
import Tippy from '../../../base-components/Tippy';
import { Dialog, Menu } from '../../../base-components/Headless';
import Table from '../../../base-components/Table';
import { IGymUser } from '../../../interfaces';
import { Role } from '../../../constants';
import { FA_IR, FA_IR_ROLES } from '../../../language';
import exportFromJSON from 'export-from-json';
import { Link } from 'react-router-dom';


const TableTitle = [
	FA_IR.FullName,
	FA_IR.PhoneNumber2,
	FA_IR.AccountStatus,
	FA_IR.Role,
	FA_IR.Plan,
];

const MockData: IGymUser[] = [
  {
    id: '1',
		name: 'منا احمدی',
		profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    role: Role.Trainee,
    email: 'mjndss@gmail.com',
    phoneNumber: '09123456789',
		status: false,
		plan: {
      name: 'کاراته',
      id: '1',
		},
  },
  {
    id: '21',
		name: 'میری مدیری',
		profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    role: Role.GymOwner,
    email: 'mjndss@gmail.com',
    phoneNumber: '09123456789',
		status: false,
		plan: {
      name: 'کاراته',
      id: '1',
		},
	},
];

function Main() {
	const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const deleteButtonRef = useRef(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

	return (
		<>
			<h2 className="mt-10 rtl text-lg font-medium intro-y">
				{FA_IR.GymUsers}
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
									if (!MockData) return;
									exportFromJSON({
										data: MockData,
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
									if (!MockData) return;
									exportFromJSON({
										data: MockData,
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
						{FA_IR.InviteTrainer}
					</Button>
					<div className="flex-grow"></div>
					{selectedUsers.length > 0 && (
						<Button variant="danger" className="mr-2 intro-x dark:bg-rose-500">
							{FA_IR.DeleteSelectedUsers} ({selectedUsers.length})
						</Button>
					)}
					<div className="flex items-center  w-full mt-3 xl:w-auto xl:mt-0">
						<FormSelect className="w-56 ml-2 xl:w-auto !box">
							<option>{FA_IR.AccountStatus}</option>
							<option>{FA_IR.Active}</option>
							<option>{FA_IR.InActive}</option>
						</FormSelect>
					</div>
				</div>
				{/* BEGIN: Data List */}
				<div className="col-span-12 overflow-auto intro-y 2xl:overflow-visible">
					<Table className="border-spacing-y-[10px] border-separate -mt-2">
						<Table.Thead>
							<Table.Tr>
								<Table.Th className="border-b-0 whitespace-nowrap">
									<FormCheck.Input
										type="checkbox"
										onChange={(e) => {
											e.currentTarget.checked
												? setSelectedUsers(MockData.map((user) => user.id))
												: setSelectedUsers([]);
										}}
									/>
								</Table.Th>

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
							{MockData.map((faker) => (
								<Table.Tr key={faker.id} className="intro-x">
									<Table.Td className="first:rounded-l-md last:rounded-r-md w-10 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
										<FormCheck.Input
											checked={!!selectedUsers.includes(faker.id)}
											onChange={(e) =>
												!e.currentTarget.checked
                          ? setSelectedUsers((state) =>
                              state.filter((id) => id !== faker.id)
													  )
													: setSelectedUsers((state) => [...state, faker.id])
											}
											type="checkbox"
										/>
									</Table.Td>
									<Table.Td className="first:rounded-l-md last:rounded-r-md !py-3.5 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
										<div className="flex items-center">
											<div className="w-9 h-9 image-fit zoom-in">
												<Tippy
													as="img"
													alt="Midone - HTML Admin Template"
													className="border-white rounded-lg shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]"
													src={faker.profileImage}
													content={faker.name}
												/>
											</div>
											<div className="ml-4">
												<span className="font-medium whitespace-nowrap">
													{faker.name}
												</span>
												<div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
													{faker.email}
												</div>
											</div>
										</div>
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
											{faker.phoneNumber}
										</Tippy>
									</Table.Td>
									<Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
										<div
											className={clsx([
												'flex items-center justify-center',
												{ 'text-success': faker.status },
												{ 'text-danger dark:text-rose-400': !faker.status },
											])}
										>
											<Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />
											{faker.status ? FA_IR.Active : FA_IR.InActive}
										</div>
									</Table.Td>
									<Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
										{FA_IR_ROLES[faker.role]}
									</Table.Td>
									<Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
										{faker.role === Role.GymOwner ? '-' : faker.plan.name}
									</Table.Td>

									<Table.Td className="first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
										{faker.role !== Role.GymOwner && (
											<div className="flex items-center justify-center">
												<span
													className="flex items-center cursor-pointer text-danger dark:text-rose-400"
													onClick={() => {
														setDeleteConfirmationModal(true);
													}}
												>
													<Lucide icon="Trash2" className="w-4 h-4 mr-1" />
													{FA_IR.DeleteUser}
												</span>
											</div>
										)}
									</Table.Td>
								</Table.Tr>
							))}
						</Table.Tbody>
					</Table>
				</div>
				{/* END: Data List */}
			</div>
			{/* BEGIN: Delete Confirmation Modal */}
			<Dialog
				open={deleteConfirmationModal}
				onClose={() => {
					setDeleteConfirmationModal(false);
				}}
				initialFocus={deleteButtonRef}
			>
				<Dialog.Panel>
					<div className="p-5 text-center">
						<Lucide
							icon="XCircle"
							className="w-16 h-16 mx-auto mt-3 text-danger"
						/>
						<div className="mt-5 text-3xl">{FA_IR.DeleteUser}</div>
						<div className="mt-2 text-slate-500">
							{FA_IR.DeleteConfirm} <br />
							{FA_IR.ProcessPermanent}
						</div>
					</div>
					<div className="px-5 pb-8 text-center">
						<Button
							variant="outline-secondary"
							type="button"
							onClick={() => {
								setDeleteConfirmationModal(false);
							}}
							className="w-24 mr-1"
						>
							Cancel
						</Button>
						<Button
							variant="danger"
							type="button"
							className="w-24"
							ref={deleteButtonRef}
						>
							Delete
						</Button>
					</div>
				</Dialog.Panel>
			</Dialog>
			{/* END: Delete Confirmation Modal */}
		</>
	);
}

export default Main;
