import { useState, useRef } from 'react';
import Button from '../../../base-components/Button';
import Lucide from '../../../base-components/Lucide';
import Tippy from '../../../base-components/Tippy';
import { Dialog, Menu } from '../../../base-components/Headless';
import { FA_IR, FA_IR_ERROR } from '../../../language';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateGymPlan, useDeleteGym, useGymUsers, useMyGymList } from '../../../hooks';
import exportFromJSON from 'export-from-json';
import { toast } from 'react-toastify';
import { Field, Form, Formik } from 'formik';
import { FormInput, FormLabel, FormSelect } from '../../../base-components/Form';
import { useAppSelector } from '../../../redux/hooks';
import { Role } from '../../../constants';
import * as Yup from 'yup';
import TomSelect from '../../../base-components/TomSelect';


const initialValues = {
	name: '',
	timeStart: '',
	timeEnd: '',
	price: 0,
	trainer: -1,
};

const ValidationSchema = Yup.object({
	name: Yup.string().required(FA_IR_ERROR.Required),
	timeStart: Yup.string()
		.matches(/\d\:\d/g)
		.required(FA_IR_ERROR.Required),
	timeEnd: Yup.string()
		.matches(/\d\:\d/g)
		.required(FA_IR_ERROR.Required),
	price: Yup.number().required(FA_IR_ERROR.Required),
	trainer: Yup.number().positive().required(FA_IR_ERROR.Required),
});

