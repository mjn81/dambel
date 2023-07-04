import React from 'react'
import { FA_IR } from '../language'
import { Link } from 'react-router-dom'
import NotFoundImg from '../assets/images/notfound.svg'

export const NotFoundPage = () => {
  return (
		<section className="h-[97vh] text-white flex flex-col lg:flex-row justify-center items-center gap-4">
			<div className="inline-block w-3/4 lg:w-1/4 p-2 bg-[rgba(255,255,255,0.1)] rounded-2xl">
				<img src={NotFoundImg} alt="Not Found" className="w-full" />
			</div>
			<section className="flex flex-col justify-center items-center gap-4">
				<h1 className="text-3xl font-bold">{FA_IR.NotFound}</h1>
				<Link to="/" className="text-xl">
					{FA_IR.GoBackToHome}
				</Link>
			</section>
		</section>
	);
}
