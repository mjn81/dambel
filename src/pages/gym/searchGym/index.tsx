import Button from '../../../base-components/Button';
import { FormInput, FormLabel, FormSelect } from '../../../base-components/Form';
import { useGymListSearch, useGymLocationList } from '../../../hooks';
import { FA_IR } from '../../../language';
import { Field, Form, Formik } from 'formik';
import { Link, useLocation } from 'react-router-dom';
import { IMapLocation } from '../../../interfaces/map';
import Lucide from '../../../base-components/Lucide';
import { useMemo, useRef, useState } from 'react';
import { Role } from '../../../constants';
import { useAppSelector } from '../../../redux/hooks';
import { Dialog } from '../../../base-components/Headless';
import { IGymInfo } from '../../../interfaces';

function Main() {
  const location = useLocation();
	const initialValues = useMemo(() => ({
    searchTerm: location.state?.term || '',
    location: location.state?.location,
  }), []);
  
  const [params, setParams] = useState(initialValues);
  const { data: gymList, isLoading } = useGymListSearch(params);
	const onSubmit = (values: typeof initialValues) => {
		if (values.searchTerm) {
			setParams({
				searchTerm: values.searchTerm,
				location: undefined,
			});
		}
	};
	const auth = useAppSelector((state) => state.auth);
	const sendButtonRef = useRef<HTMLButtonElement>(null);
	const [selectedGym, setSelectedGym] = useState<{
		isOpen: boolean;
		gym: IGymInfo | null;
	}>({
		isOpen: false,
		gym: null,
	});

	return (
		<>
			<h2 className="mt-10 text-lg rtl font-medium intro-y">
				{FA_IR.GymSearch}
			</h2>
			<div className="grid grid-cols-12 gap-6 mt-5">
				<Formik onSubmit={onSubmit} initialValues={initialValues}>
					<Form className="flex flex-wrap gap-3 items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
						<Button
							disabled={isLoading}
							variant="primary"
							className="mr-2 shadow-md"
						>
							{FA_IR.Search3}
						</Button>
						<Button
							onClick={() => {
								setParams({
									searchTerm: '',
									location: undefined,
								});
							}}
							type="button"
							variant="secondary"
							className="mr-2 shadow-md"
						>
							{FA_IR.ClearQuery}
						</Button>
						<span className="flex-grow"></span>
						<div className="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
							<Field
								name="searchTerm"
								as={FormInput}
								type="text"
								className="max-w-56 md:w-72 rtl pl-10 !box"
								placeholder={FA_IR.Search2}
							/>
						</div>
					</Form>
				</Formik>
				{/* BEGIN: Users Layout */}
				{gymList?.map((gym, index) => (
					<div
						key={gym.id}
						className="col-span-12 intro-y md:col-span-6 lg:col-span-4"
					>
						<div className="box">
							<div className="flex items-start px-5 pt-5">
								<div className="flex flex-col items-center w-full lg:flex-row">
									<div className="w-16 h-16 image-fit">
										<img
											alt={gym.name}
											className="rounded-full overflow-hidden"
											src={gym.logo_image}
										/>
									</div>
									<div className="mt-3 text-center lg:ml-4 lg:text-left lg:mt-0">
										<Link
											to={`/dashboard/gym/${gym.id}`}
											className="font-medium"
										>
											{gym.name}
										</Link>
										<div className="text-slate-500 text-xs mt-0.5">
											{gym.city.name}
										</div>
									</div>
								</div>
							</div>
							<div className="rtl p-5 text-center lg:text-left">
								<div
									className="flex"
									dangerouslySetInnerHTML={{
										__html: gym.description,
									}}
								></div>
								<div
									dangerouslySetInnerHTML={{
										__html: gym.contacts,
									}}
									className="flex items-center justify-center mt-5 lg:justify-start text-slate-500"
								></div>
								<div className="flex items-center justify-center mt-1 lg:justify-start text-slate-500">
									<Lucide icon="Map" className="w-3 h-3 ml-2" />
									{gym.location.address}
								</div>
							</div>
							<div className="flex-col gap-3 justify-center 2xl:justify-between 2xl:gap-0 2xl:flex-row rtl flex  p-5 text-center border-t lg:text-right border-slate-200/60 dark:border-darkmode-400">
								<section className="flex items-center justify-center gap-3 mt-1 lg:justify-start text-slate-500">
									<span>
										{FA_IR.Rate} : {gym.rate}
									</span>
									<span>
										{FA_IR.GymUsers} :{' '}
										{gym.plans.reduce(
											(acc, plan) => acc + plan.trainee.length + 1,
											1
										)}
									</span>
								</section>
								<section className="flex flex-row-reverse justify-end 2xl:flex-row gap-3">
									<Link to={`/dashboard/gym/${gym.id}`}>
										<Button variant="outline-secondary" className="px-2 py-1">
											{FA_IR.Profile}
										</Button>
									</Link>
									{auth.role === (Role.Trainee as string) && (
										<Button
											onClick={() => {
												setSelectedGym({
													gym,
													isOpen: true,
												});
											}}
											variant="primary"
											className="px-2 py-1"
										>
											{FA_IR.SendInvite}
										</Button>
									)}
								</section>
							</div>
						</div>
					</div>
				))}
				{gymList?.length === 0 && (
					<div className="col-span-12 my-32 h-full">
						<div className="flex flex-col items-center">
							<Lucide icon="Search" className="w-16 h-16 text-slate-300" />
							<div className="mt-5 text-xl text-slate-300">
								{FA_IR.GymsNotFound}
							</div>
						</div>
					</div>
				)}
				{/* BEGIN: Modal Content */}
				<Dialog
					open={selectedGym.isOpen}
					onClose={() => {
						setSelectedGym({
							gym: null,
							isOpen: false,
						});
					}}
					initialFocus={sendButtonRef}
				>
					<Dialog.Panel>
						<Dialog.Title>
							<h2 className="ml-auto text-base font-medium">
								{FA_IR.SelectPlan}
							</h2>
						</Dialog.Title>
						<Dialog.Description className=" grid grid-cols-12 gap-4 gap-y-3">
							<div className="col-span-12">
								<FormSelect>
									<option value="#">{FA_IR.SelectPlan2}</option>
									{selectedGym.gym?.plans.map((plan) => (
										<option key={plan.id} value={plan.id}>
											{plan.name}
										</option>
									))}
								</FormSelect>
							</div>
						</Dialog.Description>
						<Dialog.Footer className="flex gap-3 flex-row-reverse">
							<Button
								variant="primary"
								type="button"
								className="w-20"
								ref={sendButtonRef}
							>
								{FA_IR.Send}
							</Button>
							<Button
								type="button"
								variant="outline-secondary"
								onClick={() => {
									setSelectedGym({
										gym: null,
										isOpen: false,
									});
								}}
								className="w-20 mr-1"
							>
								{FA_IR.Cancel}
							</Button>
						</Dialog.Footer>
					</Dialog.Panel>
				</Dialog>
				{/* END: Modal Content */}
				{/* END: Users Layout */}
			</div>
		</>
	);
}

export default Main;
