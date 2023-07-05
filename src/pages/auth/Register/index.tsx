import DarkModeSwitcher from "../../../components/DarkModeSwitcher";
import MainColorSwitcher from "../../../components/MainColorSwitcher";
import { FormInput, FormLabel, FormSelect, InputGroup } from "../../../base-components/Form";
import * as Yup from "yup";
import Button from "../../../base-components/Button";
import clsx from "clsx";
import {Link, useNavigate } from "react-router-dom";
import { FA_IR, FA_IR_ERROR } from "../../../language";
import { Logo } from "../../../components/Logo";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import { CustomErrorMessage } from "../../../components/Form/Error";
import { Frame } from "lucide-react";
import { useGymownerRegister, useTraineeRegister, useTrainerRegister } from "../../../hooks";

const RegisterInitialValues = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	confirmPassword: "",
	phoneNumber: "",
}

const TraineeAdditionalFields = {
	weight: "",
	height: "",
}

const RegisterValidationSchema = {
	firstName: Yup.string().required(FA_IR_ERROR.FirstNameRequired),
	lastName: Yup.string().required(FA_IR_ERROR.LastNameRequired),
	email: Yup.string().email(FA_IR_ERROR.ImproperEmailFormat).required(FA_IR_ERROR.EmailRequired),
	password: Yup.string().required(FA_IR_ERROR.PasswordRequired),
	confirmPassword: Yup.string().oneOf([Yup.ref('password')], FA_IR_ERROR.PasswordNotMatch).required(FA_IR_ERROR.RePassword),
	phoneNumber: Yup.string().matches(/\+98[0-9]{10}/g, FA_IR_ERROR.NumberNotMatchesFormat).required(FA_IR_ERROR.MobileNumberRequired),
};

const TraineeAdditionalFieldsValidationSchema = {
	weight: Yup.number().typeError(FA_IR_ERROR.NotNumber).required(
		FA_IR_ERROR.WeightRequired
	),
	height: Yup.number().typeError(FA_IR_ERROR.NotNumber).required(FA_IR_ERROR.HeightRequired),
};

enum Role {
	GymOwner="GymOwner",
	Trainer = "Trainer",
	Trainee = "Trainee",
}

