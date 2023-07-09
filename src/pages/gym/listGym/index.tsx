import { useState, useRef } from 'react';
import Button from '../../../base-components/Button';
import Lucide from '../../../base-components/Lucide';
import Tippy from '../../../base-components/Tippy';
import { Dialog, Menu } from '../../../base-components/Headless';
import { FA_IR } from '../../../language';
import { Link } from 'react-router-dom';
import { useGymLocationList } from '../../../hooks';
import exportFromJSON from 'export-from-json';

function Main() {
	const { data: gymList } = useGymLocationList();
	const [deleteGymDialog, setDeleteGymDialog] = useState({
		open: false,
		id: '',
	});
	const deleteGymRef = useRef(null);
	return (
		<>
			<div className="flex rtl flex-col items-center mt-8 intro-y sm:flex-row">
				<h2 className="ml-auto text-lg font-medium">{FA_IR.MyGymsList}</h2>
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
							<Menu.Item onClick={() => {
								if  (!gymList) return;
								exportFromJSON({ 
									data: gymList,
									fileName: 'gym-list-csv',
									exportType: 'csv'
								 });
							}}>
								<Lucide icon="FileText" className="w-4 h-4 ml-2" />
								{FA_IR.ExportCsv}
							</Menu.Item>
							<Menu.Item onClick={() => {
								if  (!gymList) return;
								exportFromJSON({ 
									data: gymList,
									fileName: 'gym-list-excel',
									exportType: 'xls'
								 });
							}}>
								<Lucide icon="Sheet" className="w-4 h-4 ml-2" />
								{FA_IR.ExportExcle}
							</Menu.Item>
						</Menu.Items>
					</Menu>
				</div>
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
									<Link to={`/gym/${gymInfo.id}`} className="font-medium">
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
										<Menu.Item>
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
								{/* <a href="" className="block mt-3 text-xl font-medium">
									{faker.}
								</a> */}
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
								className="flex items-center justify-center w-8 h-8 mr-2 border rounded-full intro-x border-slate-300 dark:border-darkmode-400 dark:bg-darkmode-300 dark:text-slate-300 text-slate-500"
								content={FA_IR.GymUsers}
							>
								<Lucide icon="Users" className="w-3 h-3" />
							</Tippy>
							{gymInfo.plans.reduce(
								(acc, plan) => acc + plan.trainee.length + 1,
								0
							)}
							<Tippy
								as="span"
								className="flex items-center justify-center w-8 h-8 ml-6 mr-2 rounded-full intro-x text-primary bg-primary/10 dark:bg-darkmode-300 dark:text-slate-300"
								content={FA_IR.GymFeedback}
							>
								<Lucide icon="Star" className="w-3 h-3" />
							</Tippy>
							{gymInfo.rate}

							<Tippy
								as={Link}
								to={`/gym/${gymInfo.id}`}
								className="flex items-center justify-center w-8 h-8 ml-auto text-white rounded-full intro-x bg-primary"
								content={FA_IR.GymProfile}
							>
								<Lucide icon="LayoutDashboard" className="w-3 h-3" />
							</Tippy>
						</div>
						{/* <div className="px-5 pt-3 pb-5 border-t border-slate-200/60 dark:border-darkmode-400">
							<div className="flex w-full text-xs text-slate-500 sm:text-sm">
								<div className="mr-2">
									Comments:{' '}
									<span className="font-medium">{faker.totals[0]}</span>
								</div>
								<div className="mr-2">
									Views: <span className="font-medium">{faker.totals[1]}k</span>
								</div>
								<div className="ml-auto">
									Likes: <span className="font-medium">{faker.totals[2]}k</span>
								</div>
							</div>
							<div className="flex items-center w-full mt-3">
								<div className="flex-none w-8 h-8 mr-3 image-fit">
									<img
										alt="Midone Tailwind HTML Admin Template"
										className="rounded-full"
										src={faker.photos[0]}
									/>
								</div>
								<div className="relative flex-1 text-slate-600 dark:text-slate-200">
									<FormInput
										rounded
										type="text"
										className="pr-10 border-transparent bg-slate-100"
										placeholder="Post a comment..."
									/>
									<Lucide
										icon="Smile"
										className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
									/>
								</div>
							</div>
						</div> */}
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
								// TODO: delete logic here
							>
								{FA_IR.Delete}
							</Button>
						</div>
					</Dialog.Panel>
				</Dialog>
				{/* END: Delete Modal */}

				{/* BEGIN: Pagiantion */}
				{/* <div className="flex flex-wrap items-center col-span-12 intro-y sm:flex-row sm:flex-nowrap">
					<Pagination className="w-full sm:w-auto sm:mr-auto">
						<Pagination.Link>
							<Lucide icon="ChevronsLeft" className="w-4 h-4" />
						</Pagination.Link>
						<Pagination.Link>
							<Lucide icon="ChevronLeft" className="w-4 h-4" />
						</Pagination.Link>
						<Pagination.Link>...</Pagination.Link>
						<Pagination.Link>1</Pagination.Link>
						<Pagination.Link active>2</Pagination.Link>
						<Pagination.Link>3</Pagination.Link>
						<Pagination.Link>...</Pagination.Link>
						<Pagination.Link>
							<Lucide icon="ChevronRight" className="w-4 h-4" />
						</Pagination.Link>
						<Pagination.Link>
							<Lucide icon="ChevronsRight" className="w-4 h-4" />
						</Pagination.Link>
					</Pagination>
					<FormSelect className="w-20 mt-3 !box sm:mt-0">
						<option>10</option>
						<option>25</option>
						<option>35</option>
						<option>50</option>
					</FormSelect>
				</div> */}
				{/* END: Pagiantion */}
			</div>
		</>
	);
}

export default Main;
