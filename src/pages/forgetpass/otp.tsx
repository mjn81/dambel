import DarkModeSwitcher from '../../../components/DarkModeSwitcher';
import MainColorSwitcher from '../../../components/MainColorSwitcher';
import { Formik, Form, Field } from 'formik';
import { FormInput } from '../../../base-components/Form';
import * as Yup from 'yup';
import Button from '../../../base-components/Button';
import clsx from 'clsx';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FA_IR, FA_IR_ERROR } from '../../../language';
import { LogoFixed } from '../../../components/Logo';
import { useCheckOtp, useLogin, useSendOtp } from '../../../hooks';
import { CustomErrorMessage } from '../../../components/Form/Error';
import { LoadingPage } from '../../LoadingPage';
import { toast } from 'react-toastify';

const ForgetPassInitialValues = {
	code: '',
};

const LoginValidationSchema = Yup.object({
	code: Yup.string()
    .length(6, FA_IR_ERROR.CodeLength)
		.required(FA_IR_ERROR.CodeRequired),
});

function Main() {
  const navigate = useNavigate();
  const location = useLocation();
	const { mutate, isLoading } = useCheckOtp();
	const handleSubmit = (values: typeof ForgetPassInitialValues) => {
    if (!location.state.email) {
      toast.error(FA_IR_ERROR.EmailRequired);
      navigate('/auth/forget-pass' ,{replace: true});
      return;
    }
    mutate(
			{
				email: location.state.email,
				code: values.code,
			},
			{
				onSuccess: () => {
					navigate('/auth/forget-pass/reset', {
						state: {
							email: location.state.email,
							code: values.code,
						},
					});
				},
				onError: (error: any) => {
					toast.error(FA_IR.Error);
				},
			}
		);
	};

	if (isLoading) {
		return <LoadingPage />;
	}

	return (
		<>
			<div
				className={clsx([
					'-m-3 sm:-mx-8 p-3 sm:px-8 relative h-screen lg:overflow-hidden bg-primary xl:flex xl:items-center xl:justify-center xl:bg-white dark:bg-darkmode-800 xl:dark:bg-darkmode-600',
				])}
			>
				<LogoFixed />
				<DarkModeSwitcher />
				<MainColorSwitcher />
				<div className="container relative z-10 sm:px-10">
					<div className="block">
						{/* BEGIN: Login Form */}
						<div className="flex h-screen py-5 my-10 xl:h-auto xl:py-0 xl:my-0 ">
							<div className="w-full px-5 py-8 mx-auto my-auto bg-white rounded-md shadow-md  dark:bg-darkmode-600 xl:bg-transparent sm:px-8 xl:p-0 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto">
								<h2 className="text-xl  text-center intro-x xl:text-3xl xl:text-right">
									{FA_IR.OtpCode}
								</h2>
								<div className="mt-2 text-center intro-x text-slate-400 xl:hidden">
									{FA_IR.EnterOtpCode}
								</div>
								{/* Form Group */}
								<Formik
									initialValues={ForgetPassInitialValues}
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
												name="code"
												className="block px-4 py-3 intro-x min-w-full xl:min-w-[350px]"
												placeholder={FA_IR.OtpCode}
											/>
											<CustomErrorMessage name="code" />
										</div>
										{/* Button group */}
										<div className="mt-5 text-center intro-x xl:mt-8 xl:text-right">
											<Button
												type="submit"
												variant="primary"
												className="w-full px-4 py-3 align-top xl:w-32 xl:ml-3"
											>
												{FA_IR.Continue}
											</Button>
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
