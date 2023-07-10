import { useMutation, useQuery } from "react-query";
import { getAddGymRequests, getTrainerRequests, postAcceptTraineeRequest, postAcceptTrainerRequest, postTraineeRequest, postTrainerRequest } from "../../api";

export const useGetAddGymRequests = (enabled: boolean) => {
  return useQuery(["getAddGymRequests"], getAddGymRequests, {
    enabled,
  });
}

export const usePostAcceptTraineeRequest =  () =>
	useMutation(['post-accept-trainee-request'], postAcceptTraineeRequest)

export const usePostTraineeRequest = () => {
  return useMutation(['post-trainee-request'], postTraineeRequest)
}

export const useGetTrainerRequests = (enabled: boolean) => {
  return useQuery(["getTrainerRequests"], getTrainerRequests, {
    enabled,
  });
}

export const usePostAcceptTrainerRequest =  () => {
  return useMutation(['post-accept-trainer-request'], postAcceptTrainerRequest);
}

export const usePostTrainerRequest = () => {
  return useMutation(['post-trainer-request'], postTrainerRequest);
}