import LoadingIcon from '../base-components/LoadingIcon';
import { FA_IR } from '../language';

const VerifyPage = () => {
  return (
		<section className="overflow-hidden grid place-items-center h-full">
			<section className="flex flex-col justify-center items-center gap-4">
				<LoadingIcon icon="ball-triangle" className="w-12 h-12" />
				<p className="text-xl text-white rtl">{FA_IR.SendingEmail}</p>
			</section>
		</section>
	);
}

export default VerifyPage