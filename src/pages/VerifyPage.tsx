import { useState } from 'react';
import {useCheckVerifyAccount, usePostVerifyAccount } from '../hooks';
import { FA_IR, FA_IR_ERROR } from '../language';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FormInput } from '../base-components/Form';
import Button from '../base-components/Button';

const VerifyPage = () => {
	const { mutate: verifyAccount } = usePostVerifyAccount();
	const navigate = useNavigate();
	const [code, setCode] = useState('');
	const onClick = () => {
		if (!!code) {
			toast.error(FA_IR_ERROR.EnterCode)
		}
		verifyAccount({
			code,
		}, {
			onSuccess: () => {
				toast.success(FA_IR.verified);
				navigate('/dashboard');
			}
		});
	}
	return (
		<div className='flex flex-col h-[calc(100%-100px)]'>
				<div className="flex items-center mt-8 intro-y">
					<h2 className="ml-auto text-lg font-medium">{FA_IR.Verify}</h2>
				</div>
			<section className="flex flex-col items-center justify-center flex-grow">
				<div className="my-5 rtl text-center text-slate-500">
					{FA_IR.VerifyMessage}
				</div>
				<section className="flex justify-center items-center gap-4">
					<Button
						variant="primary"
						className="block min-w-max"
						type="button"
						onClick={onClick}
					>
						{FA_IR.Verify}
					</Button>
					<FormInput
						type="text"
						className='max-w-sm'
						value={code}
						onChange={(e) => setCode(e.currentTarget.value)}
						placeholder={FA_IR.VerificationCode}
					/>
				</section>
			</section>
		</div>
	);
}

export default VerifyPage