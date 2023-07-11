import clsx from 'clsx';
import { useState, useRef } from 'react';
import Button from '../../../base-components/Button';
import Pagination from '../../../base-components/Pagination';
import { FormCheck, FormInput, FormLabel, FormSelect } from '../../../base-components/Form';
import Lucide from '../../../base-components/Lucide';
import Tippy from '../../../base-components/Tippy';
import { Dialog, Menu } from '../../../base-components/Headless';
import Table from '../../../base-components/Table';
import { Role } from '../../../constants';
import { FA_IR, FA_IR_ERROR, FA_IR_ROLES } from '../../../language';
import exportFromJSON from 'export-from-json';
import { Link } from 'react-router-dom';
import { useGetTrainersCompleteList, useGymUsers, useMyGymList } from '../../../hooks';
import { Field, Form, Formik } from 'formik';
import { usePostTrainerRequest } from '../../../hooks/fetch/useRequest';
import { toast } from 'react-toastify';


const initialValues = {
	trainer_id: '',
}

const TableTitle = [
	FA_IR.FullName,
	FA_IR.Id,
	FA_IR.PhoneNumber2,
	FA_IR.Role,
];


function Main() {

	const {data: trainersCompleteList} = useGetTrainersCompleteList();
	const [selectedGym, setSelectedGym] = useState<string>('');
	const {data: usersList} = useGymUsers(selectedGym);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
	const { data: gymList } = useMyGymList();
	const {mutate: inviteTrainerMutate} = usePostTrainerRequest();
	const [openInviteTrainer, setOpenInviteTrainer] = useState<boolean>(false);
	const inviteTrainerRef = useRef(null);
	const inviteTrainer = (value: typeof initialValues, { resetForm }: any) => {
		inviteTrainerMutate(
			{
				...value,
				gym_id: selectedGym,
			},
			{
				onSuccess: () => {
					setOpenInviteTrainer(false);
					toast.success(FA_IR.InvitationSent);
					resetForm();
				},
				onError: () => {
					resetForm();
					toast.error(FA_IR_ERROR.InvitaionNotSent);
				},
			}
		);
	};
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
									if (!usersList) return;
									exportFromJSON({
										data: usersList,
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
									if (!usersList) return;
									exportFromJSON({
										data: usersList,
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
						onClick={() => {
							if (!selectedGym) {
								toast.error(FA_IR_ERROR.SelectGym);
								return;
							}
							setOpenInviteTrainer(true);
						}}
						variant="primary"
						className="mr-2 intro-x"
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
						<FormSelect
							onChange={(e) => setSelectedGym(e.currentTarget.value)}
							className="w-56 ml-2 xl:w-auto !box"
						>
							<option>{FA_IR.SelectGym}</option>
							{gymList?.map((gym) => (
								<option key={gym.id} value={gym.id}>
									{gym.name}
								</option>
							))}
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
												? setSelectedUsers(
														usersList?.map((user: any) => user.id)
												  )
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
							{usersList?.map((faker: any) => (
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
									<Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
										{faker.id}
									</Table.Td>
									<Table.Td className="first:rounded-l-md last:rounded-r-md !py-3.5 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
										<div className="flex items-center">
											<div>
												<span className="font-medium whitespace-nowrap">
													{`${faker.first_name} ${faker.last_name}`}
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
											{faker.phone_number}
										</Tippy>
									</Table.Td>
									<Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
										{FA_IR_ROLES[faker.role as Role]}
									</Table.Td>
								</Table.Tr>
							))}
						</Table.Tbody>
					</Table>
				</div>

				<Dialog
					open={openInviteTrainer}
					onClose={() => {
						setOpenInviteTrainer(false);
					}}
					initialFocus={inviteTrainerRef}
				>
					<Dialog.Panel>
						<Formik initialValues={initialValues} onSubmit={inviteTrainer}>
							{({ isSubmitting }) => (
								<Form>
									<div className="p-5 text-center">
										<Lucide
											icon="PlusCircle"
											className="w-16 h-16 mx-auto mt-3 text-primary"
										/>
										<div className="mt-5 text-3xl">{FA_IR.InviteTrainer}</div>
									</div>
									<div className="px-5 pb-8">
										<div className="grid grid-cols-12 gap-4 row-gap-3">
											<div className="rtl col-span-12">
												<FormLabel>{FA_IR.Trainer}</FormLabel>
												<Field
													as={FormInput}
													name="trainer_id"
													type="text"
													className="mt-2"
													placeholder={FA_IR.TrainerId}
													list="trainer"
												>
													<datalist id="trainer">
														{trainersCompleteList?.map((trainer: any) => (
															<option
																value={trainer.id}
															>{`${trainer.user.first_name} ${trainer.user.last_name}`}</option>
														))}
													</datalist>
												</Field>
											</div>
										</div>
									</div>

									<div className="px-5 pb-8 text-center">
										<Button
											type="button"
											variant="outline-secondary"
											onClick={() => {
												setOpenInviteTrainer(false);
											}}
											className="w-32 ml-4"
										>
											{FA_IR.Cancel}
										</Button>
										<Button
											disabled={isSubmitting}
											type="submit"
											variant="primary"
											className="w-32"
											ref={inviteTrainerRef}
										>
											{FA_IR.SendInvitaion}
										</Button>
									</div>
								</Form>
							)}
						</Formik>
					</Dialog.Panel>
				</Dialog>
				{/* END: Data List */}
			</div>
		</>
	);
}

export default Main;
