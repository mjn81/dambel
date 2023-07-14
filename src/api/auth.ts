// import { IBaseUser, IGymOwner, ITrainee, ITrainer } from '../interfaces';
import { post, get } from './methods';

export const postAuthLogin = async (data: {
  email: string;
  password: string;
}) => {
  return await post('/account/login/', data);
};

export const postAuthRegisterOwner =
  async (data: any) => {
    return await post(
      '/account/signup/gymowner/',
      data,
    );
  };

export const postAuthRegisterTrainer =
  async (data: any) => {
    return await post(
      '/account/signup/trainer/',
      data,
    );
  };

export const postAuthRegisterTrainee =
  async (data: any) => {
    return await post(
      '/account/signup/trainee/',
      data,
    );
  };
  
export const postAuthResetPass = async (data: any) => {
	return await post('/account/reset/', data);
};

export const postAuthCheckOtp = async (data: any) => {
	return await post('/account/check-code/', data);
};

export const postAuthConfirmReset = async (data: any) => {
	return await post('/account/reset/confirm/', data);
};

export const getCheckVerifyAccount = () => get('/account/verify/');
export const postCheckVerifyAccount = (data: any) => post('/account/verify/', data);

export const getAccountProfile = () => get('/account/profile/');