function Main() {
	const { data: gymList, refetch: refetchGymList } = useMyGymList();
	const [deleteGymDialog, setDeleteGymDialog] = useState({
		open: false,
		id: '',
	});
	const {mutate: deleteGym} = useDeleteGym();
	const deleteGymRef = useRef(null);
	const navigate = useNavigate();
	
	const [selectedGym, setSelectedGym] = useState({
		id: '',
		open: false,
	});
	const { data: usersList } = useGymUsers(selectedGym.id);
	const addPlanRef = useRef(null);
	const [selectedTrainees, setSelectedTranees] = useState<string[]>([]);
	const {mutate: postCreateGymPlan} = useCreateGymPlan();
	const onSubmitAddPlan = (data: typeof initialValues) => {		
		if (!selectedGym.id || selectedTrainees.includes('#')) {
			toast.error(FA_IR.Error);
			return;
		}
		postCreateGymPlan(
			{
				id: selectedGym.id,
				data: {
					name: data.name,
					price: data.price,
					time_end:data.timeEnd,
					time_start: data.timeStart,
					user_id: +data.trainer,
					trainee: selectedTrainees,
				},
			},
			{
				onSuccess: () => {
					setSelectedGym({
						id: '',
						open: false,
					});
					toast.success(FA_IR.AddGymPlanSuccess);
				},
			}
		);
	}

	const auth = useAppSelector(state => state.auth);
	return (
		<>
			<div className="flex rtl flex-col items-center mt-8 intro-y sm:flex-row">
				<h2 className="ml-auto text-lg font-medium">{FA_IR.MyGymsList}</h2>
				{(auth.role as Role) === Role.GymOwner && (
					<div className="flex rtl w-full gap-2 mt-4 sm:w-auto sm:mt-0">
						<Link to="/dashboard/gym/add">
							<Button variant="primary" className="shadow-md">
								{FA_IR.AddGym}
							</Button>
						</Link>
						<Menu className="ml-auto sm:m-0">
							<Menu.Button as={Button} className="px-2 !box">
								<span className="flex items-center justify-center w-5 h-5">
									<Lucide icon="Plus" className="w-4 h-4" />
								</span>
							</Menu.Button>
							<Menu.Items placement="bottom-start" className="mt-2 w-40">
								<Menu.Item
									onClick={() => {
										if (!gymList) return;
										exportFromJSON({
											data: gymList,
											fileName: 'gym-list-csv',
											exportType: 'csv',
										});
									}}
								>
									<Lucide icon="FileText" className="w-4 h-4 ml-2" />
									{FA_IR.ExportCsv}
								</Menu.Item>
								<Menu.Item
									onClick={() => {
										if (!gymList) return;
										exportFromJSON({
											data: gymList,
											fileName: 'gym-list-excel',
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
				)}
			</div>
			<div className="grid grid-cols-12 gap-6 mt-5 intro-y">
				{gymList?.map((gymInfo, index) => (
					<div
						key={gymInfo.id}
						className="col-span-12 intro-y lg:col-span-6 box flex flex-col"
					>
						<div className="h-[320px] relative before:block before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-gradient-to-t before:from-black/80 before:to-black/40 image-fit">
							<img alt={gymInfo.name} src={gymInfo.background_image} />
							<div className="absolute z-10 flex items-center w-full px-5 pt-6">
								<div className="flex-none w-10 h-10 image-fit">
									<img
										alt={gymInfo.name}
										className="rounded-full"
										src={gymInfo.logo_image}
									/>
								</div>
								<div className="ml-3 mr-auto text-white">
									<Link
										to={`/dashboard/gym/${gymInfo.id}`}
										className="font-medium"
									>
										{gymInfo.name}
									</Link>
									<div className="text-xs mt-0.5">{gymInfo.city.name}</div>
								</div>
								<Menu className="ml-3">
									<Menu.Button
										as="button"
										className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20"
									>
										<Lucide
											icon="MoreVertical"
											className="w-4 h-4 text-white"
										/>
									</Menu.Button>
									<Menu.Items className="rtl w-40">
										<Menu.Item
											onClick={() => {
												setSelectedGym({
													id: gymInfo.id,
													open: true,
												});
											}}
										>
											<Lucide icon="PlusCircle" className="w-4 h-4 ml-2" />
											{FA_IR.AddPlan}
										</Menu.Item>
										<Menu.Item
											onClick={() => {
												navigate(`/dashboard/gym/edit/${gymInfo.id}`);
											}}
										>
											<Lucide icon="Edit2" className="w-4 h-4 ml-2" />
											{FA_IR.GymEdit}
										</Menu.Item>
										<Menu.Item
											onClick={() => {
												setDeleteGymDialog({
													open: true,
													id: gymInfo.id,
												});
											}}
										>
											<Lucide icon="Trash" className="w-4 h-4 ml-2" />
											{FA_IR.GymDelete}
										</Menu.Item>
									</Menu.Items>
								</Menu>
							</div>
							<div className="absolute bottom-0 right-0 z-10 px-5 pb-6 text-white">
								<span className="px-2 py-1 rounded bg-white/20">
									{gymInfo.location.address}
								</span>
							</div>
						</div>
						<section>
							<div className="p-5 pb-0 rtl">
								<h6 className="mb-2">{FA_IR.GymDescription}</h6>
								<p
									className=" text-slate-600 dark:text-slate-500"
									dangerouslySetInnerHTML={{
										__html: gymInfo.description,
									}}
								></p>
							</div>
							<div className="p-5 rtl">
								<h6 className="mb-2">{FA_IR.GymContacts}</h6>
								<p
									className="text-slate-600 dark:text-slate-500"
									dangerouslySetInnerHTML={{
										__html: gymInfo.contacts,
									}}
								></p>
							</div>
						</section>
						<div className="mt-auto flex items-center px-5 py-3 border-t border-slate-200/60 dark:border-darkmode-400">
							<Tippy
								as="span"
								className="flex items-center justify-center w-8 h-8 mr-2 rounded-full intro-x text-primary bg-primary/10 dark:bg-darkmode-300 dark:text-slate-300"
								content={FA_IR.GymFeedback}
							>
								<Lucide icon="Star" className="w-3 h-3" />
							</Tippy>
							{gymInfo.rate}

							<Tippy
								as={Link}
								to={`/dashboard/gym/${gymInfo.id}`}
								className="flex items-center justify-center w-8 h-8 ml-auto text-white rounded-full intro-x bg-primary"
								content={FA_IR.GymProfile}
							>
								<Lucide icon="LayoutDashboard" className="w-3 h-3" />
							</Tippy>
						</div>
					</div>
				))}

				{/* BEGIN: Delete Modal */}
				<Dialog
					open={deleteGymDialog.open}
					onClose={() => {
						setDeleteGymDialog({
							open: false,
							id: '',
						});
					}}
					initialFocus={deleteGymRef}
				>
					<Dialog.Panel>
						<div className="p-5 text-center">
							<Lucide
								icon="XCircle"
								className="w-16 h-16 mx-auto mt-3 text-danger"
							/>
							<div className="mt-5 text-3xl">{FA_IR.GymDelete}</div>
							<div className="mt-2 text-slate-500">
								{FA_IR.DeleteConfirm} <br />
								{FA_IR.ProcessPermanent}
							</div>
						</div>
						<div className="px-5 pb-8 text-center">
							<Button
								type="button"
								variant="outline-secondary"
								onClick={() => {
									setDeleteGymDialog({
										open: false,
										id: '',
									});
								}}
								className="w-24 ml-4"
							>
								{FA_IR.Cancel}
							</Button>
							<Button
								type="button"
								variant="danger"
								className="w-24"
								ref={deleteGymRef}
								onClick={() => {
									deleteGym(deleteGymDialog.id, {
										onSuccess: () => {
											setDeleteGymDialog({
												open: false,
												id: '',
											});
											refetchGymList();
										},
										onError: () => {
											setDeleteGymDialog({
												open: false,
												id: '',
											});
											toast.error(FA_IR_ERROR.DeleteGymError);
										},
									});
								}}
							>
								{FA_IR.Delete}
							</Button>
						</div>
					</Dialog.Panel>
				</Dialog>
				{/* END: Delete Modal */}

				{/* BEGIN: Add Plan Modal */}
				<Dialog
					open={selectedGym.open}
					onClose={() => {
						setSelectedGym({
							open: false,
							id: '',
						});
					}}
					initialFocus={addPlanRef}
				>
					<Dialog.Panel>
						<Formik
							initialValues={initialValues}
							validattionSchema={ValidationSchema}
							onSubmit={onSubmitAddPlan}
						>
							<Form>
								<div className="p-5 text-center">
									<Lucide
										icon="PlusCircle"
										className="w-16 h-16 mx-auto mt-3 text-primary"
									/>
									<div className="mt-5 text-3xl">{FA_IR.AddPlan}</div>
								</div>
								<div className="px-5 pb-8">
									<div className="grid grid-cols-12 gap-4 row-gap-3">
										<div className="col-span-12 sm:col-span-6">
											<FormLabel>{FA_IR.PlanName}</FormLabel>
											<Field as={FormInput} type="text" name="name" />
										</div>
										<div className="col-span-12 sm:col-span-6">
											<FormLabel>{FA_IR.PlanPrice}</FormLabel>
											<Field
												as={FormInput}
												min={0}
												type="number"
												name="price"
											/>
										</div>
										<div className="col-span-12 sm:col-span-6">
											<FormLabel>{FA_IR.TimeStart}</FormLabel>
											<Field
												as={FormInput}
												type="text"
												name="timeStart"
												placeholder={FA_IR.ExampleTimeStart}
											/>
										</div>

										<div className="col-span-12 sm:col-span-6">
											<FormLabel>{FA_IR.TimeEnd}</FormLabel>
											<Field
												as={FormInput}
												type="text"
												name="timeEnd"
												placeholder={FA_IR.ExampleTimeStart}
											/>
										</div>
										<div className="col-span-12 sm:col-span-6">
											<FormLabel>{FA_IR.Trainer}</FormLabel>
											<Field as={FormSelect} name="trainer">
												<option value={-1}>{FA_IR.SelectTrainer}</option>
												{usersList
													?.filter((user: any) => user.role === Role.Trainer)
													.map((user: any) => (
														<option key={user.id} value={user.id}>
															{`${user.first_name} ${user.last_name} ${user.id}`}
														</option>
													))}
											</Field>
										</div>
										<div className="col-span-12 sm:col-span-6">
											<FormLabel>{FA_IR.Members}</FormLabel>
											<TomSelect
												multiple
												value={selectedTrainees}
												onChange={setSelectedTranees}
												className='ltr'
											>
												<option value="#">{FA_IR.SelectMembers}</option>
												{usersList
													?.filter((user: any) => user.role === Role.Trainee)
													.map((user: any) => (
														<option key={user.id} value={user.id}>
															{`${user.first_name} ${user.last_name} ${user.id}`}
														</option>
													))}
											</TomSelect>
										</div>
									</div>
								</div>

								<div className="px-5 pb-8 text-center">
									<Button
										type="button"
										variant="outline-secondary"
										onClick={() => {
											setSelectedGym({
												open: false,
												id: '',
											});
										}}
										className="w-24 ml-4"
									>
										{FA_IR.Cancel}
									</Button>
									<Button
										type="submit"
										variant="primary"
										className="w-24"
										ref={addPlanRef}
									>
										{FA_IR.Add}
									</Button>
								</div>
							</Form>
						</Formik>
					</Dialog.Panel>
				</Dialog>

				{/* END: Add Plan Modal */}
			</div>
		</>
	);
}

export default Main;
