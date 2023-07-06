import React from 'react'
import LogoImg from '../../assets/images/logo.svg';
import { FA_IR } from '../../language';


export const LogoFixed = () => {
  return (
		<div className="absolute top-3 left-3 flex gap-2">
			<h5 className="text-slate-300 xl:text-slate-800 xl:dark:text-slate-300">
				{FA_IR.Dambel}
			</h5>
			<span className="w-6 filter xl:invert dark:invert-0">
				<img src={LogoImg} alt="dambel-logo" />
			</span>
		</div>
	);
}

export const Logo = () => {
	return (
		<div className="flex gap-2">
			<h5 className="text-slate-300 xl:text-slate-800 xl:dark:text-slate-300">
				{FA_IR.Dambel}
			</h5>
			<span className="w-6 filter xl:invert dark:invert-0">
				<img src={LogoImg} alt="dambel-logo" />
			</span>
		</div>
	);
}