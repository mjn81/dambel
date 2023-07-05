import React from 'react'
import LogoImg from '../../assets/images/logo.svg';
import { FA_IR } from '../../language';


export const Logo = () => {
  return (
		<div className="absolute top-3 left-3 flex gap-2">
			<h5 className=' text-slate-300 xl:light:text-slate-800'>{FA_IR.Dambel}</h5>
			<span className="w-6 filter xl:invert dark:invert-0">
				<img src={LogoImg} alt="dambel-logo" />
			</span>
		</div>
	);
}
