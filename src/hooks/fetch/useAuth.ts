import {
  postAuthCheckOtp,
  postAuthConfirmReset,
  postAuthLogin,
  postAuthRegisterOwner,
  postAuthRegisterTrainee,
  postAuthRegisterTrainer,
  postAuthResetPass,
} from '../../api';
import { FA_IR_ERROR } from '../../language';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import {  setAuth } from '../../redux/authSlice';
import { useAppDispatch } from '../../redux/hooks';

export const useLogin = () => {
  const dispatch = useAppDispatch();
  return useMutation(['login'], postAuthLogin, {
    onSuccess: (data) => {
      dispatch(
        setAuth({
          access: data.access,
          refresh: data.refresh,
          role: data.role,
        })
			);
      toast.success(FA_IR_ERROR.LoginSuccess);
    },
    onError: (error) => {
      toast.error(FA_IR_ERROR.LoginFailed);
    },
  });
};

export const useSendOtp = () => {
  return useMutation(['otp'], postAuthResetPass, {
    onSuccess: (data) => {
      toast.success(FA_IR_ERROR.OtpSuccess);
    },
    onError: (error) => {
      toast.error(FA_IR_ERROR.OtpFailed);
    },
  });
}
export const useCheckOtp = () => {
  return useMutation(['otp'], postAuthCheckOtp, {
		onError: (error) => {
			toast.error(FA_IR_ERROR.WrongOtp);
		},
	});
}

export const useConfirmReset = () => {
  return useMutation(['otp'], postAuthConfirmReset, {
		onSuccess: (data) => {
			toast.success(FA_IR_ERROR.ResetSuccess);
		},
		onError: (error) => {
			toast.error(FA_IR_ERROR.ResetFailed);
		},
	});
}



export const useGymownerRegister = () => {
  return useMutation(
    ['gymownerRegister'],
    postAuthRegisterOwner,
    {
      onSuccess: (data) => {
        toast.success(
          FA_IR_ERROR.RegisterSuccess,
        );
      },
      onError: (error) => {
        toast.error(FA_IR_ERROR.RegisterFailed);
      },
    },
  );
};

export const useTrainerRegister = () => {
  return useMutation(
    ['trainerRegister'],
    postAuthRegisterTrainer,
    {
      onSuccess: (data) => {
        toast.success(
          FA_IR_ERROR.RegisterSuccess,
        );
      },
      onError: (error) => {
        toast.error(FA_IR_ERROR.RegisterFailed);
      },
    },
  );
};

export const useTraineeRegister = () => {
  return useMutation(
    ['trainneReigster'],
    postAuthRegisterTrainee,
    {
      onSuccess: (data) => {
        toast.success(
          FA_IR_ERROR.RegisterSuccess,
        );
      },
      onError: (error) => {
        toast.error(FA_IR_ERROR.RegisterFailed);
      },
    },
  );
};
