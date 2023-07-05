import { ErrorMessage , ErrorMessageProps} from 'formik';
import React from 'react'

export const CustomErrorMessage = (props: ErrorMessageProps) => {
  return (
		<div className="intro-y mt-2 text-danger dark:text-red-400">
			<ErrorMessage {...props} />
		</div>
	);
}