function Main() {
	const {mutate: registerTrainee} = useTraineeRegister();
	const {mutate: registerTrainer} = useTrainerRegister(); 
	const {mutate: registerGymOwner } = useGymownerRegister();
	const [role, setRole] = useState<Role  | null>(null);
	const handleSubmit = (values: typeof RegisterInitialValues) => {
		if (role == Role.Trainee) {
			const trainee = {
				...values,
				weight: parseInt((values as any).weight),
				height: parseInt((values as any).height),
			};

			registerTrainee(trainee);
		}
		else if (role === Role.GymOwner) {
			registerGymOwner(values);
		}
		else if (role == Role.Trainer) {
			registerTrainer(values);
		}
		else {
			toast.error(FA_IR_ERROR.ChooseRole);
		}
	}
  return (
		<>
			<div
				className={clsx([
					'-m-3 sm:-mx-8 p-3 sm:px-8 relative h-screen lg:overflow-x-hidden bg-primary xl:flex xl:items-center xl:justify-center xl:bg-white dark:bg-darkmode-800 xl:dark:bg-darkmode-600',
				])}
			>
				<Logo />
				<DarkModeSwitcher />
				<MainColorSwitcher />
				<div
					className={clsx([
						'container relative z-10 sm:px-10',
						role === Role.Trainee ? 'mt-20 mb-16' : '',
					])}
				>
					<div className="block">
						{/* BEGIN: Login Form */}
						<div className="flex h-screen py-5 my-10 xl:h-auto xl:py-0 xl:my-0 ">
							<div className="w-full px-5 py-8 mx-auto my-auto bg-white rounded-md shadow-md  dark:bg-darkmode-600 xl:bg-transparent sm:px-8 xl:p-0 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto">
								<h2 className="text-xl  text-center intro-x xl:text-3xl xl:text-right">
									{FA_IR.Register}
								</h2>
								<div className="mt-2 text-center intro-x text-slate-400 xl:hidden">
									{FA_IR.CreateAccount}
								</div>
								<Formik
									initialValues={
										role === Role.Trainee
											? { ...RegisterInitialValues, ...TraineeAdditionalFields }
											: RegisterInitialValues
									}
									onSubmit={handleSubmit}
									validationSchema={
										role === Role.Trainee
											? Yup.object({
													...RegisterValidationSchema,
													...TraineeAdditionalFieldsValidationSchema,
											  })
											: Yup.object(RegisterValidationSchema)
									}
									validateOnBlur
									validateOnChange={false}
									validateOnMount={false}
								>
									<Form>
										<div className="mt-8 intro-x">
											<FormSelect
												onChange={(e) => {
													setRole(e.currentTarget.value as Role);
												}}
												defaultValue="#"
												className="block text-slate-400 mt-3 intro-x min-w-full xl:min-w-[350px]"
											>
												<option value="#" disabled>
													{FA_IR.ChooseRole}
												</option>
												<option value={Role.Trainee}>{FA_IR.Trainee}</option>
												<option value={Role.Trainer}>{FA_IR.Trainer}</option>
												<option value={Role.GymOwner}>{FA_IR.GymOwner}</option>
											</FormSelect>
											<Field
												as={FormInput}
												type="text"
												name="firstName"
												className="block mt-3 intro-x min-w-full xl:min-w-[350px]"
												placeholder={FA_IR.FirstName}
											/>
											<CustomErrorMessage name="firstName" />
											<Field
												as={FormInput}
												type="text"
												name="lastName"
												className="block mt-3 intro-x min-w-full xl:min-w-[350px]"
												placeholder={FA_IR.LastName}
											/>
											<CustomErrorMessage name="lastName" />
											{role === Role.Trainee && (
												<>
													<InputGroup className="mt-3 ltr min-w-full xl:min-w-[350px]">
														<Field
															inputMode="numeric"
															pattern="[0-9]*"
															as={FormInput}
															aria-describedby="input-group-weight"
															type="text"
															name="weight"
															className="block ltr"
															placeholder={FA_IR.Weight}
														/>
														<InputGroup.Text id="input-group-weight">
															Kg
														</InputGroup.Text>
													</InputGroup>
													<CustomErrorMessage name="weight" />
													<InputGroup className="mt-3 ltr min-w-full xl:min-w-[350px]">
														<Field
															inputMode="numeric"
															pattern="[0-9]*"
															as={FormInput}
															type="text"
															aria-describedby="input-group-height"
															name="height"
															className="block"
															placeholder={FA_IR.Height}
														/>
														<InputGroup.Text id="input-group-height">
															Cm
														</InputGroup.Text>
													</InputGroup>
													<CustomErrorMessage name="height" />
												</>
											)}
											<Field
												as={FormInput}
												type="text"
												name="email"
												className="block mt-3 intro-x min-w-full xl:min-w-[350px]"
												placeholder={FA_IR.email}
											/>
											<CustomErrorMessage name="email" />
											<Field
												as={FormInput}
												type="text"
												name="phoneNumber"
												className="ltr block mt-3 intro-x min-w-full xl:min-w-[350px]"
												placeholder={FA_IR.PhoneNumber}
											/>
											<CustomErrorMessage name="phoneNumber" />
											<Field
												as={FormInput}
												name="password"
												type="password"
												className="block mt-3 intro-x min-w-full xl:min-w-[350px]"
												placeholder={FA_IR.password}
											/>
											<CustomErrorMessage name="password" />
											<Field
												as={FormInput}
												name="confirmPassword"
												type="password"
												className="block mt-3 intro-x min-w-full xl:min-w-[350px]"
												placeholder={FA_IR.rePassword}
											/>
											<CustomErrorMessage name="confirmPassword" />
										</div>

										{/* Button group */}
										<div className="text-center intro-x my-5 xl:text-right">
											<Button
												type="submit"
												variant="primary"
												className="w-full align-top xl:w-32 xl:ml-3"
											>
												{FA_IR.Register}
											</Button>
										</div>
										<div className="flex gap-1 mt-4 text-xs intro-x text-slate-600 dark:text-slate-500 sm:text-sm">
											<p>{FA_IR.AlreadyHaveAccount}</p>
											<Link to="/login">{FA_IR.SignIn}</Link>
										</div>
									</Form>
								</Formik>
							</div>
						</div>
						{/* END: Register Form */}
					</div>
				</div>
			</div>
		</>
	);
}

export default Main;
