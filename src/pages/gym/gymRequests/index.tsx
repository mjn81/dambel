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
import { FA_IR, FA_IR_ERROR, FA_IR_ROLES } from '../../../language';
import exportFromJSON from 'export-from-json';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../redux/hooks';
import { useGetAddGymRequests, useGetTrainerRequests, usePostAcceptTraineeRequest, usePostAcceptTrainerRequest } from '../../../hooks/fetch/useRequest';
import { useMyGymList } from '../../../hooks';
import { toast } from 'react-toastify';

const TableTitleOwner = [
	FA_IR.Id,
	FA_IR.FullName,
	FA_IR.Date,
	FA_IR.Plan,
];

const TableTitleTrainer = [ 
  FA_IR.GymName,
  FA_IR.FullNameOwner,
  FA_IR.City,
  FA_IR.Address,
]

function Main() {
  const {mutate: acceptTrainee} = usePostAcceptTraineeRequest();
  const auth = useAppSelector((state) => state.auth);
  const enableAddRequest = (auth.role as Role) !== Role.Trainer;
  const { data: addRequests, refetch: refetchRequests } =
		useGetAddGymRequests(enableAddRequest);
  const { data: trainerRequests } = useGetTrainerRequests(!enableAddRequest);
  const data = enableAddRequest ? addRequests : trainerRequests;
  const isOwner = (auth.role as Role) === Role.GymOwner;
  const TableTitle = enableAddRequest ? TableTitleOwner : TableTitleTrainer;
	const {mutate: acceptTrainerMutate} = usePostAcceptTrainerRequest();
	return (
		<>
			<h2 className="mt-10 rtl text-lg font-medium intro-y">
				{FA_IR.Requests}
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
									if (!data) return;
									exportFromJSON({
										data,
										fileName: 'requests-list-csv',
										exportType: 'csv',
									});
								}}
							>
								<Lucide icon="FileText" className="w-4 h-4 ml-2" />
								{FA_IR.ExportCsv}
							</Menu.Item>
							<Menu.Item
								onClick={() => {
									if (!data) return;
									exportFromJSON({
										data,
										fileName: 'requests-list-excel',
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
				{/* BEGIN: Data List */}
				<div className="col-span-12 overflow-auto intro-y 2xl:overflow-visible">
					<Table className="border-spacing-y-[10px] border-separate -mt-2">
						<Table.Thead>
							<Table.Tr>
								{TableTitle.map((title, index) => (
									<Table.Th
										key={index}
										className={clsx([
											'text-center',
											'border-b-0 whitespace-nowrap',
										])}
									>
										{title}
									</Table.Th>
								))}
							</Table.Tr>
						</Table.Thead>
						{enableAddRequest ? (
							<Table.Tbody>
								{data?.map((faker: any) => (
									<Table.Tr key={faker.id} className="intro-x">
										<Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
											<Tippy
												onClick={() => {
													// Copy the text inside the text field
													navigator.clipboard.writeText(faker.phoneNumber);
												}}
												content={FA_IR.Copy}
												className="flex items-center justify-center underline decoration-dotted"
											>
												{faker.id}
											</Tippy>
										</Table.Td>

										<Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
											{`${faker.trainee.user.first_name} ${faker.trainee.user.last_name}`}
										</Table.Td>
										<Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
											{new Date(faker.created_at).toLocaleDateString('fa-IR')}
										</Table.Td>
										<Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
											{faker.plan.name}
										</Table.Td>

										{isOwner && (
											<Table.Td className="first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
												<div className="flex items-center justify-center">
													<span
														className="flex underline items-center cursor-pointer text-success dark:text-lime-400"
														onClick={() => {
															acceptTrainee(
																{
																	trainee_id: faker.trainee.id,
																	plan_id: faker.plan.id,
																},
																{
																	onSuccess: () => {
																		refetchRequests();
																		toast.success(FA_IR.TraineeAccepted);
																	},
																	onError: () => {
																		toast.error(FA_IR_ERROR.TraineeAcceptError);
																	},
																}
															);
														}}
													>
														<Lucide
															icon="CheckCircle"
															className="w-4 h-4 mr-1"
														/>
														{FA_IR.AcceptTrainee}
													</span>
												</div>
											</Table.Td>
										)}
									</Table.Tr>
								))}
							</Table.Tbody>
						) : (
							<Table.Tbody>
								{data?.map((faker: any) => (
									<Table.Tr key={faker.id} className="intro-x">
				
										<Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
											{faker.gym.name}
										</Table.Td>
				
										<Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
											{`${faker.gym.gym_owner.user.first_name} ${faker.gym.gym_owner.user.last_name}`}
										</Table.Td>
										<Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
											{faker.gym.city.name}
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
												{faker.gym.location.address}
											</Tippy>
										</Table.Td>
										{(auth.role as Role) === Role.Trainer && (
											<Table.Td className="first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
												<div className="flex items-center justify-center">
													<span
														className="flex underline items-center cursor-pointer text-success dark:text-lime-400"
														onClick={() => {
															acceptTrainerMutate(
																{
																	gym_id: faker.gym.id,
																},
																{
																	onSuccess: () => {
																		refetchRequests();
																		toast.success(FA_IR.AcceptedSuccess);
																	},
																	onError: () => {
																		toast.error(FA_IR_ERROR.AcceptedError);
																	},
																}
															);
														}}
													>
														<Lucide
															icon="CheckCircle"
															className="w-4 h-4 mr-1"
														/>
														{FA_IR.AcceptInvitation}
													</span>
												</div>
											</Table.Td>
										)}
									</Table.Tr>
								))}
							</Table.Tbody>
						)}
					</Table>
				</div>
				{/* END: Data List */}
			</div>
		</>
	);
}

export default Main;
