import DarkModeSwitcher from "../../../components/DarkModeSwitcher";
import MainColorSwitcher from "../../../components/MainColorSwitcher";
import {Formik, Form, Field} from "formik";
import { FormInput } from "../../../base-components/Form";
import * as Yup from "yup";
import Button from "../../../base-components/Button";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { FA_IR, FA_IR_ERROR } from "../../../language";
import { Logo } from "../../../components/Logo";
import { useLogin } from "../../../hooks";
import { CustomErrorMessage } from "../../../components/Form/Error";

const LoginInitialValues = {
	email: "",
	password: "",
};

const LoginValidationSchema = Yup.object({
	email: Yup.string().email(FA_IR_ERROR.ImproperEmailFormat).required(FA_IR_ERROR.EmailRequired),
	password: Yup.string().required(FA_IR_ERROR.PasswordRequired),
});


function Main() {
	const { mutate} = useLogin(); 

	const handleSubmit = (values : typeof LoginInitialValues) => {
			mutate(values);	
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
									{FA_IR.SignIn}
								</h2>
								<div className="mt-2 text-center intro-x text-slate-400 xl:hidden">
									{FA_IR.WelcomeToDambel}
								</div>
								{/* Form Group */}
								<Formik
									initialValues={LoginInitialValues}
									onSubmit={handleSubmit}
									validationSchema={LoginValidationSchema}
									validateOnBlur
									validateOnChange={false}
									validateOnMount={false}
								>
									<Form>
										<div className="mt-8 intro-x">
											<Field
												as={FormInput}
												type="text"
												name="email"
												className="block px-4 py-3 intro-x min-w-full xl:min-w-[350px]"
												placeholder={FA_IR.email}
											/>
											<CustomErrorMessage name="email" />
											<Field
												as={FormInput}
												name="password"
												type="password"
												className="block px-4 py-3 mt-4 intro-x min-w-full xl:min-w-[350px]"
												placeholder={FA_IR.password}
											/>
											<CustomErrorMessage name="password" />
										</div>
										<div className="flex mt-4 text-xs intro-x text-slate-600 dark:text-slate-500 sm:text-sm">
											<Link to="/forget-password">{FA_IR.ForgotPassword}</Link>
										</div>
										{/* Button group */}
										<div className="mt-5 text-center intro-x xl:mt-8 xl:text-right">
											<Button
												type="submit"
												variant="primary"
												className="w-full px-4 py-3 align-top xl:w-32 xl:ml-3"
											>
												{FA_IR.Login}
											</Button>
											<Link to="/register">
												<Button
													type="button"
													variant="outline-secondary"
													className="w-full px-4 py-3 mt-3 align-top xl:w-32 xl:mt-0"
												>
													{FA_IR.Register}
												</Button>
											</Link>
										</div>
									</Form>
								</Formik>
							</div>
						</div>
						{/* END: Login Form */}
					</div>
				</div>
			</div>
		</>
	);
}

export default Main;
