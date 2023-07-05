import DarkModeSwitcher from "../../../components/DarkModeSwitcher";
import MainColorSwitcher from "../../../components/MainColorSwitcher";
import { FormInput, FormLabel, FormSelect } from "../../../base-components/Form";
import * as Yup from "yup";
import Button from "../../../base-components/Button";
import clsx from "clsx";
import {Link } from "react-router-dom";
import { FA_IR, FA_IR_ERROR } from "../../../language";
import { Logo } from "../../../components/Logo";
import { Formik, Form, Field } from "formik";
import { useState } from "react";

const RegisterInitialValues = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	confirmPassword: "",
}

const RegisterValidationSchema = {
	firstName: Yup.string().required(FA_IR_ERROR.FirstNameRequired),
	lastName: Yup.string().required(FA_IR_ERROR.LastNameRequired),
	email: Yup.string().email(FA_IR_ERROR.ImproperEmailFormat).required(FA_IR_ERROR.EmailRequired),
	password: Yup.string().required(FA_IR_ERROR.PasswordRequired),
	confirmPassword: Yup.string().oneOf([Yup.ref('password')], FA_IR_ERROR.PasswordNotMatch).required(FA_IR_ERROR.PasswordRequired),
}

enum Role {
	GymOwner="GymOwner",
	Trainer = "Trainer",
	Trainee = "Trainee",
}

function Main() {

	const [role, setRole] = useState<Role>(Role.Trainee);
	const handleSubmit = (values: typeof RegisterInitialValues) => {
		console.log(values);
	}
  return (
		<>
			<div
				className={clsx([
					'-m-3 sm:-mx-8 p-3 sm:px-8 relative h-screen lg:overflow-hidden bg-primary xl:flex xl:items-center xl:justify-center xl:bg-white dark:bg-darkmode-800 xl:dark:bg-darkmode-600',
				])}
			>
				<Logo />
				<DarkModeSwitcher />
				<MainColorSwitcher />
				<div className="container relative z-10 sm:px-10">
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
									initialValues={RegisterInitialValues}
									onSubmit={handleSubmit}
									validationSchema={RegisterValidationSchema}
									validateOnBlur
									validateOnChange={false}
									validateOnMount={false}
								>
									<Form>
										<div className="mt-8 intro-x">
											<FormSelect
												onSelect={(e) => {
													setRole(e.currentTarget.value as Role);
												}}
												className="block text-slate-400 mt-3 intro-x min-w-full xl:min-w-[350px]"
											>
												<option value="#" selected disabled>{FA_IR.ChooseRole}</option>
												<option value={Role.Trainee}>{FA_IR.Trainee}</option>
												<option value={Role.Trainer}>{FA_IR.Trainer}</option>
												<option value={Role.GymOwner}>{FA_IR.GymOwner}</option>
											</FormSelect>
											<Field
												as={FormInput}
												type="text"
												name="firstName"
												className="block px-4 py-3 mt-3 intro-x min-w-full xl:min-w-[350px]"
												placeholder={FA_IR.FirstName}
											/>
											<Field
												as={FormInput}
												type="text"
												name="lastName"
												className="block px-4 py-3 mt-3 intro-x min-w-full xl:min-w-[350px]"
												placeholder={FA_IR.LastName}
											/>

											<Field
												as={FormInput}
												type="text"
												name="email"
												className="block px-4 py-3 mt-3 intro-x min-w-full xl:min-w-[350px]"
												placeholder={FA_IR.email}
											/>
											<Field
												as={FormInput}
												name="password"
												type="password"
												className="block px-4 py-3 mt-3 intro-x min-w-full xl:min-w-[350px]"
												placeholder={FA_IR.password}
											/>
											<Field
												as={FormInput}
												name="confirmPassword"
												type="password"
												className="block px-4 py-3 mt-3 intro-x min-w-full xl:min-w-[350px]"
												placeholder={FA_IR.rePassword}
											/>
										</div>
									
										{/* Button group */}
										<div className="text-center intro-x my-5 xl:text-right">
											<Button
												type="submit"
												variant="primary"
												className="w-full px-4 py-3 align-top xl:w-32 xl:ml-3"
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
