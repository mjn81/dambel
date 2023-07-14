import { useState, useRef } from 'react';
import Button from '../../../base-components/Button';
import Pagination from '../../../base-components/Pagination';
import { FormInput, FormLabel, FormSelect } from '../../../base-components/Form';
import Lucide from '../../../base-components/Lucide';
import { Dialog, Menu } from '../../../base-components/Headless';
import { useParams } from 'react-router-dom';
import { useAccountProfile, useGymDetail, usePostComment } from '../../../hooks';
import LoadingIcon from '../../../base-components/LoadingIcon';
import { useAppSelector } from '../../../redux/hooks';
import { FA_IR, FA_IR_ERROR } from '../../../language';
import { SecondToDaytime } from '../../../utils/time';
import { Role } from '../../../constants';
import { Field, Form, Formik } from 'formik';
import { toast } from 'react-toastify';


const initialValues = {
	rate: 1,
	text: '',
};

function Main() {

	const { id } = useParams();
	const auth = useAppSelector((state) => state.auth);
	const { data: details, isLoading, refetch: refetchDetail } = useGymDetail(id as string);
	const { data: profile } = useAccountProfile(); 	
	const [selectedPlan, setSelectedPlan] = useState({
		id: -1,
		isOpen: false,
	});
	const { mutate: postComment } = usePostComment();
	const selectedPlanRef = useRef(null);
	if (isLoading || !details) return <LoadingIcon />;
	const addComment = (values: typeof initialValues) => {
		if (selectedPlan.id === -1) {
			toast.error(FA_IR_ERROR.PlanRequired);
			return;
		}
		postComment({
			...values,
			plan: selectedPlan.id,
		}, {
			onSuccess: () => {
				toast.success(FA_IR.CommentAdded);
				refetchDetail();
			},
			onError: () => {
				toast.error(FA_IR_ERROR.CommentAddError);
			}
		});
	}
	return (
		<>
			<div className="flex rtl flex-col items-center mt-8 intro-y sm:flex-row">
				<h2 className="ml-auto text-lg font-medium">{details?.name}</h2>
			</div>
			{/* BEGIN: Seller Details */}
			<div className="grid grid-cols-11 gap-5 mt-5 intro-y">
				<div className="col-span-12 lg:col-span-4 2xl:col-span-3">
					<div className="rtl p-5 rounded-md box">
						<div className="flex items-center pb-5 mb-5 border-b border-slate-200/60 dark:border-darkmode-400">
							<div className="text-base font-medium truncate">
								{FA_IR.GymOwnerDetail}
							</div>
						</div>
						<div className="flex gap-2 items-center mt-3">
							<Lucide icon="User" className="w-4 h-4 mr-2 text-slate-500" />{' '}
							<p>
								{FA_IR.Name}:{' '}
								{`${details?.gym_owner.user.first_name} ${details?.gym_owner.user.last_name}`}
							</p>
						</div>
					</div>
					<div className="rtl p-5 mt-5 rounded-md box">
						<div className="flex items-center pb-5 mb-5 border-b border-slate-200/60 dark:border-darkmode-400">
							<div className="text-base font-medium truncate">
								{FA_IR.GymDetails}
							</div>
						</div>
						<div className="flex gap-2 items-center mt-3">
							<Lucide icon="Album" className="w-4 h-4 mr-2 text-slate-500" />
							<p>
								{FA_IR.Name}: {details?.name}
							</p>
						</div>
						<div className="flex gap-2 items-center mt-3">
							<Lucide icon="MapPin" className="w-4 h-4 mr-2 text-slate-500" />
							<p>
								{FA_IR.FullAddress}: {details?.city.name} -{' '}
								{details?.location.address}
							</p>
						</div>
						<div className="flex gap-2 items-center mt-3">
							<Lucide icon="Edit3" className="w-4 h-4 mr-2 text-slate-500" />
							{FA_IR.Description}:
							<p
								dangerouslySetInnerHTML={{
									__html: details?.description || '',
								}}
							></p>
						</div>
						<div className="flex gap-2 items-center mt-3">
							<Lucide icon="Phone" className="w-4 h-4 mr-2 text-slate-500" />
							{FA_IR.Contacts}:
							<p
								dangerouslySetInnerHTML={{
									__html: details?.contacts || '',
								}}
							></p>
						</div>
						<div className="flex gap-2 items-center mt-3">
							<Lucide icon="Star" className="w-4 h-4 mr-2 text-slate-500" />
							<p>
								{FA_IR.Rate}: {details?.rate}
							</p>
						</div>
					</div>
				</div>
				<div className="col-span-12 lg:col-span-7 2xl:col-span-8">
					<div className="grid grid-cols-12 gap-5">
						<div className="h-[400px]  rounded-md box overflow-hidden relative col-span-12 before:block before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-gradient-to-t before:from-black/80 before:to-black/40 image-fit">
							<img
								src={details.background_image}
								alt={details.name}
								className="w-full"
							/>
							<div className="absolute w-14 z-20 aspect-square overflow-hidden rounded-full object-cover top-5 right-5 outline-primary outline">
								<img src={details.logo_image} alt={details.name} />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="p-5 mt-5 rounded-md box">
				<div className="rtl flex items-center pb-5 mb-5 border-b border-slate-200/60 dark:border-darkmode-400">
					<div className="text-base font-medium truncate">{FA_IR.GymPlans}</div>
					<div className=" mr-2 text-base font-medium">
						({details.plans.length})
					</div>
				</div>
				{details.plans?.map((plan, index) => (
					<div
						key={plan.id}
						className="rtl gap-3 flex justify-evenly items-center pb-3 px-3 last:pb-0"
					>
						<div className='flex'>{index + 1}</div>
						<div className="ml-3">
							<div className="text-base font-medium truncate">{plan.name}</div>
						</div>
						<div className="rtl text-rose-500">
							{FA_IR.PlanPrice} : {(+plan.price).toLocaleString()} {FA_IR.Toman}
						</div>
						<div className="text-lime-500">
							{FA_IR.PlanTime} :{' '}
							{`${plan.time_start.toLocaleString(
								'fa-IR'
							)}-${plan.time_end.toLocaleString('fa-IR')}`}
						</div>
						<div>
							{FA_IR.ParticipantsNumber} : {plan.trainee.length}
						</div>

						{(auth.role as Role) === Role.Trainee && (
							<Button
								variant="primary"
								onClick={() => {
									setSelectedPlan({
										id: plan.id,
										isOpen: true,
									});
								}}
								className=""
							>
								{FA_IR.AddComment}
							</Button>
						)}
					</div>
				))}

				{details.plans.length === 0 && (
					<div className="min-h-[60px] rtl flex justify-center items-center gap-3 mt-3">
						<Lucide icon="Activity" className="w-6 h-6 mr-2 text-rose-500" />
						{FA_IR.NoPlan}
					</div>
				)}
			</div>
			<Dialog
				open={selectedPlan.isOpen}
				onClose={() => {
					setSelectedPlan({
						isOpen: false,
						id: -1,
					});
				}}
				initialFocus={selectedPlanRef}
			>
				<Dialog.Panel>
					<div className="p-5 text-center">
						{(auth.role as Role) === Role.Trainee && (
							<Formik initialValues={initialValues} onSubmit={addComment}>
								{({ isSubmitting }) => (
									<Form>
										<div className="p-5 text-center">
											<Lucide
												icon="MessageCircle"
												className="w-16 h-16 mx-auto mt-3 text-primary"
											/>
											<div className="mt-5 text-3xl">{FA_IR.AddComment}</div>
										</div>
										<div className="px-5 pb-8">
											<div className="grid grid-cols-12 gap-4 row-gap-3">
												<div className="col-span-12">
													<FormLabel className="text-right w-full block">
														{FA_IR.Comment}
													</FormLabel>
													<Field as={FormInput} type="text" name="text" />
												</div>
												<div className="col-span-12 sm:col-span-6">
													<FormLabel className="text-right w-full block">
														{FA_IR.Rate}
													</FormLabel>
													<Field
														as={FormInput}
														type="number"
														max={5}
														min={1}
														name="rate"
													/>
												</div>
											</div>
										</div>

										<div className="px-5 pb-8 text-center">
											<Button
												type="button"
												variant="outline-secondary"
												onClick={() => {
													setSelectedPlan({
														isOpen: false,
														id: -1,
													});
												}}
												className="w-24 ml-4"
											>
												{FA_IR.Cancel}
											</Button>
											<Button
												disabled={isSubmitting}
												type="submit"
												variant="primary"
												className="w-24"
												ref={selectedPlanRef}
											>
												{FA_IR.AddComment}
											</Button>
										</div>
									</Form>
								)}
							</Formik>
						)}
					</div>
				</Dialog.Panel>
			</Dialog>

			{/* END: Seller Details */}
		</>
	);
}

export default Main;
