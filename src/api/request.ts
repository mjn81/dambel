import { get, post } from "./methods";

export const getAddGymRequests = async () => get('/gym/requests/');

export const postAcceptTraineeRequest = async (data: any) => post('/gym/accept-request/', data);

export const postTraineeRequest = async (data: any) => post('/gym/request-trainee/', data);


export const getTrainerRequests = async () => get('/gym/invitations/');

export const postAcceptTrainerRequest = async (data: any) =>
	post('/gym/accept-invite/', data);

export const postTrainerRequest = async (data: any) =>
	post('/gym/invite-trainers/', data);