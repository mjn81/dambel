import { IBaseUser, IGymOwner, ITrainee, ITrainer } from 'interfaces';
import { post } from './methods';

export const postAuthLogin = async (data: {
  email: string;
  password: string;
}) => {
  return await post('/account/login/', data);
};

export const postAuthRegisterOwner =
  async (data: IGymOwner) => {
    return await post(
      '/account/signup/gymowner/',
      data,
    );
  };
export const postAuthRegisterTrainer =
  async (data: ITrainer) => {
    return await post(
      '/account/signup/trainer/',
      data,
    );
  };
export const postAuthRegisterTrainee =
  async (data: ITrainee) => {
    return await post(
      '/account/signup/trainee/',
      data,
    );
  };
