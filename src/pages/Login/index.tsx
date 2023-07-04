import DarkModeSwitcher from "../../components/DarkModeSwitcher";
import MainColorSwitcher from "../../components/MainColorSwitcher";
import logoUrl from "../../assets/images/logo.svg";
import illustrationUrl from "../../assets/images/illustration.svg";
import { FormInput, FormCheck } from "../../base-components/Form";
import Button from "../../base-components/Button";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { FA_IR } from "../../language";

function Main() {
  return (
		<>
			<div
				className={clsx([
					'-m-3 sm:-mx-8 p-3 sm:px-8 relative h-screen lg:overflow-hidden bg-primary xl:flex xl:items-center xl:justify-center xl:bg-white dark:bg-darkmode-800 xl:dark:bg-darkmode-600',
				])}
			>
				<DarkModeSwitcher />
				<MainColorSwitcher />
				<div className="container relative z-10 sm:px-10">
					<div className="block">
				
					
						{/* END: Login Info */}
						{/* BEGIN: Login Form */}
						<div className="flex h-screen py-5 my-10 xl:h-auto xl:py-0 xl:my-0 ">
							<div className="w-full px-5 py-8 mx-auto my-auto bg-white rounded-md shadow-md  dark:bg-darkmode-600 xl:bg-transparent sm:px-8 xl:p-0 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto">
								<h2 className="text-xl font-bold text-center intro-x xl:text-3xl xl:text-right">
									{FA_IR.SignIn}
								</h2>
								<div className="mt-2 text-center intro-x text-slate-400 xl:hidden">
									{FA_IR.WelcomeToDambel}
								</div>
								{/* Form Group */}
								<div className="mt-8 intro-x">
									<FormInput
										type="text"
										className="block px-4 py-3 intro-x min-w-full xl:min-w-[350px]"
										placeholder="Email"
									/>
									<FormInput
										type="password"
										className="block px-4 py-3 mt-4 intro-x min-w-full xl:min-w-[350px]"
										placeholder="Password"
									/>
								</div>
								<div className="flex mt-4 text-xs intro-x text-slate-600 dark:text-slate-500 sm:text-sm">
									<Link to="/forget-password">{
										FA_IR.ForgotPassword
									}</Link>
								</div>

								{/* Button group */}
								<div className="mt-5 text-center intro-x xl:mt-8 xl:text-right">
									<Button
										variant="primary"
										className="w-full px-4 py-3 align-top xl:w-32 xl:ml-3"
									>
										{FA_IR.SignIn}
									</Button>
									<Link to="/register">
										<Button
											variant="outline-secondary"
											className="w-full px-4 py-3 mt-3 align-top xl:w-32 xl:mt-0"
										>
											{FA_IR.Register}
										</Button>
									</Link>
								</div>
							
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


// <a href="" className="flex items-center pt-5 -intro-x">
							// 	<img
							// 		alt="Dambel gym finding platgorm"
							// 		className="w-6"
							// 		src={logoUrl}
							// 	/>
							// 	<span className="ml-3 text-lg text-white"> Dambel </span>
							// </a>