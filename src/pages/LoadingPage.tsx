import React from 'react'
import LoadingIcon from '../base-components/LoadingIcon'
import { FA_IR } from '../language';

export const LoadingPage = () => {
  return (
		<section className="absolute  inset-0 w-screen h-screen overflow-hidden grid place-items-center">
			<section className='flex flex-col justify-center items-center gap-4'>
				<LoadingIcon
					icon="ball-triangle"
					className="w-12 h-12"
        />
        <p className='text-xl text-white'>
        {
          FA_IR.Loading
        }
        </p>
			</section>
		</section>
	);
}
