import React from 'react'
import LogoImg from '../../assets/images/logo.svg';
import { FA_IR } from '../../language';


export const Logo = () => {
  return (
		<div className="absolute top-3 left-3 flex gap-2">
			{FA_IR.Dambel}
			<span className="w-6 filter invert dark:invert-0">
				<img src={LogoImg} alt="dambel-logo" />
			</span>
		</div>
	);
}
