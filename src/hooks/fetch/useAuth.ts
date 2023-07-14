import {
  getAccountProfile,
  getCheckVerifyAccount,
  postAuthCheckOtp,
  postAuthConfirmReset,
  postAuthLogin,
  postAuthRegisterOwner,
  postAuthRegisterTrainee,
  postAuthRegisterTrainer,
  postAuthResetPass,
  postCheckVerifyAccount,
} from '../../api';
import { FA_IR_ERROR } from '../../language';
import { useMutation, useQuery } from 'react-query';
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
  return useMutation(['take-otp'], postAuthResetPass, {
    onSuccess: (data) => {
      toast.success(FA_IR_ERROR.OtpSuccess);
    },
    onError: (error) => {
      toast.error(FA_IR_ERROR.OtpFailed);
    },
  });
}
export const useCheckOtp = () => {
  return useMutation(['check-otp'], postAuthCheckOtp, {
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
    ['traineeReigster'],
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

export const useCheckVerifyAccount = () => {
  return useQuery(['checkVerifyAccount'], getCheckVerifyAccount, {
    retry: false,
    enabled:false,
    staleTime: Infinity,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
    refetchInterval: false,
    onError: (error: any) => {
      if (error.response.status === 500) {
      toast.error(FA_IR_ERROR.UnableToSendEmailServer);
      }
      toast.warning(FA_IR_ERROR.UnverifiedAccount);
		},
	});
};

export const useAccountProfile = () => {
  return useQuery(['accountProfile'], getAccountProfile, {
    retry: false,
  });
};
export const usePostVerifyAccount = () => {
  return useMutation <any, any, {code: string}>(['POST-VERIFY-ACC'], (data) => postCheckVerifyAccount(data), {
    retry: false,
  });
};
